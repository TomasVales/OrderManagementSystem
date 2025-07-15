import { useEffect, useState } from "react";
import { getProducts, createOrder } from "./apis/api";
import ProductList from "./ProductList.jsx";

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts().then((res) => {
            console.log("Productos cargados:", res.data);
            setProducts(res.data);
            setIsLoading(false);
        });
    }, []);

    const handleAddToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const handleRemoveFromCart = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmitOrder = () => {
        const order = {
            customer_name: "Cliente Web",
            items: cart.map((p) => ({
                product_id: p.id,
                quantity: 1,
            })),
        };

        setIsLoading(true);
        createOrder(order).then(() => {
            alert("Pedido enviado con éxito");
            setCart([]);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Taste API</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Productos */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                                Productos disponibles
                            </h2>

                            {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <ProductList products={products} onAdd={handleAddToCart} />
                            )}
                        </div>
                    </div>

                    {/* Carrito */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tu Pedido</h3>

                            {cart.length === 0 ? (
                                <p className="text-gray-500 italic">No hay productos en el carrito</p>
                            ) : (
                                <>
                                    <ul className="divide-y divide-gray-200">
                                        {cart.map((p, i) => (
                                            <li key={i} className="py-3 flex justify-between items-center">
                                                <div>
                                                    <p className="text-gray-800">{p.name}</p>
                                                    <p className="text-sm text-gray-500">${p.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveFromCart(i)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                    aria-label="Eliminar producto"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <p className="text-lg font-medium text-gray-900 mb-4">
                                            Total: ${cart.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={handleSubmitOrder}
                                            disabled={isLoading}
                                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Procesando...
                                                </>
                                            ) : 'Confirmar Pedido'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Taste API. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;