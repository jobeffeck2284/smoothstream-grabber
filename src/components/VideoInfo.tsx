import { Card } from '@/components/ui/card';
import type { VideoDetails } from './VideoDownloader';

interface VideoInfoProps {
  details: VideoDetails;
}

const VideoInfo = ({ details }: VideoInfoProps) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <img
          src={details.thumbnail}
          alt={details.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="space-y-1">
        <h2 className="font-semibold line-clamp-2">{details.title}</h2>
        <div className="flex gap-3 text-sm text-muted-foreground">
          <span>{details.duration}</span>
          <span>•</span>
          <span>{new Intl.NumberFormat().format(details.views)} views</span>
        </div>
      </div>
    </Card>
  );
};

export default VideoInfo;