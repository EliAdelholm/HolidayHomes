class Database {
  getUser (iUserId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT * FROM users WHERE id = ?',
        [iUserId], (error, ajResult) => {
          if (error) return reject(error)
          if (!ajResult[0]) {
            reject('User does not exist')
          }
          resolve(ajResult[0])
        })
    })
  }

  loginUser (sUserEmail, sUserPassword) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT * FROM users WHERE email = ? AND password = ?',
        [sUserEmail, sUserPassword], (error, ajResult) => {
          if (error) return reject(error)
          if (!ajResult[0]) {
            reject('User does not exist')
          }
          resolve(ajResult[0])
        })
    })
  }

  getHouses (iNumberOfHouses) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT houses.*, GROUP_CONCAT(houses_images.image) AS images FROM houses JOIN houses_images ON houses.id = houses_images.houses_id GROUP BY houses.id LIMIT ?',
        [iNumberOfHouses], (error, ajResult) => {
          if (error) return reject(error)
          if (!ajResult[0]) {
            reject('No houses to show')
          }
          resolve(ajResult)
        })
    })
  }

  getHouse (iHouseId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT *, GROUP_CONCAT(houses_images.image) AS images\n' +
      'FROM houses\n' +
      'JOIN houses_images ON houses.id = houses_images.houses_id\n' +
      'WHERE id = ?',
        [iHouseId], (error, ajResult) => {
          if (error) return reject(error)
          if (!ajResult[0]) {
            reject('House does not exist')
          }
          delete ajResult[0].image
          ajResult[0].images = ajResult[0].images.split(',')
          resolve(ajResult[0])
        })
    })
  }

  createHouse (jHouse, aHouseImages) {
    return new Promise((resolve, reject) => {
      global.con.query('INSERT INTO `houses` SET ?',
        [jHouse],
        (error, result) => {
          if (error) return reject(error)
          const houseId = result.insertId
          aHouseImages.forEach((aHouseImage) => {
            aHouseImage.unshift(houseId)
          })
          global.con.query('INSERT INTO houses_images VALUES ?',
            [aHouseImages],
            (error, result) => {
              if (error) return reject(error)
              jHouse.users_id = parseInt(jHouse.users_id)
              jHouse.id = houseId
              jHouse.images = aHouseImages
              resolve(jHouse)
            })
        })
    })
  }

  updateHouse (iHouseId, jHouse, imagesToDelete, imagesToUpload) {

    return new Promise((resolve, reject) => {
      const updateUserResult = new Promise((resolve, reject) => {
        global.con.query('UPDATE houses SET ? WHERE id = ?',
          [jHouse, iHouseId],
          (error, jResult) => {
            if (error) return reject(error)
            resolve(`error updating house: ${error} |`)
          })
      })
      let Promises = [updateUserResult]
      if (imagesToUpload.length) {
        const insertImagesResult = new Promise((resolve, reject) => {
          global.con.query('INSERT INTO houses_images VALUES ?',
            [imagesToUpload], (error, jResult) => {
            if (error) return reject(`error inserting images: ${error} |`)
            resolve()
          })
        })
        Promises.push(insertImagesResult)
      }
      if(imagesToDelete.length) {
        const deleteHouseResult = new Promise((resolve, reject) => {
          global.con.query('DELETE FROM houses_images WHERE image IN (?)',
            [imagesToDelete], (error, jResult) => {
              if (error) return reject(`error deleting images: ${error}`)
              resolve()
            })
        })
        Promises.push(deleteHouseResult)
      }
      Promise.all(Promises).then(() => {
        resolve('House updated in db')
      }).catch((e) => {
        reject(e)
      })
    })
  }

  getHousesBelongingToUser (iUserId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT houses.*, GROUP_CONCAT(houses_images.image) AS additional_images \n' +
        'FROM houses\n' +
        'JOIN houses_images ON houses.id = houses_images.houses_id\n' +
        'WHERE houses.users_id = ?' +
        'GROUP BY houses_id', [iUserId],
        (error, jResult) => {
          if (error) return reject(error)
          resolve(jResult)
        }
      )
    })
  }

  updateUser (jUser, iUserId) {
    return new Promise((resolve, reject) => {
      global.con.query('UPDATE users SET ? WHERE id = ?',
        [jUser, iUserId],
        (error, jResult) => {
          if (error) return reject(error)
          return resolve(jResult)
        })
    })
  }
  createBooking(jBooking) {
    return new Promise((resolve,reject) => {
      global.con.query('INSERT INTO bookings SET ?', [jBooking], (error, jResult) => {
        if (error) return reject(error)
        resolve(jResult)
      })
    })
  }
  createUser(jUser) {
    return new Promise((resolve,reject) => {
      global.con.query('INSERT INTO users SET ?', [jUser], (error, jResult) => {
        if (error) return reject(error)
        resolve(jResult)
      })
    })
  }
  getBookings(iHouseId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT * FROM bookings WHERE houses_id = ?', [iHouseId], (error, jResult) => {
        if (error) reject(error)
        resolve(jResult)
      })
    })
  }
  deleteHouse(iHouseId) {
    return new Promise((resolve,reject) => {
      global.con.query('DELETE FROM houses WHERE id = ?', [iHouseId], (error, jResult) => {
        if (error) reject(error)
        resolve(jResult)
      })
    })
  }

  deleteUser(iUserId) {
    return new Promise((resolve,reject) => {
      global.con.query('DELETE FROM users WHERE id = ?', [iUserId], (error, jResult) => {
        if (error) reject(error)
        resolve(jResult)
      })
    })
  }
}

module.exports = Database
