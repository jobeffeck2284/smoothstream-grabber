import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VideoInfo from './VideoInfo';
import QualitySelector from './QualitySelector';
import AudioQualitySelector from './AudioQualitySelector';
import { ThemeToggle } from './ThemeToggle';
import { Settings } from './Settings';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoUrlInput from './VideoUrlInput';
import DownloadProgress from './DownloadProgress';
import DownloadButton from './DownloadButton';
import PlaylistSelector from './PlaylistSelector';
import DownloadHistory from './DownloadHistory';
import { useDownloadManager } from '@/hooks/useDownloadManager';
import type { VideoDetails, PlaylistItem } from './VideoDownloader.types';

export const VideoDownloader = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const {
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
    handleFormatSelect,
    handleAudioFormatSelect,
    handleSavePathChange,
    handleVideoSelection,
    clearHistory,
  } = useDownloadManager();

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <div className="animated-gradient-bg" />
      
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <ThemeToggle />
        <Settings />
      </div>

      <Card className="max-w-2xl mx-auto p-6 backdrop-blur-sm bg-background/80 mt-16">
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
            onFetchInfo={handleFetchInfo}
          />

          {videoDetails && (
            <div className="space-y-4 animate-in">
              <VideoInfo details={videoDetails} />
              
              {videoDetails.isPlaylist ? (
                <PlaylistSelector
                  items={videoDetails.playlist_items || []}
                  onSelectionChange={handleVideoSelection}
                />
              ) : (
                <>
                  <QualitySelector
                    formats={videoDetails.video_formats}
                    selectedFormat={selectedVideoFormat}
                    onFormatSelect={handleFormatSelect}
                  />
                  <AudioQualitySelector
                    formats={videoDetails.audio_formats}
                    selectedFormat={selectedAudioFormat}
                    onFormatSelect={handleAudioFormatSelect}
                  />
                </>
              )}

              <DownloadButton
                downloading={downloading}
                disabled={!selectedVideoFormat || !selectedAudioFormat}
                onClick={handleDownload}
              />
              
              <DownloadProgress
                downloading={downloading}
                progress={progress}
              />
            </div>
          )}

          {downloadHistory.length > 0 && (
            <DownloadHistory
              history={downloadHistory}
              onClear={clearHistory}
            />
          )}
        </div>
      </Card>
      <LanguageSwitcher />
    </div>
  );
};

export default VideoDownloader;