import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <Index />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;