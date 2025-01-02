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
      className="fixed bottom-4 right-4 min-w-[80px] h-10 px-4"
      onClick={toggleLanguage}
    >
      <Languages className="h-5 w-5 mr-2" />
      <span className="text-sm">{language.toUpperCase()}</span>
    </Button>
  );
};