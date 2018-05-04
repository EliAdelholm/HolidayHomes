class Database {
  getUser(iUserId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT * FROM users WHERE id = ?',
        [iUserId], (error, ajResult) => {
          if (error) return reject(error);
          if (!ajResult[0]) {
            reject('User does not exist')
          }
          resolve(ajResult[0])
        })
    })
  }

  loginUser(sUserEmail, sUserPassword) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT * FROM users WHERE email = ? AND password = ?',
        [sUserEmail, sUserPassword], (error, ajResult) => {
          if (error) return reject(error);
          if (!ajResult[0]) {
            reject('User does not exist')
          }
          resolve(ajResult[0])
        })
    })
  }

  getHouses(iNumberOfHouses) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT id, thumbnail_image, headline, price, space, address FROM houses LIMIT ?',
        [iNumberOfHouses], (error, ajResult) => {
          if (error) return reject(error);
          if (!ajResult[0]) {
            reject('No houses to show')
          }
          resolve(ajResult)
        })
    })
  }
  getHouse(iHouseId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT houses.*, GROUP_CONCAT(houses_images.image)\n' +
        'FROM houses\n' +
        'JOIN houses_images ON houses.id = houses_images.houses_id',
        [iHouseId], (error, ajResult) => {
          if (error) return reject(error);
          if (!ajResult[0]) {
            reject('User does not exist')
          }
          resolve(ajResult[0])
        })
    })
  }
}

module.exports = Database
