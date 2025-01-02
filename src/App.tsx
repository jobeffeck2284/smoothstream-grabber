import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <Index />
    </ThemeProvider>
  );
}

export default App;