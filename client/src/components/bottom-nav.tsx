import { Link, useLocation } from "wouter";
import { Copy, Heart, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/swipe", icon: Copy, label: "Swipe" },
    { href: "/matches", icon: Heart, label: "Matches" },
    { href: "/chat", icon: MessageCircle, label: "Chat" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border py-2 px-6 pb-6 md:pb-2 z-50 flex justify-between items-center max-w-md mx-auto w-full shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link key={item.href} href={item.href}>
            <div className={cn(
              "flex flex-col items-center justify-center space-y-1 w-16 h-14 transition-colors duration-200 cursor-pointer",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}>
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-transform duration-200", isActive && "scale-110")}
              />
              <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
