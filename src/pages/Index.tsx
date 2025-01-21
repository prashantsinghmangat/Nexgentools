import { Calculator, QrCode, Cloud, Puzzle, DollarSign, BrainCircuit, Image, Globe, FileText, Code } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const tools = [
  {
    title: "Calculator",
    description: "A simple yet powerful calculator for your daily computations",
    icon: Calculator,
    path: "/calculator",
    category: "Utility"
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for links, text, and more",
    icon: QrCode,
    path: "/qr-generator",
    category: "Generator"
  },
  {
    title: "Weather App",
    description: "Check weather conditions for any city worldwide",
    icon: Cloud,
    path: "/weather",
    category: "Information"
  },
  {
    title: "15 Puzzle Game",
    description: "Challenge yourself with this classic sliding puzzle game",
    icon: Puzzle,
    path: "/puzzle",
    category: "Game"
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies with real-time rates",
    icon: DollarSign,
    path: "/currency",
    category: "Finance"
  },
  {
    title: "Quiz App",
    description: "Test your knowledge with interactive quizzes",
    icon: BrainCircuit,
    path: "/quiz",
    category: "Education"
  },
  {
    title: "Image Compressor",
    description: "Compress your images without losing quality",
    icon: Image,
    path: "/image-compressor",
    category: "Media"
  },
  {
    title: "IP Finder",
    description: "Find and analyze IP addresses",
    icon: Globe,
    path: "/ip-finder",
    category: "Network"
  },
  {
    title: "Text Comparer",
    description: "Compare and find differences between texts",
    icon: FileText,
    path: "/text-comparer",
    category: "Developer"
  },
  {
    title: "Code Formatter",
    description: "Format and beautify your code",
    icon: Code,
    path: "/code-formatter",
    category: "Developer"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Ultimate Toolkit for
              <span className="text-primary"> Everything</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our collection of powerful tools designed to make your life easier.
              From development utilities to everyday tools, we've got you covered.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.path} {...tool} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;