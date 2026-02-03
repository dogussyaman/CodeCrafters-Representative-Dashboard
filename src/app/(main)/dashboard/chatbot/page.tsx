"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, Loader2, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { sendMessageAction } from './actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';



type Message = {
  sender: "user" | "bot";
  text: string;
};

const buttons = [
  { text: "Destek bileti tipleri nelerdir?" },
  { text: "Bilet durumu nasıl güncellenir?" },
  { text: "Çözüm notu nasıl yazılır?" },
  { text: "Açık biletlere nasıl bakılır? MT adımları neler?" },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<'key1' | 'key2'>('key1');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!input && !text) return;

    const userMessage: Message = { sender: "user", text: input || text };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await sendMessageAction(input || text, selectedKey);

      if (response.success && response.text) {
        const botReply: Message = {
          sender: "bot",
          text: response.text,
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "API hatası";
      toast.error(errorMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: errorMessage }]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (input.length > 0 && event.key === "Enter") {
        sendMessage(input);
        setInput("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [messages, input]);



  const handleButtonClick = (text: string) => {
    sendMessage(text);
  };



  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto min-h-screen flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-6 space-y-6 ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200">
                  <Bot className="w-4 h-4 text-slate-600" />
                </div>
              )}
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-2xl`}>
                <div
                  className={`rounded-3xl px-4 py-2 text-sm ${message.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-slate-700" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200">
                <Bot className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex flex-col items-start max-w-2xl">
                <div className="rounded-3xl px-4 py-3 text-sm bg-white text-slate-900 shadow-sm border border-slate-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[600px] gap-2">
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className="flex flex-col items-center justify-center gap-2">
                  <h1 className="text-2xl font-bold">Merhaba, CodeCrafters MT Asistanı</h1>
                  <p className="text-slate-500 text-sm">Destek biletleri ve MT iş akışı hakkında soru sorun 📝</p>
                  <p className="text-slate-500 text-sm">Bilet tipleri, durumlar, atama ve çözüm notu konularında yardımcı olabilirim. 📊</p>
                </div>
              </div>
              <div className='flex flex-col gap-2 border-t border-slate-200 pt-2'>
                {buttons.map((button, index) => (
                  <Button key={index} size={'sm'} variant={'outline'} onClick={() => handleButtonClick(button.text)}>{button.text}</Button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 sticky bottom-0 dark:bg-card dark:border-card rounded-lg">
          <div className="flex gap-3 items-end">

            <Select value={selectedKey} onValueChange={(value: 'key1' | 'key2') => setSelectedKey(value)}>
              <SelectTrigger>
                <Brain className="w-5 h-5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="key1">Gemini Key 1</SelectItem>
                <SelectItem value="key2">Gemini Key 2</SelectItem>
              </SelectContent>
            </Select>


            <button
              className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              disabled={loading}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="flex-1 resize-none px-4 h-auto py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent min-h-[44px] max-h-32 text-sm dark:border-slate-600"
              rows={1}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              id='send-button'
              disabled={(!input.trim() && input.length === 0) || loading}
              className="w-10 h-10 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
