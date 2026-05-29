import { Search, Plus, MessageSquare } from "lucide-react";
import type { ChatRoom } from "../../data/teacherDashboardData";

interface SidebarProps {
    rooms: ChatRoom[];
    activeRoomId: string;
    onSelectRoom: (roomId: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeTab: "todos" | "estudiante" | "padre" | "colega";
    setActiveTab: (tab: "todos" | "estudiante" | "padre" | "colega") => void;
    onNewChat?: () => void;
}

function ChatSidebar({
    rooms,
    activeRoomId,
    onSelectRoom,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    onNewChat,
}: SidebarProps) {
    
    // Helper to get initials
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .filter(n => n.length > 0)
            .slice(0, 2)
            .map(n => n[0])
            .join("")
            .toUpperCase();
    };

    // Helper to color initials avatar by type
    const getAvatarBg = (type: "estudiante" | "padre" | "colega") => {
        switch (type) {
            case "estudiante":
                return "bg-blue-50 text-blue-600 border-blue-100";
            case "padre":
                return "bg-teal-50 text-teal-600 border-teal-100";
            case "colega":
                return "bg-violet-50 text-violet-600 border-violet-100";
        }
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-[650px] overflow-hidden">
            
            {/* Header: Title and + button */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-blue-600" />
                    <h2 className="text-base font-bold text-slate-800 tracking-tight">
                        Mensajes
                    </h2>
                </div>
                <button
                    onClick={onNewChat}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 transition shadow-sm"
                    title="Nuevo Chat"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Search Box */}
            <div className="p-3 border-b border-slate-100 bg-slate-50/40">
                <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200">
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar chat..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none ml-2 text-xs text-slate-700 placeholder-slate-400 w-full"
                    />
                </div>
            </div>

            {/* Tabs Filter (Todos, Estudiantes, Padres, Colegas) */}
            <div className="flex p-2 border-b border-slate-100 gap-1 bg-slate-50/20">
                {(["todos", "estudiante", "padre", "colega"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded-lg border capitalize transition-all duration-200 ${
                            activeTab === tab
                                ? "bg-slate-900 border-slate-950 text-white shadow-sm"
                                : "bg-white hover:bg-slate-50 text-slate-500 border-slate-200"
                        }`}
                    >
                        {tab === "todos" ? "Todos" : tab === "estudiante" ? "Alumnos" : tab === "padre" ? "Padres" : "Colegas"}
                    </button>
                ))}
            </div>

            {/* Chat Room List (Scrollable) */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100/60 custom-scrollbar">
                {rooms.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                        No se encontraron conversaciones activas.
                    </div>
                ) : (
                    rooms.map((room) => {
                        const { contact, unreadCount, messages } = room;
                        const lastMsg = messages[messages.length - 1];
                        const isActive = room.id === activeRoomId;

                        return (
                            <button
                                key={room.id}
                                onClick={() => onSelectRoom(room.id)}
                                className={`w-full text-left p-3.5 flex items-start gap-3 transition-all duration-200 relative ${
                                    isActive
                                        ? "bg-blue-50/50 border-l-4 border-l-blue-500"
                                        : "hover:bg-slate-50/50 border-l-4 border-l-transparent"
                                }`}
                            >
                                {/* Avatar with online indicator */}
                                <div className="relative shrink-0">
                                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-extrabold text-[11px] shadow-sm ${getAvatarBg(contact.type)}`}>
                                        {getInitials(contact.name)}
                                    </div>
                                    {contact.online && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                                    )}
                                </div>

                                {/* Content preview */}
                                <div className="flex-1 min-w-0 leading-tight">
                                    <div className="flex justify-between items-center gap-1">
                                        <span className={`text-xs block truncate ${isActive || unreadCount > 0 ? "font-extrabold text-slate-800" : "font-bold text-slate-700"}`}>
                                            {contact.name}
                                        </span>
                                        {lastMsg && (
                                            <span className="text-[9px] font-semibold text-slate-400 whitespace-nowrap">
                                                {lastMsg.timestamp}
                                            </span>
                                        )}
                                    </div>

                                    {/* Subtitle / Role */}
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                                        {contact.role}
                                    </span>

                                    {/* Last message snippet */}
                                    {lastMsg && (
                                        <p className={`text-[11px] truncate mt-1 ${unreadCount > 0 ? "font-bold text-slate-800" : "text-slate-500"}`}>
                                            {lastMsg.text}
                                        </p>
                                    )}
                                </div>

                                {/* Unread count badge */}
                                {unreadCount > 0 && (
                                    <span className="shrink-0 bg-blue-600 text-white font-extrabold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        );
                    })
                )}
            </div>

        </div>
    );
}

export default ChatSidebar;
