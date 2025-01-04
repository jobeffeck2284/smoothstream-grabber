import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { VideoDetails, PlaylistItem } from '@/components/VideoDownloader.types';

interface DownloadHistoryItem {
  title: string;
  url: string;
  timestamp: number;
}

export const useDownloadManager = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [selectedVideoFormat, setSelectedVideoFormat] = useState<string>('');
  const [selectedAudioFormat, setSelectedAudioFormat] = useState<string>('');
  const [savePath, setSavePath] = useState('downloads');
  const [selectedVideos, setSelectedVideos] = useState<PlaylistItem[]>([]);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>(() => {
    const saved = localStorage.getItem('downloadHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
  }, [downloadHistory]);

  const handleFetchInfo = async () => {
    if (!url) {
      toast({
        title: t('error'),
        description: t('enterUrl'),
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
      if (data.isPlaylist && data.playlist_items) {
        setSelectedVideos(data.playlist_items);
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
      toast({
        title: t('error'),
        description: t('fetchError'),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoDetails?.isPlaylist && (!selectedVideoFormat || !selectedAudioFormat)) {
      toast({
        title: t('error'),
        description: t('selectFormats'),
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
          selected_videos: selectedVideos.map(video => video.id),
        }),
      });

      if (!response.ok) throw new Error('Download failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to initialize download');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (data.progress) {
                setProgress(data.progress);
              }
              if (data.downloadUrl) {
                if (videoDetails) {
                  setDownloadHistory(prev => [{
                    title: videoDetails.title,
                    url: url,
                    timestamp: Date.now()
                  }, ...prev]);
                }
                
                // Create a temporary link and trigger download
                const link = document.createElement('a');
                link.href = `http://localhost:5000${data.downloadUrl}`;
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast({
                  title: t('downloadComplete'),
                  description: t('videoDownloaded'),
                  duration: 5000,
                });
              }
            } catch (e) {
              console.error('Error parsing progress data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: t('error'),
        description: t('downloadError'),
        variant: "destructive"
      });
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  const clearHistory = () => {
    setDownloadHistory([]);
  };

  return {
    url,
    setUrl,
    loading,
    downloading,
    progress,
    videoDetails,
    selectedVideoFormat,
    selectedAudioFormat,
    savePath,
    selectedVideos,
    downloadHistory,
    handleFetchInfo,
    handleDownload,
    handleFormatSelect: setSelectedVideoFormat,
    handleAudioFormatSelect: setSelectedAudioFormat,
    handleSavePathChange: setSavePath,
    handleVideoSelection: setSelectedVideos,
    clearHistory,
  };
};