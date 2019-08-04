const supportedFileTypes = ['mp3']

const sanitizeFilePath = (path) => path.replace('#', '%23')

const generateDurationText = (seconds) => {
  const string = new Date(seconds * 1000).toISOString()    
  return seconds < 3600 ? string.substr(14, 5) : string.substr(11, 8)
}

const generatePositionText = (seconds, duration) => {
  const string = new Date(seconds * 1000).toISOString()    
  return duration < 3600 ? string.substr(14, 5) : string.substr(11, 8)
}

module.exports = {
  supportedFileTypes,
  sanitizeFilePath,
  generateDurationText,
  generatePositionText
}