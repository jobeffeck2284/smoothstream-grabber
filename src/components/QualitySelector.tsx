import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import type { VideoFormat } from './VideoDownloader';

interface QualitySelectorProps {
  formats: VideoFormat[];
  selectedFormat: string;
  onFormatSelect: (format: string) => void;
}

const QualitySelector = ({
  formats,
  selectedFormat,
  onFormatSelect,
}: QualitySelectorProps) => {
  const { t } = useLanguage();
  const sortedFormats = [...formats].sort((a, b) => {
    const aSize = a.filesize || 0;
    const bSize = b.filesize || 0;
    return bSize - aSize;
  });

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t('selectQuality')}</label>
      <Select value={selectedFormat} onValueChange={onFormatSelect}>
        <SelectTrigger>
          <SelectValue placeholder={t('selectQuality')} />
        </SelectTrigger>
        <SelectContent>
          {sortedFormats.map((format) => (
            <SelectItem key={format.format_id} value={format.format_id}>
              {format.resolution} - {format.ext} ({format.format_note})
              {format.filesize && ` - ${(format.filesize / 1024 / 1024).toFixed(1)} MB`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default QualitySelector;