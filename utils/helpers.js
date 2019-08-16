const supportedFileTypes = require('./supportedFileTypes')

exports.isFileTypeSupported = filePath => supportedFileTypes.all.includes(filePath.split('.').pop().toLowerCase())

exports.sanitizeFilePath = path => path.replace('#', '%23')

exports.generateDurationText = seconds => {
  const dateString = new Date(seconds * 1000).toISOString()
  const durationText = seconds < 3600 ? dateString.substr(14, 5) : dateString.substr(11, 8)

  return durationText
}

exports.generatePositionText = (seconds, duration) => {
  if (!duration) {
    return ''
  }
  
  const dateString = new Date(seconds * 1000).toISOString()
  const positionText = duration < 3600 ? dateString.substr(14, 5) : dateString.substr(11, 8)

  return positionText
}