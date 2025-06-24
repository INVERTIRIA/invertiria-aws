//Components
import { Container } from "./Container";
import { Button } from "../ui/button";
import { useState } from "react";
import ChatBot from "../ChatBot";

const ChatBotButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <Container>
      <Button
        className="fixed bottom-6 right-6 z-50 size-16 p-1.5 rounded-full shadow-[0px_0px_12px_0px_rgba(251,61,3,1.00)]"
        onClick={toggleChatbot}
      >
        <img
          src="/assets/svg/chatbot.svg"
          alt="Chatbot"
          className="size-full object-cover"
        />
      </Button>
      <ChatBot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </Container>
  );
};

export default ChatBotButton;
