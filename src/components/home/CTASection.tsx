import React from "react";

const CTASection: React.FC = () => {
    return (
        <div className="py-12 bg-background">
            <div className="container mx-auto px-6">
                <div className="bg-on-background rounded-3xl p-8 md:p-12 text-center relative overflow-hidden text-white">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-extrabold mb-4">¿Listo para transformar tu institución?</h2>
                        <p className="text-lg text-outline-variant mb-6">Únete a cientos de instituciones que ya confían en EduTrack para su éxito académico.</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl">Agendar una Demo Gratis</button>
                            <button className="px-6 py-3 border border-white text-white rounded-xl">Contactar Ventas</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;
