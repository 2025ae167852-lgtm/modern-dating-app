import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/lib/app-context";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import SwipePage from "@/pages/swipe";
import MatchesPage from "@/pages/matches";
import ProfilePage from "@/pages/profile";
import ChatListPage from "@/pages/chat-list";
import ChatDetailPage from "@/pages/chat-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/swipe" component={SwipePage} />
      <Route path="/matches" component={MatchesPage} />
      <Route path="/chat" component={ChatListPage} />
      <Route path="/chat/:id" component={ChatDetailPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
