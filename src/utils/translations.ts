export type Language = 'en' | 'ru';

export type TranslationKey = 
  | 'enterUrl'
  | 'selectFormats'
  | 'downloadComplete'
  | 'videoDownloaded'
  | 'fetchError'
  | 'playlistVideos'
  | 'downloadHistory'
  | 'noHistory'
  | 'clearHistory'
  | 'title'
  | 'subtitle'
  | 'selectQuality'
  | 'selectAudioQuality'
  | 'savePath'
  | 'downloading'
  | 'download'
  | 'complete'
  | 'fetchInfo'
  | 'error'
  | 'downloadError';

export const translations = {
  en: {
    enterUrl: 'Please enter a YouTube URL',
    selectFormats: 'Please select both video and audio formats',
    downloadComplete: 'Download Complete',
    videoDownloaded: 'Your video has been downloaded',
    fetchError: 'Failed to fetch video information',
    playlistVideos: 'Playlist Videos',
    downloadHistory: 'Download History',
    noHistory: 'No download history',
    clearHistory: 'Clear History',
    title: 'YouTube Downloader',
    subtitle: 'Download videos and playlists from YouTube',
    selectQuality: 'Select Video Quality',
    selectAudioQuality: 'Select Audio Quality',
    savePath: 'Save Path',
    downloading: 'Downloading...',
    download: 'Download',
    complete: 'Complete',
    fetchInfo: 'Fetch Info',
    error: 'Error',
    downloadError: 'Download failed'
  },
  ru: {
    enterUrl: 'Введите URL YouTube',
    selectFormats: 'Выберите форматы видео и аудио',
    downloadComplete: 'Загрузка завершена',
    videoDownloaded: 'Ваше видео было загружено',
    fetchError: 'Не удалось получить информацию о видео',
    playlistVideos: 'Видео из плейлиста',
    downloadHistory: 'История загрузок',
    noHistory: 'История загрузок пуста',
    clearHistory: 'Очистить историю',
    title: 'YouTube Загрузчик',
    subtitle: 'Скачивайте видео и плейлисты с YouTube',
    selectQuality: 'Выберите качество видео',
    selectAudioQuality: 'Выберите качество аудио',
    savePath: 'Путь сохранения',
    downloading: 'Загрузка...',
    download: 'Скачать',
    complete: 'Завершено',
    fetchInfo: 'Получить информацию',
    error: 'Ошибка',
    downloadError: 'Ошибка загрузки'
  }
};