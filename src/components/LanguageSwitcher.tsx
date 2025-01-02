import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4"
      onClick={toggleLanguage}
    >
      <Languages className="h-4 w-4" />
      <span className="ml-2 text-xs">{language.toUpperCase()}</span>
    </Button>
  );
};