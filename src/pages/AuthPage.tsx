import Navbar from "../components/auth/NavBar";
import Footer from "../components/shared/Footer";
import HeroSection from "../components/auth/HeroSection";
import AuthTabs from "../components/auth/AuthTabs";

const AuthPage = () => {
    return (
        <div className="bg-[#f8f9ff] min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow flex pt-16">
                <HeroSection />

                <section className="w-full lg:w-1/2 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3755c3_0.5px,transparent_0.5px)] bg-[length:20px_20px]" />

                    <div className="relative z-10 w-full max-w-[480px]">
                        <AuthTabs />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AuthPage;