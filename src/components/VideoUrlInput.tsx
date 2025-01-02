import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VideoUrlInputProps {
  url: string;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onFetchInfo: () => void;
}

const VideoUrlInput = ({ url, loading, onUrlChange, onFetchInfo }: VideoUrlInputProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2">
      <Input
        placeholder={t('enterUrl')}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className="flex-1"
      />
      <Button
        onClick={onFetchInfo}
        disabled={loading || !url}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          t('fetchInfo')
        )}
      </Button>
    </div>
  );
};

export default VideoUrlInput;