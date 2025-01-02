export const translations = {
  en: {
    title: "YouTube Downloader",
    subtitle: "Download YouTube videos in your preferred quality",
    enterUrl: "Enter YouTube URL",
    fetchInfo: "Fetch Info",
    selectQuality: "Select Quality",
    selectAudioQuality: "Select Audio Quality",
    savePath: "Save Location",
    download: "Download",
    downloading: "Downloading...",
    complete: "Complete",
    openFolder: "Open Download Folder",
    settings: "Settings",
    effects: {
      snow: "Snow Effect",
      santa: "Running Santa",
      youtubeScroll: "YouTube Scroll Animation"
    },
    downloadComplete: "Download Complete",
    videoDownloaded: "Video downloaded successfully!"
  },
  ru: {
    title: "Загрузчик YouTube",
    subtitle: "Скачивайте видео с YouTube в предпочитаемом качестве",
    enterUrl: "Введите URL YouTube",
    fetchInfo: "Получить информацию",
    selectQuality: "Выберите качество",
    selectAudioQuality: "Выберите качество аудио",
    savePath: "Путь сохранения",
    download: "Скачать",
    downloading: "Загрузка...",
    complete: "Завершено",
    openFolder: "Открыть папку загрузки",
    settings: "Настройки",
    effects: {
      snow: "Эффект снега",
      santa: "Бегущий Санта",
      youtubeScroll: "Анимация прокрутки YouTube"
    },
    downloadComplete: "Загрузка завершена",
    videoDownloaded: "Видео успешно загружено!"
  }
};

export type Language = 'en' | 'ru';
export type TranslationKey = keyof typeof translations.en;