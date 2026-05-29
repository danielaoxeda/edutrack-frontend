import React from "react";

const LoginCard: React.FC = () => {
    return (
        <div className="glass-card p-8 rounded-xl shadow-2xl border-t-4 border-primary max-w-[28rem] mx-auto">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-semibold text-on-surface mb-1">Acceso Institucional</h2>
                <p className="text-sm text-on-surface-variant">Ingresa tus credenciales para continuar</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-medium text-on-surface">Correo Electrónico</label>
                    <div className="relative mt-1">
                        <input
                            type="email"
                            placeholder="usuario@edutrack.edu"
                            className="w-full pl-3 pr-3 py-2 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-on-surface">Contraseña</label>
                        <a className="text-sm text-primary hover:underline" href="#">¿Olvidaste tu clave?</a>
                    </div>
                    <div className="relative mt-1">
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-3 pr-3 py-2 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input id="remember" type="checkbox" className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" />
                    <label htmlFor="remember" className="text-sm text-on-surface-variant">Mantener sesión iniciada</label>
                </div>

                <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-medium hover:scale-[1.02] transition-transform active:scale-95">Iniciar Sesión Segura</button>
            </form>

            <div className="mt-6 pt-4 border-t border-outline-variant text-center">
                <p className="text-sm text-on-surface-variant">Protegido por encriptación JWT y TLS 1.3</p>
            </div>
        </div>
    );
};

export default LoginCard;
