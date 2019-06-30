/**
 * Library for storing and editing data
 */

// Dependencies
const fs = require('fs')
const path = require('path')

// Container for the module
const lib = {}

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/')

// Write data to file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data)

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false)
            } else {
              callback('Error closing new file')
            }
          })
        } else {
          callback('Error writing to new file')
        }
      })
    } else {
      callback('Could not create new file, it may already exist')
    }
  })
}

// Read data from file
lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
    callback(err, data)
  })
}

// Update data inside a file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data)

      // Truncate the data of the file
      fs.truncate(fileDescriptor, function (err) {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, function (err) {
            if (!err) {
              fs.close(fileDescriptor, function (err) {
                if (!err) {
                  callback(false)
                } else {
                  callback('Error closing existing file')
                }
              })
            } else {
              callback('Error writing existing file')
            }
          })
        } else {
          callback('Error on truncating existing file')
        }
      })
    } else {
      callback('Could not open file, it might not exist')
    }
  })
}

// Export the module
module.exports = lib
