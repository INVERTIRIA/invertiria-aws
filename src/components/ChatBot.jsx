import { Minimize2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

//Components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const generateUniqueId = () => {
  return Date.now().toString();
};

const ChatBot = ({ isOpen, onClose }) => {
  // Hooks
  const [messages, setMessages] = useState([
    {
      id: generateUniqueId(),
      text: "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      console.log(botResponse);

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const responses = [
      "Entiendo tu consulta. ¿Podrías darme más detalles?",
      "Esa es una excelente pregunta. Te ayudo con eso.",
      "Gracias por tu mensaje. Estoy aquí para asistirte.",
      "Perfecto, déjame ayudarte con esa información.",
      "Me parece muy interesante lo que comentas.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Overlay para cerrar al hacer clic fuera */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chatbot Container */}
      <div
        className={`
        relative bg-white rounded-2xl shadow-2xl border border-gray-200
        transition-all duration-500 ease-out transform
        ${isOpen ? "animate-in slide-in-from-bottom-8 fade-in-0" : ""}
        ${isMinimized ? "h-16" : "h-[500px]"}
        w-80 sm:w-96
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-invertiria-1/90 to-invertiria-2 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Asistente Virtual</h3>
              <p className="text-xs opacity-90">En línea</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button> */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <div className="flex flex-col h-[436px]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[236px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    } animate-in slide-in-from-bottom-2 fade-in-0`}
                  >
                    <div
                      className={`
                        max-w-[80%] p-3 rounded-2xl text-sm
                        ${
                          message.isUser
                            ? "bg-gradient-to-r from-invertiria-1/90 to-invertiria-2 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }
                        shadow-sm
                      `}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 rounded-full border-gray-300"
                  maxLength={100}
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-full bg-gradient-to-r from-invertiria-1/90 to-invertiria-2 hover:from-invertiria-1/60 hover:to-invertiria-2/90 h-10 w-10 p-0"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
