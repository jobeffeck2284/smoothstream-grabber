import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SettingsProps {
  onSettingsChange: (settings: {
    showSnow: boolean;
    showSanta: boolean;
    showYoutubeScroll: boolean;
  }) => void;
}

export function Settings({ onSettingsChange }: SettingsProps) {
  const [showSnow, setShowSnow] = useState(false);
  const [showSanta, setShowSanta] = useState(false);
  const [showYoutubeScroll, setShowYoutubeScroll] = useState(false);

  const handleSnowToggle = (checked: boolean) => {
    setShowSnow(checked);
    onSettingsChange({ showSnow: checked, showSanta, showYoutubeScroll });
  };

  const handleSantaToggle = (checked: boolean) => {
    setShowSanta(checked);
    onSettingsChange({ showSnow, showSanta: checked, showYoutubeScroll });
  };

  const handleYoutubeScrollToggle = (checked: boolean) => {
    setShowYoutubeScroll(checked);
    onSettingsChange({ showSnow, showSanta, showYoutubeScroll: checked });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Visual Effects</SheetTitle>
          <SheetDescription>
            Configure visual effects and animations
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="snow" className="text-sm font-medium">
              Show Snow Effect
            </label>
            <Switch
              id="snow"
              checked={showSnow}
              onCheckedChange={handleSnowToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="santa" className="text-sm font-medium">
              Show Running Santa
            </label>
            <Switch
              id="santa"
              checked={showSanta}
              onCheckedChange={handleSantaToggle}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="youtube-scroll" className="text-sm font-medium">
              Show YouTube Scroll Animation
            </label>
            <Switch
              id="youtube-scroll"
              checked={showYoutubeScroll}
              onCheckedChange={handleYoutubeScrollToggle}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}