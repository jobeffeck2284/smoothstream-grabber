import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Youtube } from 'lucide-react';
import VideoInfo from './VideoInfo';
import QualitySelector from './QualitySelector';
import AudioQualitySelector from './AudioQualitySelector';
import { ThemeToggle } from './ThemeToggle';
import { Settings } from './Settings';
import { SnowEffect } from './SnowEffect';
import { RunningSanta } from './RunningSanta';
import { YoutubeScroll } from './YoutubeScroll';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoUrlInput from './VideoUrlInput';
import DownloadProgress from './DownloadProgress';
import DownloadButton from './DownloadButton';
import type { VideoDetails } from './VideoDownloader.types';

export const VideoDownloader = () => {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [selectedVideoFormat, setSelectedVideoFormat] = useState<string>('');
  const [selectedAudioFormat, setSelectedAudioFormat] = useState<string>('');
  const [savePath, setSavePath] = useState('downloads');
  const [showSnow, setShowSnow] = useState(false);
  const [showSanta, setShowSanta] = useState(false);
  const [showYoutubeScroll, setShowYoutubeScroll] = useState(false);
  const { toast } = useToast();

  const handleSettingsChange = ({ 
    showSnow, 
    showSanta, 
    showYoutubeScroll 
  }: { 
    showSnow: boolean; 
    showSanta: boolean;
    showYoutubeScroll: boolean;
  }) => {
    setShowSnow(showSnow);
    setShowSanta(showSanta);
    setShowYoutubeScroll(showYoutubeScroll);
  };

  const openDownloadFolder = () => {
    window.open(savePath, '_blank');
  };

  const fetchVideoInfo = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/video-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to fetch video info');

      const data = await response.json();
      setVideoDetails(data);
      console.log('Video details fetched:', data);
    } catch (error) {
      console.error('Error fetching video info:', error);
      toast({
        title: "Error",
        description: "Failed to fetch video information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async () => {
    if (!selectedVideoFormat || !selectedAudioFormat) {
      toast({
        title: "Error",
        description: "Please select both video and audio formats",
        variant: "destructive"
      });
      return;
    }

    setDownloading(true);
    setProgress(0);

    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          video_format: selectedVideoFormat,
          audio_format: selectedAudioFormat,
          save_path: savePath,
        }),
      });

      if (!response.ok) throw new Error('Download failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to initialize download');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        try {
          const data = JSON.parse(text);
          if (data.progress) {
            setProgress(data.progress);
          }
        } catch (e) {
          console.log('Progress update:', text);
        }
      }

      toast({
        title: t('downloadComplete'),
        description: (
          <div className="flex flex-col space-y-2">
            <p>{t('videoDownloaded')}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openDownloadFolder}
            >
              {t('openFolder')}
            </Button>
          </div>
        ),
        duration: 5000,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Download failed",
        variant: "destructive"
      });
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="gradient-bg" />
      {showSnow && <SnowEffect />}
      {showSanta && <RunningSanta />}
      {showYoutubeScroll && <YoutubeScroll />}
      
      <div className="fixed top-4 right-4 flex gap-2">
        <ThemeToggle />
        <Settings onSettingsChange={handleSettingsChange} />
      </div>

      <Card className="max-w-2xl mx-auto p-6 backdrop-blur-sm bg-background/80">
        <div className="space-y-6 animate-in">
          <div className="flex flex-col items-center gap-2 text-center">
            <Youtube className="h-10 w-10 text-primary" />
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          <VideoUrlInput
            url={url}
            loading={loading}
            onUrlChange={setUrl}
            onFetchInfo={fetchVideoInfo}
          />

          {videoDetails && (
            <div className="space-y-4 animate-in">
              <VideoInfo details={videoDetails} />
              <QualitySelector
                formats={videoDetails.video_formats}
                selectedFormat={selectedVideoFormat}
                onFormatSelect={setSelectedVideoFormat}
              />
              <AudioQualitySelector
                formats={videoDetails.audio_formats}
                selectedFormat={selectedAudioFormat}
                onFormatSelect={setSelectedAudioFormat}
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('savePath')}</label>
                <Input
                  type="text"
                  value={savePath}
                  onChange={(e) => setSavePath(e.target.value)}
                  placeholder={t('savePath')}
                />
              </div>
              
              <div className="space-y-2">
                <DownloadButton
                  downloading={downloading}
                  disabled={!selectedVideoFormat || !selectedAudioFormat}
                  onClick={downloadVideo}
                />
                
                <DownloadProgress
                  downloading={downloading}
                  progress={progress}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
      <LanguageSwitcher />
    </div>
  );
};

export default VideoDownloader;