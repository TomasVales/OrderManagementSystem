import { useState } from "react";
import axios from "axios";

function CreateProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: ""
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        // Resetear estados de feedback al editar
        if (success) setSuccess(false);
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await axios.post("http://127.0.0.1:8000/products", {
                name: form.name.trim(),
                price: parseFloat(form.price),
                stock: parseInt(form.stock),
            });
            setSuccess(true);
            setForm({ name: "", price: "", stock: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear el producto");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Crear nuevo producto
                    </h2>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    {/* Mensajes de feedback */}
                    {success && (
                        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-green-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <p className="text-green-700 font-medium">
                                    Producto creado exitosamente
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-red-500 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nombre del producto
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ej: Milanesa de pollo"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Precio (USD)
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">$</span>
                                </div>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">USD</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="stock"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Stock inicial
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                placeholder="0"
                                min="0"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : 'Crear producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;