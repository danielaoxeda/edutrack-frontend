import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Phone, Video, Info, MoreVertical } from "lucide-react";
import type { ChatRoom } from "../../data/teacherDashboardData";

interface ChatWindowProps {
    room: ChatRoom | null;
    onSendMessage: (text: string) => void;
}

function ChatWindow({ room, onSendMessage }: ChatWindowProps) {
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of messages when room changes or new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [room?.messages?.length]);

    if (!room) {
        return (
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm h-[650px] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center mb-4">
                    <Send size={24} className="rotate-45" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Bandeja de Entrada</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Selecciona una conversación del panel izquierdo para comenzar a chatear o haz clic en "+" para iniciar un nuevo chat.
                </p>
            </div>
        );
    }

    const { contact, messages } = room;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        onSendMessage(inputText);
        setInputText("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend(e);
        }
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

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .filter(n => n.length > 0)
            .slice(0, 2)
            .map(n => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm h-[650px] flex flex-col overflow-hidden">
            
            {/* 1. Header: Contact Information & Actions */}
            <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 shadow-sm/5">
                <div className="flex items-center gap-3">
                    {/* Avatar with online status */}
                    <div className="relative shrink-0">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-extrabold text-xs shadow-sm ${getAvatarBg(contact.type)}`}>
                            {getInitials(contact.name)}
                        </div>
                        {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                        )}
                    </div>
                    {/* Contact detail labels */}
                    <div className="leading-tight">
                        <span className="font-extrabold text-sm text-slate-800 block">
                            {contact.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wider">
                            {contact.role}
                        </span>
                    </div>
                </div>

                {/* Call buttons, info settings */}
                <div className="flex items-center gap-1">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
                        <Phone size={16} />
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
                        <Video size={16} />
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
                        <Info size={16} />
                    </button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            {/* 2. Messages Bubble Scroll Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-5 space-y-4 custom-scrollbar">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-xs text-slate-400">
                        No hay mensajes en esta conversación. Escribe un mensaje abajo para comenzar.
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.sentByMe;
                        
                        return (
                            <div
                                key={msg.id}
                                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div className="max-w-[70%] space-y-1">
                                    <div
                                        className={`px-4 py-2.5 text-xs shadow-sm/5 leading-relaxed ${
                                            isMe
                                                ? "bg-blue-600 text-white rounded-2xl rounded-tr-none border border-blue-500/20"
                                                : "bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-200/50"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    <span className={`text-[9px] font-semibold text-slate-400 block ${isMe ? "text-right mr-1" : "text-left ml-1"}`}>
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                {/* Ref for auto scrolling */}
                <div ref={messagesEndRef} />
            </div>

            {/* 3. Footer: Chat Message Input Box */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white shrink-0">
                <div className="flex items-center gap-2">
                    
                    {/* Attach file action */}
                    <button
                        type="button"
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition shrink-0"
                        title="Adjuntar archivo"
                    >
                        <Paperclip size={16} />
                    </button>

                    {/* Emoji toggle action */}
                    <button
                        type="button"
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition shrink-0"
                        title="Añadir emoji"
                    >
                        <Smile size={16} />
                    </button>

                    {/* Message input */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-700 outline-none transition duration-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition shrink-0"
                        title="Enviar"
                    >
                        <Send size={16} />
                    </button>

                </div>
            </form>

        </div>
    );
}

export default ChatWindow;
