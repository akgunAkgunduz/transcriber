module.exports = {
  audio: ['mp3', 'm4a', '3ga', 'ogg', 'flac', 'wav'],
  
  video: ['mp4', 'mov'],

  get all() {
    return [ ...this.audio, ...this.video ]
  }
}