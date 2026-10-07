import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are the official AI Design Consultant for Aryan Architects & Interiors, based in Bengaluru.
You specialize in custom 2D/3D elevations, luxury residential and commercial interiors, and turnkey fitouts.

KNOWLEDGE BASE:
- **Services**: Modern living areas (sleek lines, smart home features), Modular Kitchens (premium materials, space efficiency), Bedroom designs (convenience, ample storage, well-placed lighting), Elegant closets (acrylic finishes, feature walls), False Ceilings, Home Theatres, Balconies, Bathrooms, Gyms, and Commercial Spaces.
- **Process**: 1. Consultation 2. Planning (Space planning, functionality, 2D/3D elevations) 3. Execution (Collaborating with contractors & suppliers).
- **Warranties**: 10 years (6+4 years warranty), Lifetime warranty on hardware, 20+ years on stainless steel.
- **Contact**: +91 93808 51489 (Use ONLY this number for all inquiries).

Keep answers concise, friendly, and professional. Ask about their BHK size or requirements. If they ask for estimates, provide rough realistic ranges but tell them to book a consultation. Always gently push them to leave their contact details or call you directly at +91 93808 51489. Do not invent fake pricing. Format your responses nicely but without markdown code blocks.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am the Aryan Architects AI Assistant. How can I help you design your dream space today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.text
      }));

      const payload = {
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...apiMessages
        ]
      };

      // Smart routing: Local development vs Vercel Secure Production
      const endpoint = API_KEY ? 'https://api.groq.com/openai/v1/chat/completions' : '/api/chat';
      const headers = { 'Content-Type': 'application/json' };
      if (API_KEY) {
        headers['Authorization'] = `Bearer ${API_KEY}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const botText = data.choices[0].message.content;
      setMessages([...newMessages, { role: 'assistant', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', text: `Oops! Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100 flex'}`}>
        <div className="absolute inset-0 animate-ping rounded-full bg-teal opacity-75"></div>
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-xl transition-transform hover:scale-110 overflow-hidden"
        >
          <iframe 
            src="https://lottie.host/embed/6c2e1829-d14d-4c5f-8830-eb99421c3431/1I5kBkv6Xl.json"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ border: 'none', background: 'transparent', transform: 'scale(1.2)' }}
            title="Chatbot AI Logo"
          />
        </button>
      </div>

      <div className={`fixed bottom-6 right-6 z-50 flex h-[500px] max-h-[80vh] w-[350px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-teal/10 transition-all duration-300 origin-bottom-right ${isVisible && isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between bg-teal px-4 py-4 text-white">
          <div className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white shadow-sm transition-transform duration-500 group-hover:rotate-[360deg] overflow-hidden relative">
              <iframe 
                src="https://lottie.host/embed/6c2e1829-d14d-4c5f-8830-eb99421c3431/1I5kBkv6Xl.json"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ border: 'none', background: 'transparent', transform: 'scale(1.2)' }}
                title="Chatbot AI Logo"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Design Consultant</h3>
              <p className="text-[10px] text-white/80">Aryan Architects</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-mist/50">
          <div className="flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'self-end bg-teal text-white rounded-br-none' : 'self-start bg-white text-teal border border-teal/10 shadow-sm rounded-bl-none whitespace-pre-wrap'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="self-start max-w-[85%] rounded-2xl rounded-bl-none border border-teal/10 bg-white px-5 py-4 shadow-sm text-teal">
                <div className="flex gap-1 items-center">
                  <div className="h-2 w-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-teal animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSend} className="border-t border-teal/10 bg-white p-3">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about design, budget..."
              className="w-full rounded-full border border-teal/20 bg-mist/30 py-3 pl-4 pr-12 text-sm text-teal outline-none focus:border-gold transition-colors placeholder:text-teal/40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white disabled:opacity-50 transition-colors hover:bg-gold-deep"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
