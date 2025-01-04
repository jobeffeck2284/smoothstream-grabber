import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import "./styles/animations.css";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <div className="theme-transition">
          <Index />
          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;