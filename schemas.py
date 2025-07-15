from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from sqlalchemy import Column, Enum
import enum


class ProductBase(BaseModel):
    name: str
    price: float
    stock: int


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int

    class Config:
        orm_mode = True

# Pedido (Order)


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    items: List[OrderItemCreate]


class OrderItemOut(BaseModel):
    product_id: int
    product_name: str
    product_price: float
    quantity: int
    subtotal: float

    class Config:
        orm_mode = True


class OrderStatus(enum.Enum):
    pending = "pending"
    processing = "processing"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


class OrderOut(BaseModel):
    id: int
    customer_name: str
    total: float
    created_at: datetime
    status: OrderStatus  # <-
    items: List[OrderItemOut]

    class Config:
        orm_mode = True
