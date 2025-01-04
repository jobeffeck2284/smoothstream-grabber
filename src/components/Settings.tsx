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

export function Settings() {
  const [showSnow, setShowSnow] = useState(false);
  const [showSanta, setShowSanta] = useState(false);
  const [showYoutubeScroll, setShowYoutubeScroll] = useState(false);

  const handleSnowToggle = (checked: boolean) => {
    setShowSnow(checked);
  };

  const handleSantaToggle = (checked: boolean) => {
    setShowSanta(checked);
  };

  const handleYoutubeScrollToggle = (checked: boolean) => {
    setShowYoutubeScroll(checked);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="z-50">
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