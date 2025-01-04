import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, Trash2 } from "lucide-react";

interface DownloadHistoryItem {
  title: string;
  url: string;
  timestamp: number;
}

interface DownloadHistoryProps {
  history: DownloadHistoryItem[];
  onClear: () => void;
}

const DownloadHistory = ({ history, onClear }: DownloadHistoryProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('downloadHistory')}</h3>
        {history.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onClear}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {t('clearHistory')}
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[200px] rounded-md border p-4">
        {history.length === 0 ? (
          <p className="text-center text-muted-foreground">{t('noHistory')}</p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-accent/50"
              >
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="text-sm">{item.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DownloadHistory;