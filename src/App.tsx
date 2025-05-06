
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Brokerage from "./pages/Brokerage";
import Prediction from "./pages/Prediction";
import Learning from "./pages/Learning";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ChatbotFloatingButton from "./components/ChatbotFloatingButton";
import ProtectedRoute from "./components/ProtectedRoute";
import FreeTrialTimer from "./components/FreeTrialTimer";

// Add these imports for footer pages
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsOfService from "./pages/footer/TermsOfService";
import CookiePolicy from "./pages/footer/CookiePolicy";
import Disclaimer from "./pages/footer/Disclaimer";
import Careers from "./pages/footer/Careers";
import Contact from "./pages/footer/Contact";
import Blog from "./pages/footer/Blog";
import APIDocumentation from "./pages/footer/APIDocumentation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/brokerage" element={<ProtectedRoute><Brokerage /></ProtectedRoute>} />
            <Route path="/prediction" element={<ProtectedRoute><Prediction /></ProtectedRoute>} />
            
            {/* Changed from live-demo to learning */}
            <Route path="/learning" element={<Learning />} />
            <Route path="/about" element={<About />} />
            
            {/* Footer pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/api" element={<APIDocumentation />} />
            
            {/* Redirect old live-demo path to learning */}
            <Route path="/live-demo" element={<Navigate to="/learning" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Timer visible on all pages */}
          <FreeTrialTimer />
          
          {/* Global floating chatbot that appears on all pages */}
          <ChatbotFloatingButton />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
