import { useCart } from "./CartContext"; // asegurate que esto esté bien ubicado

function ProductCard({ product }) {
    const { addToCart } = useCart(); // función del contexto

    if (!product) return null;

    const handleAdd = () => {
        if (product.stock > 0) {
            addToCart(product);
            alert(`${product.name} agregado al carrito`);
        } else {
            alert("Este producto no tiene stock");
        }
    };

    return (
        <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-1">Precio: ${product.price}</p>
                <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
            </div>
            {product.stock > 0 ? (
                <button
                    onClick={handleAdd}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Agregar al carrito
                </button>
            ) : (
                <span className="mt-4 text-red-500 font-semibold">Sin stock</span>
            )}
        </div>
    );
}

export default ProductCard;
