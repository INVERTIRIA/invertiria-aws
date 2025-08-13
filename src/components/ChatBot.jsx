import { Minimize2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

//Components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const generateUniqueId = () => {
  return Date.now().toString();
};

const TypingIndicator = () => (
  <div className="flex justify-start animate-in slide-in-from-bottom-2 fade-in-0">
    <div className="max-w-[80%] p-3 rounded-2xl rounded-bl-md bg-gray-100 text-gray-800 shadow-sm">
      <div className="flex space-x-1 py-0.5">
        <div
          className="size-1 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="size-1 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="size-1 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  </div>
);

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Respuesta del bot
    setIsTyping(true);
    const botResponse = await getBotResponse(inputValue);
    setMessages((prev) => [...prev, botResponse]);
  };

  const getBotResponse = async (userMessage) => {
    const message = `
Tu eres un asesor de soporte de InverTIRía. Responde las preguntas con base a la siguente informacion:

## Contexto
InverTIRía es una plataforma en línea revolucionaria diseñada específicamente para inversionistas 
en bienes raíces que buscan tomar decisiones informadas y rentables. Nuestra herramienta 
combina algoritmos avanzados de Machine Learning e Inteligencia Artificial con la experiencia 
y visión de Juan Londoño y su equipo experto para ofrecer análisis financieros 
precisos y proyecciones de rentabilidad confiables.

¿Para Qué Sirve InverTIRía?
• Análisis Financiero Integral: Calcula automáticamente TIR, ROI, CAP RATE y otros indicadores clave de rentabilidad
• Proyecciones de Flujo de Caja: Genera proyecciones detalladas mes a mes para diferentes horizontes de inversión
• Análisis de Riesgos: Evalúa múltiples escenarios y factores de riesgo para cada tipo de inversión
• Comparación de Modelos de Negocio: Permite evaluar simultáneamente diferentes estrategias de inversión
• Definición de Perfil de Inversionista: Identifica el perfil de riesgo y objetivos específicos de cada usuario
• Análisis de Crédito: Evalúa diferentes opciones de financiación y su impacto en la rentabilidad
• Evaluación de Proyectos Inmobiliarios: Analiza proyectos sobre planos, usados y nuevos con metodologías específicas
• Gestión de Portafolios: Permite crear y gestionar múltiples inversiones de manera integral

Si preguntan sobre cualquier otra cosa que no tenga relación con: Sobre temas inmobiliarios, sobre temas financieros (relacionados a inversiones) e InverTIRía, responde que no puedes proporcionar esa información.

Responde de manera resumida y directa.

## Pregunta del usuario:
${userMessage}
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENIA_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: message }],
        max_completion_tokens: 500,
        verbosity: "low",
        reasoning_effort: "minimal",
        temperature: 1,
      }),
    });

    const data = await res.json();

    const botResponse = {
      id: (Date.now() + 1).toString(),
      text: data.choices[0].message.content,
      isUser: false,
      timestamp: new Date(),
    };

    setIsTyping(false); // Desactivar el indicador de escritura

    return botResponse;
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
        relative bg-white rounded-3xl shadow-3xl 
        transition-all duration-500 ease-out transform
        ${isOpen ? "animate-in slide-in-from-bottom-8 fade-in-0" : ""}        
        w-80 sm:w-96
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-invertiria-1/90 to-invertiria-2 text-white rounded-t-3xl">
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
                        max-w-[80%] p-3 rounded-3xl text-sm
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
              {isTyping && <TypingIndicator />}
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
      </div>
    </div>
  );
};

export default ChatBot;
