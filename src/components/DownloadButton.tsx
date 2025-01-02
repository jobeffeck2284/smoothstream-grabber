import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DownloadButtonProps {
  downloading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const DownloadButton = ({ downloading, disabled, onClick }: DownloadButtonProps) => {
  const { t } = useLanguage();

  return (
    <Button
      className="w-full"
      onClick={onClick}
      disabled={disabled || downloading}
    >
      {downloading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {downloading ? t('downloading') : t('download')}
    </Button>
  );
};

export default DownloadButton;