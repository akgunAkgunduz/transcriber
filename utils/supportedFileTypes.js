module.exports = {
  audio: ['mp3', 'm4a', '3ga', 'ogg', 'flac', 'wav'],
  
  video: ['mp4', 'mov', '3gp'],

  get all() {
    return [ ...this.audio, ...this.video ]
  }
}