export interface VideoFormat {
  format_id: string;
  ext: string;
  resolution: string;
  filesize: number;
  format_note: string;
}

export interface AudioFormat {
  format_id: string;
  ext: string;
  filesize: number;
  format_note: string;
  abr: number;
}

export interface PlaylistItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

export interface VideoDetails {
  title: string;
  duration: string;
  views: number;
  thumbnail: string;
  video_formats: VideoFormat[];
  audio_formats: AudioFormat[];
  isPlaylist?: boolean;
  playlist_items?: PlaylistItem[];
}