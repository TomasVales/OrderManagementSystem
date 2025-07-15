import { useState, useEffect } from "react";
import axios from "axios";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = {};
                if (statusFilter) params.status = statusFilter;
                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;

                const res = await axios.get("http://127.0.0.1:8000/orders", { params });
                setOrders(res.data);
            } catch {
                setError("Error al cargar pedidos");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [statusFilter, startDate, endDate]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-indigo-100 text-indigo-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="bg-indigo-600 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Mis Pedidos
                        </h2>
                    </div>

                    {/* Filtros */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <select
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="pending">Pendiente</option>
                                    <option value="processing">En proceso</option>
                                    <option value="shipped">Enviado</option>
                                    <option value="delivered">Entregado</option>
                                    <option value="cancelled">Cancelado</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicial</label>
                                <input
                                    type="date"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha final</label>
                                <input
                                    type="date"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!loading && !error && orders.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No hay pedidos</h3>
                                <p className="mt-1 text-sm text-gray-500">No se encontraron pedidos con los filtros seleccionados.</p>
                            </div>
                        )}

                        {!loading && !error && orders.length > 0 && (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                                            <div>
                                                <span className="text-sm font-medium text-gray-500">Pedido #</span>
                                                <span className="ml-1 font-semibold">{order.id}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status === 'pending' && 'Pendiente'}
                                                    {order.status === 'processing' && 'En proceso'}
                                                    {order.status === 'shipped' && 'Enviado'}
                                                    {order.status === 'delivered' && 'Entregado'}
                                                    {order.status === 'cancelled' && 'Cancelado'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">Cliente</h4>
                                                    <p className="mt-1 text-sm text-gray-900">{order.customer_name}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                                                    <p className="mt-1 text-sm text-gray-900">{new Date(order.created_at).toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">Total</h4>
                                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                                        ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Productos</h4>
                                                <ul className="divide-y divide-gray-200">
                                                    {order.items.map((item, idx) => (
                                                        <li key={idx} className="py-3 flex justify-between">
                                                            <div className="flex items-center">
                                                                <span className="font-medium text-gray-900 mr-2">
                                                                    {item.quantity}x {item.product_name}
                                                                </span>
                                                                <span className="text-sm text-gray-500">
                                                                    (${item.product_price.toLocaleString(undefined, { minimumFractionDigits: 2 })} c/u)
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                ${(item.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyOrders;