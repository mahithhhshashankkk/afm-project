import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Recycle, ChevronRight } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  text: "Hi! I'm the WasteHero assistant. Tap a question below to get instant answers about waste management, recycling, and our services — or type your own question.",
};

const FAQS: FAQ[] = [
  {
    question: 'What services does WasteHero offer?',
    answer:
      'WasteHero provides end-to-end campus waste management: smart bin monitoring and IoT sensors, scheduled collection and route optimization, waste-audit reporting, recycling program setup, and awareness campaigns for students and staff. We also offer an admin dashboard to track diversion rates, pickup history, and cost savings in real time.',
  },
  {
    question: 'How does smart bin monitoring work?',
    answer:
      'Our sensor-equipped bins measure fill level, weight, and contamination in real time. That data streams to the WasteHero dashboard, which automatically schedules pickups only when bins are actually full — cutting unnecessary truck trips, reducing overflow, and lowering fuel and labor costs by up to 40%.',
  },
  {
    question: 'Which plastics can I recycle?',
    answer:
      'Most campus programs accept #1 (PET — water bottles, soda bottles), #2 (HDPE — milk jugs, detergent bottles), and #5 (PP — yogurt cups, takeaway containers). Rinse them lightly and leave caps on. Avoid #3 (PVC), #6 (polystyrene foam), and #7 (mixed/other) — they usually go to general waste. When in doubt, check the number inside the triangle on the bottom.',
  },
  {
    question: 'How do I sort my waste correctly?',
    answer:
      'Use three streams: (1) Blue bin — clean recyclables like paper, cardboard, metal cans, and #1/#2/#5 plastics. (2) Green bin — food scraps, peels, tea bags, and garden trimmings for composting. (3) Black bin — non-recyclables like tissues, polystyrene, ceramic, and contaminated packaging. Always empty and rinse containers before recycling — a single dirty item can contaminate a whole batch.',
  },
  {
    question: 'What counts as hazardous waste and how do I dispose of it?',
    answer:
      'Hazardous waste includes batteries, electronics (e-waste), fluorescent bulbs, paints, chemicals, and medical sharps. These NEVER go in standard bins — they require special handling. WasteHero runs dedicated e-waste and battery collection drives on campus. Contact your facilities team or use the "Request a pickup" option to schedule a hazardous-waste pickup.',
  },
  {
    question: 'What goes in the compost bin?',
    answer:
      'Compost bins accept fruit and vegetable peels, coffee grounds and filters, tea bags (no staples), eggshells, bread, cooked food without meat, and garden trimmings like leaves and flowers. Keep out meat, bones, dairy, oils, and plastics — they attract pests and break the composting process.',
  },
  {
    question: 'How can my campus sign up for WasteHero?',
    answer:
      'Getting started takes four steps: (1) Book a free waste audit through the contact form on this site. (2) We assess your current waste streams and volumes. (3) We deploy smart bins, sensors, and the dashboard tailored to your campus. (4) Training and ongoing support get your staff and students on board. Most campuses are live within 2–3 weeks.',
  },
  {
    question: 'How much can WasteHero save us?',
    answer:
      'On average, campuses see a 30–50% reduction in collection costs and divert 60%+ of waste from landfill within the first year. Use the ROI calculator on this page to estimate your own savings based on your campus size and current waste spend — or book a demo for a detailed projection.',
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleFaqClick = (faq: FAQ) => {
    if (isLoading) return;
    setHasInteracted(true);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: faq.question },
      { role: 'assistant', text: faq.answer },
    ]);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setHasInteracted(true);
    const userMessage: ChatMessage = { role: 'user', text: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/wastehero-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: newMessages.slice(-10).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const reply: ChatMessage = {
        role: 'assistant',
        text: data.reply || 'Sorry, I could not generate a response. Please try again.',
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I am having trouble connecting right now. Please try again in a moment, or email us at hello@wastehero.in.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary-600 px-5 py-4 text-sm font-bold text-white shadow-xl shadow-primary-600/30 transition-all duration-300 hover:bg-primary-700 hover:shadow-2xl hover:shadow-primary-600/40 hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Chat with WasteHero</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[min(560px,calc(100vh-3rem))] w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-2xl shadow-ink-900/20 animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between bg-ink-900 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
                <Recycle className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white">WasteHero Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-ink-50/50 px-4 py-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-primary-600 font-medium text-white'
                      : 'rounded-bl-md border border-ink-100 bg-white font-medium text-ink-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Suggested questions — shown until the user picks one or sends a message */}
            {!hasInteracted && (
              <div className="space-y-2 pt-2">
                <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  Suggested questions
                </p>
                {FAQS.map((faq) => (
                  <button
                    key={faq.question}
                    onClick={() => handleFaqClick(faq)}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-left text-sm font-medium text-ink-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                  >
                    <span className="flex-1">{faq.question}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-ink-300 transition-colors group-hover:text-primary-600" />
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-ink-100 bg-white px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                  <span className="text-sm text-ink-400">Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-ink-100 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask anything else about waste or recycling..."
                className="flex-1 rounded-full border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700 disabled:opacity-40 disabled:shadow-none"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-ink-400">
              Powered by WasteHero AI · Responses may take a moment
            </p>
          </div>
        </div>
      )}
    </>
  );
}
