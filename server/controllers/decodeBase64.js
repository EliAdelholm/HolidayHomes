const path = require('path');
const fs = require('fs');

module.exports = function (image, fCallback) {

  let filename = 'uploads/test-' + timestamp + '-' + userId + '.' + image.extension

  try {
    const buf = new Buffer(image.base64, "base64")

    // Save image in compiled code - used in production
    fs.writeFile(path.join(__dirname, '../../dist/assets/img/', filename), buf, function (error) {
      if (error) {
        console.log(error)
        return fCallback(true, null)
      }

      // In dev mode we need to upload in two places in order to keep the images on re-build
      fs.writeFile(path.join(__dirname, '../../src/assets/img/', filename), buf, function (error) {
          if (error) {
              console.log(error)
              return fCallback(true, null)
          }

      console.log('File created from base64 string!');
      return fCallback(false, filename)
      });
    });

  } catch (ex) {
    console.log('EXCEPTION in DecodeBase64: ' + ex)
    return fCallback(true, null)
  }

}
