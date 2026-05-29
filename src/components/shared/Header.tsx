import {
    Bell,
    Search,
} from "lucide-react";

function Header() {
    return (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
            <div className="h-16 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src="/edutrack.logo.png"
                        alt="EduTrack Logo"
                        className="h-10 w-auto object-contain"
                    />

                    <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2">
                        <Search
                            size={18}
                            className="text-slate-500"
                        />

                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="bg-transparent outline-none ml-2"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                        <Bell size={20} />
                    </button>

                    <div className="flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-full">
                        <img
                            src="/user.png"
                            alt="user"
                            className="w-9 h-9 rounded-full"
                        />

                        <div className="flex flex-col leading-tight">
                          <span className="font-medium">
                            Adriano Bautista
                          </span>

                            <span className="text-xs text-slate-500">
                                Estudiante
                              </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;