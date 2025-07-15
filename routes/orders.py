# routes/orders.py
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from models import Product, Order, OrderItem
from schemas import OrderCreate, OrderOut
from notifier import send_whatsapp_message
from fastapi.encoders import jsonable_encoder
from schemas import OrderStatus
from datetime import datetime, timedelta
from typing import List, Optional


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/orders", response_model=OrderOut)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    total = 0
    order_items = []

    for item in order.items:
        product = db.query(Product).filter(
            Product.id == item.product_id).first()
        if not product or product.stock < item.quantity:
            raise HTTPException(
                status_code=400, detail=f"Producto inválido o sin stock: {item.product_id}"
            )
        total += product.price * item.quantity
        product.stock -= item.quantity
        order_items.append((product, item.quantity))

    new_order = Order(customer_name=order.customer_name, total=total)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for product, qty in order_items:
        db.add(OrderItem(order_id=new_order.id,
               product_id=product.id, quantity=qty))
    db.commit()
    db.refresh(new_order)

    send_whatsapp_message(order.customer_name, order_items, total)

    enriched_items = []
    for item in new_order.items:
        enriched_items.append({
            "product_id": item.product_id,
            "product_name": item.product.name,
            "product_price": item.product.price,
            "quantity": item.quantity,
            "subtotal": item.product.price * item.quantity,
        })

    return {
        "id": new_order.id,
        "customer_name": new_order.customer_name,
        "total": new_order.total,
        "created_at": new_order.created_at,
        "status": new_order.status.value,  # <-- incluí status como string
        "items": enriched_items,
    }


@router.get("/orders", response_model=List[OrderOut])
def get_orders(
    status: Optional[OrderStatus] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    if start_date:
        query = query.filter(Order.created_at >= start_date)
    if end_date:
        query = query.filter(Order.created_at <= end_date)
    orders = query.all()

    result = []
    for order in orders:
        order_data = jsonable_encoder(order)
        enriched_items = []
        for item in order.items:
            enriched_items.append({
                "product_id": item.product_id,
                "product_name": item.product.name,
                "product_price": item.product.price,
                "quantity": item.quantity,
                "subtotal": item.product.price * item.quantity,
            })
        order_data["items"] = enriched_items
        # <-- asegurate que sea valor string
        order_data["status"] = order.status.value
        result.append(order_data)

    return result


@router.get("/orders/{order_id}", response_model=OrderOut)
def get_order_by_id(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    order_data = jsonable_encoder(order)

    enriched_items = []
    for item in order.items:
        enriched_items.append({
            "product_id": item.product_id,
            "product_name": item.product.name,
            "product_price": item.product.price,
            "quantity": item.quantity,
            "subtotal": item.product.price * item.quantity,
        })

    order_data["items"] = enriched_items
    order_data["status"] = order.status.value  # <-- incluido

    return order_data


@router.patch("/orders/{order_id}/status", response_model=OrderOut)
def update_order_status(order_id: int, status: OrderStatus, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    order.status = status
    db.commit()
    db.refresh(order)

    order_data = jsonable_encoder(order)
    enriched_items = []
    for item in order.items:
        enriched_items.append({
            "product_id": item.product_id,
            "product_name": item.product.name,
            "product_price": item.product.price,
            "quantity": item.quantity,
            "subtotal": item.product.price * item.quantity,
        })
    order_data["items"] = enriched_items
    order_data["status"] = order.status.value

    return order_data
