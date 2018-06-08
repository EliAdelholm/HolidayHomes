const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');
const sharp = require('sharp')

function decodeAndSaveImage (image, resize = false) {
  return new Promise((resolve,reject) => {

    const filename = `${uuid()}.${image.extension}`

    try {
      const buf = new Buffer(image.base64, "base64")

      // Save image in compiled code - used in production
      const fileSaveOne = new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, '../../dist/assets/img/', filename), buf, function (error) {
          if (error) {
            reject(error)
          }
          if(resize) {
            sharp(buf).resize(400,400).toFile(path.join(__dirname, '../../dist/assets/img/', `thumbnail-${filename}`)).then(() => {
              resolve()
            }).catch((e) => { console.log(e) })
          }
          else {
            resolve()
          }
        });
      })
      // In dev mode we need to upload in two places in order to keep the images on re-build
      const fileSaveTwo = new Promise ((resolve,reject) => {
        fs.writeFile(path.join(__dirname, '../../src/assets/img/', filename), buf, function (error) {
          if (error) {
            reject(error)
          }
          if (resize) {
            sharp(buf).resize(400,400).toFile(path.join(__dirname, '../../src/assets/img/', `thumbnail-${filename}`)).then(() => {
              resolve()
            }).catch((e) => { console.log(e) })
          }
          else {
            resolve()
          }
        });
      })

      Promise.all([fileSaveOne, fileSaveTwo]).then(function(values) {
        resolve(filename)
      });

    } catch (ex) {
      console.log('EXCEPTION in DecodeBase64: ' + ex)
      reject('Exception in DecodeBase64 '+ex)
    }})
}

module.exports = decodeAndSaveImage


