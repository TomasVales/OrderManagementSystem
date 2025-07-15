import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

function Cart() {
    const { cartItems, clearCart, removeFromCart, updateQuantity } = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customerName, setCustomerName] = useState("");

    const handleSubmitOrder = async () => {
        if (!customerName.trim()) {
            alert("Por favor ingresa tu nombre");
            return;
        }

        setIsSubmitting(true);
        try {
            const order = {
                customer_name: customerName.trim(),
                items: cartItems.map((p) => ({
                    product_id: p.id,
                    quantity: p.quantity,
                })),
            };
            await axios.post("http://127.0.0.1:8000/orders", order);
            alert("✅ Pedido enviado con éxito");
            clearCart();
            setCustomerName("");
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("❌ Error al enviar el pedido. Por favor intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-800 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Tu Carrito de Compras
                        </h2>
                    </div>

                    {/* Cart Content */}
                    <div className="px-6 py-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
                                <p className="mt-1 text-gray-500">Agrega productos para continuar</p>
                            </div>
                        ) : (
                            <>
                                {/* Customer Info */}
                                <div className="mb-6">
                                    <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre del Cliente
                                    </label>
                                    <input
                                        type="text"
                                        id="customer-name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ingresa tu nombre completo"
                                    />
                                </div>

                                {/* Items List */}
                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="py-4">
                                            <div className="flex justify-between">
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>{item.name}</h3>
                                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                    {item.description && (
                                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-2 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded-l-md border-gray-300 disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1 border-t border-b border-gray-300">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-gray-500 hover:text-gray-700 px-2 py-1 border rounded-r-md border-gray-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-red-600 hover:text-red-500"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Summary */}
                                <div className="border-t border-gray-200 mt-6 pt-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                        <p>Subtotal</p>
                                        <p>${totalAmount.toFixed(2)}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Los impuestos y costos de envío se calculan al finalizar la compra.
                                    </p>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={clearCart}
                                            className="flex-1 bg-gray-200 border border-transparent rounded-md py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                        >
                                            Vaciar Carrito
                                        </button>
                                        <button
                                            onClick={handleSubmitOrder}
                                            disabled={isSubmitting}
                                            className={`flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Procesando...
                                                </>
                                            ) : 'Confirmar Pedido'}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;