import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface DownloadProgressProps {
  downloading: boolean;
  progress: number;
}

const DownloadProgress = ({ downloading, progress }: DownloadProgressProps) => {
  const { t } = useLanguage();

  if (!downloading) return null;

  return (
    <div className="space-y-1 animate-in">
      <Progress value={progress} />
      <p className="text-sm text-center text-muted-foreground">
        {progress.toFixed(1)}% {t('complete')}
      </p>
    </div>
  );
};

export default DownloadProgress;