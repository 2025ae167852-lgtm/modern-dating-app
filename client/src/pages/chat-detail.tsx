import { useRoute, useLocation } from "wouter";
import { useApp } from "@/lib/app-context";
import { ChevronLeft, MoreVertical, Send, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ChatDetailPage() {
  const [match, params] = useRoute("/chat/:id");
  const [, setLocation] = useLocation();
  const { matches } = useApp();
  const [msgInput, setMsgInput] = useState("");
  
  // Fake chat history
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", isMe: false },
    { id: 2, text: "I'm good, thanks! Just saw your profile.", isMe: true },
    { id: 3, text: "I love your photos! Do you hike often?", isMe: false },
  ]);

  const profile = matches.find(p => p.id === params?.id);

  if (!profile) return null; // Handle loading/not found

  const handleSend = () => {
    if (!msgInput.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msgInput, isMe: true }]);
    setMsgInput("");
    
    // Fake reply
    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now() + 1, text: "That sounds awesome! 😊", isMe: false }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border z-10 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="-ml-2" onClick={() => setLocation("/chat")}>
            <ChevronLeft size={28} />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{profile.name}</h3>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground"><Phone size={20} /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground"><Video size={20} /></Button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
        <div className="text-center text-xs text-muted-foreground my-4 uppercase tracking-widest opacity-50">Today</div>
        
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={cn("flex w-full", msg.isMe ? "justify-end" : "justify-start")}> 
              <div className={cn(
                "max-w-[75%] px-4 py-3 text-sm shadow-sm",
                msg.isMe 
                  ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm" 
                  : "bg-white text-foreground border border-border/50 rounded-2xl rounded-tl-sm"
              )}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border z-20 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Input 
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..." 
            className="rounded-full bg-muted/50 border-transparent focus:bg-white transition-colors"
          />
          <Button 
            size="icon" 
            className="rounded-full bg-primary hover:bg-primary/90 shrink-0"
            onClick={handleSend}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>

    </div>
  );
}
