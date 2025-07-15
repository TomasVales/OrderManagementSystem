import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12 text-center">
                    {/* Logo */}
                    <div className="mb-6 flex justify-center">
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Título principal */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Bienvenido a <span className="text-indigo-600">Taste API</span>
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-xl text-gray-600 mb-6">
                        Tu solución integral para pedidos en línea
                    </p>

                    {/* Descripción del servicio */}
                    <div className="max-w-2xl mx-auto mb-8 text-gray-700 text-left">
                        <p className="mb-4">
                            Taste API es una plataforma innovadora que conecta restaurantes con sus clientes,
                            ofreciendo un sistema de pedidos web rápido, seguro y fácil de usar.
                        </p>
                        <p className="mb-4">
                            Con nuestra tecnología avanzada, puedes explorar menús, realizar pedidos y hacer
                            seguimiento en tiempo real, todo desde la comodidad de tu dispositivo.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Interfaz intuitiva y amigable</li>
                            <li>Procesamiento de pagos seguro</li>
                            <li>Soporte para múltiples restaurantes</li>
                            <li>Notificaciones en tiempo real</li>
                        </ul>
                    </div>

                    {/* Llamado a la acción */}
                    <div className="mb-8">
                        <Link
                            to="/productos"
                            className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Comienza ahora
                        </Link>
                    </div>

                    {/* Notas importantes */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 text-left">
                        <h3 className="font-bold text-yellow-800 mb-2">Notas importantes:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                            <li>El servicio requiere conexión a internet estable</li>
                            <li>Disponible 24/7 para todos nuestros usuarios</li>
                            <li>Soporte técnico incluido con cada suscripción</li>
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Taste API. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing; 