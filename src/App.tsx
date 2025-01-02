import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Index />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;