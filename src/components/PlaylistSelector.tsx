import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PlaylistItem } from './VideoDownloader.types';

interface PlaylistSelectorProps {
  items: PlaylistItem[];
  onSelectionChange: (selectedItems: PlaylistItem[]) => void;
}

const PlaylistSelector = ({ items, onSelectionChange }: PlaylistSelectorProps) => {
  const { t } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<PlaylistItem[]>(items);

  const handleToggle = (item: PlaylistItem) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter(i => i.id !== item.id)
      : [...selectedItems, item];
    
    setSelectedItems(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">{t('playlistVideos')}</h3>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={selectedItems.includes(item)}
                onCheckedChange={() => handleToggle(item)}
              />
              <label
                htmlFor={item.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.title}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PlaylistSelector;