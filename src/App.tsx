import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Weather from "./pages/Weather";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import TodoList from "./pages/TodoList";
import QRGenerator from "./pages/QRGenerator";
import Puzzle from "./pages/Puzzle";
import CurrencyConverter from "./pages/CurrencyConverter";
import Quiz from "./pages/Quiz";
import ImageCompressor from "./pages/ImageCompressor";
import IPFinder from "./pages/IPFinder";
import TextComparer from "./pages/TextComparer";
import CodeFormatter from "./pages/CodeFormatter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <main className="flex-grow container mx-auto px-4 pt-20 pb-8">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/qr-generator" element={<QRGenerator />} />
              <Route path="/puzzle" element={<Puzzle />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/image-compressor" element={<ImageCompressor />} />
              <Route path="/ip-finder" element={<IPFinder />} />
              <Route path="/text-comparer" element={<TextComparer />} />
              <Route path="/code-formatter" element={<CodeFormatter />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;