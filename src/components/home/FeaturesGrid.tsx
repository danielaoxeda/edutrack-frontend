import React from "react";

const FeaturesGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative overflow-hidden bg-surface-container-low p-6 rounded-xl border border-outline-variant hover:border-primary transition-all">
                <div className="flex flex-col h-full justify-between z-10">
                    <div>
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary mb-4">
                            <span className="material-symbols-outlined">security</span>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">Rutas Protegidas</h3>
                        <p className="text-sm text-on-surface-variant max-w-[28rem]">Arquitectura basada en roles con middleware de autenticación robusto. Solo personal autorizado accede a información sensible.</p>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-sm">JWT Auth</span>
                        <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-sm">Role-Based Access</span>
                    </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-on-background p-6 rounded-xl border border-outline-variant flex flex-col justify-between">
                <div>
                    <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container mb-4">
                        <span className="material-symbols-outlined">grade</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Gestión de Notas</h3>
                    <p className="text-sm text-outline-variant">Sistema de calificación flexible con soporte para promedios ponderados, rúbricas y exportación a boletines.</p>
                </div>

                <div className="mt-4">
                    <img className="rounded-lg w-full h-32 object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfRkttaYuXAkQBRUc2AoFT86cfqPcFtQvM-SHyA4EahskZRhxonY7eORRj7pZax9r4J2yQv6f3NmfeeD-1PsJtjyb2PTctZRygrAWPd4Q9wJH_2p_QaNkz-zKmeow7GB6lnq2Slk4EAp624Jdi2ledPy_e2uvdnBe2A83VNYngFUPFq0pVVGg6zJJjKmHUClJXa6RzY2LWiiYFhoeYATESUsjD4yXCTq-S8DpqwxZaFwvv7hFF8c9xemctVvU01UCvEmNf6y2j87Rv" alt="grades" />
                </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-all flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-4">
                    <span className="material-symbols-outlined text-4xl">dashboard</span>
                </div>

                <h3 className="text-lg font-semibold mb-2">Dashboards en Tiempo Real</h3>
                <p className="text-sm text-on-surface-variant mb-4">Visualiza asistencia y rendimiento en un solo vistazo dinámico.</p>

                <div className="w-full space-y-2">
                    <div className="h-2 bg-outline-variant rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-primary"></div>
                    </div>
                    <div className="h-2 bg-outline-variant rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-secondary"></div>
                    </div>
                </div>
            </div>

            {/* Additional Context card (matches original HTML's fourth card) */}
            <div className="md:col-span-2 group relative overflow-hidden bg-linear-to-r from-primary to-primary-container p-6 rounded-xl text-on-primary">
                <div className="grid md:grid-cols-2 gap-6 items-center relative z-10">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Infraestructura Escalable</h3>
                        <p className="text-sm opacity-90 mb-4">Nuestra API REST garantiza que EduTrack crezca con tu institución, desde 100 hasta 100,000 estudiantes sin pérdida de rendimiento.</p>

                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> 99.9% de Disponibilidad</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Soporte 24/7</li>
                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Backups Automáticos</li>
                        </ul>
                    </div>

                    <div className="hidden md:block relative">
                        <span className="material-symbols-outlined text-[160px] opacity-20 absolute -right-4 top-1/2 -translate-y-1/2">cloud_done</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesGrid;

