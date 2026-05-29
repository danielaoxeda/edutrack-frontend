import React from "react";

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-120 flex items-center overflow-hidden">
            {/* Background image + gradient overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover opacity-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlGAhD6nyoh3nauBPTPN5fEcs62SFNyskQTxjeGZGWg41jlCNfIlenY6xYx4SfOJG9MCLrKRY3DSnFI_kh7TkYIfxqheO0TrFVb-4zBflI7yEr-U2unZEJtdTDbL4pAfyQwHfXZAJurRCSAO-O1eUN5_Hrsp0BRia4T3LGVQV1BFj9SyEHKFsSwLcM9YpzurMr8oNjm14jeWLg3jF8K8aHZYkedbiYIYchAsU3rO_oo-VOVGVP_wcgDcbIoN4z7eceYKym_qEJzi4Y"
                    alt="Universidad"
                />

                <div className="absolute inset-0 bg-linear-to-br from-background via-background/90 to-surface-container-high/40"></div>
            </div>

            <div className="container mx-auto px-margin-desktop relative z-10 grid lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-7">
                    <span className="inline-block px-md py-xs bg-primary-container/10 text-primary font-label-sm text-label-sm rounded-full mb-md">Sistema de Gestión Académica v4.0</span>

                    <h1 className="font-display-lg text-display-lg text-on-background mb-lg max-w-2xl leading-tight">
                        Gestión Académica <span className="text-primary">Simplificada</span>
                    </h1>

                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-[36rem]">
                        Optimiza la administración escolar con una plataforma robusta diseñada para educadores modernos. Dashboards en tiempo real y seguridad JWT.
                    </p>

                    <div className="flex flex-wrap gap-md">
                        <button className="px-xl py-md bg-primary text-on-primary font-label-md text-label-md rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2">
                            Explorar Funciones
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>

                        <button className="px-xl py-md border border-outline text-on-surface font-label-md text-label-md rounded-xl hover:bg-surface-container-low transition-all">
                            Ver Demo
                        </button>
                    </div>
                </div>

                {/* Right column left intentionally for login card in the page composition */}
                <div className="lg:col-span-5 hidden lg:block" />
            </div>
        </section>
    );
};

export default HeroSection;