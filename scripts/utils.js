const supportedAudioFileTypes = ['mp3', 'm4a', '3ga', 'ogg', 'flac', 'wav']

const supportedVideoFileTypes = ['mp4', 'mov']

const sanitizeFilePath = (path) => {
  return path.replace('#', '%23')
}

const generateDurationText = (seconds) => {
  const string = new Date(seconds * 1000).toISOString()
  const result = seconds < 3600 ? string.substr(14, 5) : string.substr(11, 8)
  
  return result
}

const generatePositionText = (seconds, duration) => {
  if (!duration) {
    return ''
  }
  
  const string = new Date(seconds * 1000).toISOString()
  const result = duration < 3600 ? string.substr(14, 5) : string.substr(11, 8)

  return result
}

module.exports = {
  supportedAudioFileTypes,
  supportedVideoFileTypes,
  sanitizeFilePath,
  generateDurationText,
  generatePositionText
}