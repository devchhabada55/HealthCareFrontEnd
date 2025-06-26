import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is for conditional class merging

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // Use Vite's environment variables

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Initialize with an empty array
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSentFirstWelcome, setHasSentFirstWelcome] = useState(false); // New state to track first welcome
  const [hasSentSecondWelcome, setHasSentSecondWelcome] = useState(false); // New state to track second welcome

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputMessage.trim();
    if (trimmedInput) {
      setLoading(true);
      const newUserMessage: ChatMessage = { text: trimmedInput, sender: 'user' };

      // Add user's message to the display immediately
      setMessages(prevMessages => [...prevMessages, newUserMessage]);

      // Logic for the first welcome message
      if (!hasSentFirstWelcome) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Welcome to 2h centre, How can I help you?', sender: 'bot' }
        ]);
        setHasSentFirstWelcome(true);
        setLoading(false);
        setInputMessage('');
        return; // Stop here for the first welcome message
      }

      // Logic for the second welcome message, only after the first has been sent
      if (hasSentFirstWelcome && !hasSentSecondWelcome) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Welcome to your personal health space. Whether it\'s a question about nutrition, wellness, or recovery—I\'ve got your back', sender: 'bot' }
        ]);
        setHasSentSecondWelcome(true);
        setLoading(false); // Ensure loading is false after displaying the message
        setInputMessage(''); // Clear input after displaying the message
        return; // Stop here for the second welcome message
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/api/chatbot/chat`, { message: trimmedInput });
        const reply = response.data.reply;
        setMessages(prevMessages => [...prevMessages, { text: reply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error communicating with chatbot:', error);
      } finally {
        setLoading(false);
        setInputMessage('');
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        // Chatbot Toggle Button - Size remains the same
        <Button
          className="rounded-full w-20 h-20 text-white shadow-lg flex items-center justify-center
                     bg-[rgb(124,58,237)] hover:bg-[rgb(109,40,217)] transition-colors duration-200
                     p-4 transform hover:scale-110"
          onClick={toggleChat}
        >
          <MessageSquare className="h-10 w-10" />
        </Button>
      ) : (
        // Chatbot Popup Container - Default size set to what was previously 'medium'
        <div
          className="bg-white rounded-lg shadow-xl flex flex-col
                     w-[320px] h-[450px] // Default size (now considered 'medium')
                     lg:w-[400px] lg:h-[600px] // Slightly larger for large screens if desired
                     "
        >
          <div className="flex justify-between items-center p-4 bg-[rgb(124,58,237)] text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Health Chatbot</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg max-w-[80%]",
                  msg.sender === 'user'
                    ? "bg-health-blue/10 text-right ml-auto"
                    : "bg-[rgb(237,230,250)] text-left mr-auto"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={loading} className="bg-[rgb(124,58,237)] hover:bg-[rgb(109,40,217)]">
              {loading ? 'Sending...' : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
