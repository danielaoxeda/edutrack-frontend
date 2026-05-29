function Footer() {
    return (
        <footer className="border-t border-slate-200 mt-10 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4">
                <p className="text-slate-500">
                    © 2026 EduTrack Sistema Académico
                </p>

                <div className="flex gap-4 text-slate-500">
                    <button>Portal EduTrack</button>

                    <a
                        href="https://wa.me/960648959"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                    >
                        Contacto
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;