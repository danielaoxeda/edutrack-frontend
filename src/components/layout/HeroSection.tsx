const HeroSection = () => {
    return (
        <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-blue-900 items-center justify-center p-10">
            <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQREVpplWW_BXf2nwcyWq2YXFl7Ikzvss8Q64Zh-vD5-80tTR8eZhKzTIrhbv15mCO1ixUrlx2tcfcXGYAUOSAUKSWt8fZYPViRtJ_hv7lTU3PfpxG9Pxvz6UJIfQcmuOYItmSDOjlwfjrDfiS-IJEb5hldoCnFVOeBzklhobgML2fJ5zBLboSj-uJRTCZVxNbL5_0yV_iYgkxRCnlfasQI79Vqfq_nl-jadbVMsy9Sp3x3pkmFXa0atp3SEDRZA2BcR32_nZkJQA7"
                alt="Academic"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div className="relative z-10 max-w-lg text-white">
                <h1 className="text-5xl font-bold mb-6">
                    Advancing Academic Excellence
                </h1>

                <p className="text-lg mb-10 opacity-90">
                    Experience the next generation of institutional
                    management.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded border border-white/20">
                        <h3 className="font-bold mb-2">
                            Real-time Insights
                        </h3>

                        <p className="text-sm opacity-80">
                            Monitor performance and attendance.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded border border-white/20">
                        <h3 className="font-bold mb-2">
                            Secure Data
                        </h3>

                        <p className="text-sm opacity-80">
                            Enterprise-grade security.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;