import { useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import ChatSidebar from "../components/messages/ChatSidebar";
import ChatWindow from "../components/messages/ChatWindow";
import { chatRoomsMockData } from "../data/teacherDashboardData";
import type { ChatRoom, MessageItem } from "../data/teacherDashboardData";

function TeacherMessages() {
    // Rooms state loaded from mock data
    const [rooms, setRooms] = useState<ChatRoom[]>(chatRoomsMockData);
    
    // Active chat state (defaulting to the first room ID)
    const [activeRoomId, setActiveRoomId] = useState<string>("chat1");
    
    // Search and category tab state
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"todos" | "estudiante" | "padre" | "colega">("todos");

    // Handle switching active chat room
    const handleSelectRoom = (roomId: string) => {
        setActiveRoomId(roomId);
        // Mark room as read instantly when selected
        setRooms(prevRooms =>
            prevRooms.map(room =>
                room.id === roomId ? { ...room, unreadCount: 0 } : room
            )
        );
    };

    // Handle sending a new message in the current conversation
    const handleSendMessage = (text: string) => {
        const today = new Date();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const timestamp = `${hours}:${minutes}`;

        const newMsg: MessageItem = {
            id: `msg_sent_${Date.now()}`,
            senderId: "docente",
            text: text,
            timestamp: timestamp,
            sentByMe: true,
        };

        setRooms(prevRooms =>
            prevRooms.map(room => {
                if (room.id === activeRoomId) {
                    return {
                        ...room,
                        messages: [...room.messages, newMsg],
                    };
                }
                return room;
            })
        );
    };

    // Handle simulation of starting a new chat room dynamically
    const handleNewChat = () => {
        const checkExist = rooms.find(r => r.id === "chat_new");
        if (checkExist) {
            handleSelectRoom("chat_new");
            return;
        }

        const newRoom: ChatRoom = {
            id: "chat_new",
            contact: {
                id: "c_valentina",
                name: "Valentina Gómez",
                role: "Estudiante • Inteligencia Artificial",
                type: "estudiante",
                online: true,
            },
            unreadCount: 0,
            messages: [
                {
                    id: "mnew_1",
                    senderId: "c_valentina",
                    text: "Hola profesor, quería consultar si subirá las diapositivas de la clase de redes neuronales.",
                    timestamp: "Justo ahora",
                    sentByMe: false,
                }
            ],
        };

        setRooms(prevRooms => [newRoom, ...prevRooms]);
        setActiveRoomId("chat_new");
    };

    // Real-time filtering based on tabs and search query
    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            room.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.contact.role.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTab =
            activeTab === "todos" || room.contact.type === activeTab;

        return matchesSearch && matchesTab;
    });

    const activeRoom = rooms.find(room => room.id === activeRoomId) || null;

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. CABECERA */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Bandeja de Entrada
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Comunícate en tiempo real con estudiantes, padres de familia y colegas de la facultad.
                    </p>
                </div>

                {/* 2. CHAT RESPONSIVE DUAL PANE LAYOUT (4 Columns Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* LEFT COLUMN (1/4 - 1 Column): Inbox & Contacts Selection */}
                    <div className="lg:col-span-1">
                        <ChatSidebar
                            rooms={filteredRooms}
                            activeRoomId={activeRoomId}
                            onSelectRoom={handleSelectRoom}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onNewChat={handleNewChat}
                        />
                    </div>

                    {/* RIGHT COLUMNS (3/4 - 3 Columns): Interactive Message Window */}
                    <div className="lg:col-span-3">
                        <ChatWindow
                            room={activeRoom}
                            onSendMessage={handleSendMessage}
                        />
                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherMessages;
