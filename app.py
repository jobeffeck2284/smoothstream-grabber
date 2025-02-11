from flask import Flask, request, Response, jsonify, send_file
from flask_cors import CORS
import yt_dlp
import json
import os
import uuid
import time
from threading import Timer

app = Flask(__name__)
CORS(app)

# Хранилище временных ссылок
temp_downloads = {}

def format_duration(duration):
    minutes = duration // 60
    seconds = duration % 60
    return f"{minutes}:{seconds:02d}"

def cleanup_file(file_path, download_id):
    if os.path.exists(file_path):
        os.remove(file_path)
    if download_id in temp_downloads:
        del temp_downloads[download_id]

@app.route('/video-info', methods=['POST'])
def get_video_info():
    url = request.json.get('url')
    
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            if '_type' in info and info['_type'] == 'playlist':
                # Это плейлист
                playlist_items = [{
                    'id': entry['id'],
                    'title': entry['title'],
                    'duration': format_duration(entry['duration']) if 'duration' in entry else 'N/A',
                    'thumbnail': entry.get('thumbnail', '')
                } for entry in info['entries']]
                
                return jsonify({
                    'title': info['title'],
                    'isPlaylist': True,
                    'playlist_items': playlist_items
                })
            else:
                # Это отдельное видео
                video_formats = [{
                    'format_id': f['format_id'],
                    'ext': f['ext'],
                    'resolution': f.get('resolution', 'N/A'),
                    'filesize': f.get('filesize', 0),
                    'format_note': f.get('format_note', '')
                } for f in info['formats'] if f.get('resolution') != 'audio only']
                
                audio_formats = [{
                    'format_id': f['format_id'],
                    'ext': f['ext'],
                    'filesize': f.get('filesize', 0),
                    'format_note': f.get('format_note', ''),
                    'abr': f.get('abr', 0)
                } for f in info['formats'] if f.get('resolution') == 'audio only']
                
                return jsonify({
                    'title': info['title'],
                    'duration': format_duration(info['duration']),
                    'views': info['view_count'],
                    'thumbnail': info['thumbnail'],
                    'video_formats': video_formats,
                    'audio_formats': audio_formats,
                    'isPlaylist': False
                })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/download', methods=['POST'])
def download_video():
    url = request.json.get('url')
    video_format = request.json.get('video_format')
    audio_format = request.json.get('audio_format')
    save_path = request.json.get('save_path', 'downloads')
    selected_videos = request.json.get('selected_videos', [])
    
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    
    download_id = str(uuid.uuid4())
    output_template = f'{save_path}/%(title)s_{download_id}.%(ext)s'
    
    def progress_hook(d):
        if d['status'] == 'downloading':
            try:
                total = d.get('total_bytes', 0) or d.get('total_bytes_estimate', 0)
                downloaded = d.get('downloaded_bytes', 0)
                if total > 0:
                    progress = (downloaded / total) * 100
                    yield f"data: {json.dumps({'progress': progress})}\n\n"
            except Exception as e:
                print(f"Error in progress hook: {str(e)}")

    ydl_opts = {
        'format': f'{video_format}+{audio_format}',
        'outtmpl': output_template,
        'merge_output_format': 'mp4',
        'keepvideo': True,
        'progress_hooks': [progress_hook],
    }
    
    if selected_videos:  # Если это плейлист
        ydl_opts['playlist_items'] = ','.join(str(i+1) for i in range(len(selected_videos)))
    
    def generate():
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url)
                if '_type' in info and info['_type'] == 'playlist':
                    # Обработка плейлиста
                    for entry in info['entries']:
                        if entry:
                            filename = ydl.prepare_filename(entry)
                            final_filename = filename.replace('.' + entry['ext'], '.mp4')
                            temp_downloads[download_id] = {
                                'path': final_filename,
                                'created_at': time.time()
                            }
                            Timer(3600, cleanup_file, args=[final_filename, download_id]).start()
                            yield json.dumps({
                                'progress': 100,
                                'downloadUrl': f'/download/{download_id}'
                            })
                else:
                    # Обработка одного видео
                    filename = ydl.prepare_filename(info)
                    final_filename = filename.replace('.' + info['ext'], '.mp4')
                    
                    # Создаем временную ссылку
                    temp_downloads[download_id] = {
                        'path': final_filename,
                        'created_at': time.time()
                    }
                    
                    # Устанавливаем таймер на удаление через час
                    Timer(3600, cleanup_file, args=[final_filename, download_id]).start()
                    
                    yield json.dumps({
                        'progress': 100,
                        'downloadUrl': f'/download/{download_id}'
                    })
                
        except Exception as e:
            yield json.dumps({'error': str(e)})
    
    return Response(generate(), mimetype='application/json')

@app.route('/download/<download_id>', methods=['GET'])
def get_download(download_id):
    if download_id not in temp_downloads:
        return jsonify({'error': 'Download link expired'}), 404
        
    file_info = temp_downloads[download_id]
    if time.time() - file_info['created_at'] > 3600:
        cleanup_file(file_info['path'], download_id)
        return jsonify({'error': 'Download link expired'}), 404
        
    return send_file(
        file_info['path'],
        as_attachment=True,
        download_name=os.path.basename(file_info['path'])
    )

if __name__ == '__main__':
    app.run(debug=True)