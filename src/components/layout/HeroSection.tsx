const Navbar = () => {
    return (
        <nav className="bg-white border-b fixed top-0 left-0 w-full z-50">
            <div className="flex justify-between items-center px-10 h-16 max-w-[1440px] mx-auto">
                <h1 className="text-2xl font-bold text-blue-900">
                    EduTrack
                </h1>

                <div className="hidden md:flex gap-8">
                    <a href="#" className="hover:text-blue-900">
                        Features
                    </a>

                    <a href="#" className="hover:text-blue-900">
                        Academics
                    </a>

                    <a href="#" className="hover:text-blue-900">
                        Support
                    </a>
                </div>

                <div className="flex gap-4">
                    <button className="text-blue-900 font-bold">
                        Login
                    </button>

                    <button className="bg-blue-900 text-white px-4 py-2 rounded">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;