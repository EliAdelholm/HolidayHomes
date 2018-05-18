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
      global.con.query('SELECT *, GROUP_CONCAT(houses_images.image)\n' +
        'FROM houses\n' +
        'JOIN houses_images ON houses.id = houses_images.houses_id',
        [iHouseId], (error, ajResult) => {
          if (error) return reject(error)
          if (!ajResult[0]) {
            reject('User does not exist')
          }
          resolve(ajResult[0])
        })
    })
  }

  createHouse (jHouse , aHouseImages) {
    return new Promise((resolve, reject) => {
      global.con.query('INSERT INTO `houses` SET ?',
        [jHouse],
        (error, result) => {
          if (error) return reject(error)
          const houseId = result.insertId
          let sqlQuery = "INSERT INTO houses_images VALUES "
          aHouseImages.forEach((aHouseImage) => {
            aHouseImage.unshift(houseId)
        });
          global.con.query("INSERT INTO houses_images VALUES ?",
            [aHouseImages],
            (error, result) => {
              if (error) return reject(error)
              console.log(result)
              resolve('Houses saved successfully')
            })
        })
    })
  }

  getHousesBelongingToUser (iUserId) {
    return new Promise((resolve, reject) => {
      global.con.query('SELECT houses.*, GROUP_CONCAT(houses_images.image) \n' +
        'FROM houses\n' +
        'JOIN houses_images ON houses.id = houses_images.houses_id\n' +
        'WHERE houses.users_id = 2', [iUserId],
        (error, jResult) => {
          if (error) return reject(error)
          resolve(jResult)
        }
      )
    })
  }
  updateUser(jUser, iUserId) {
    return new Promise((resolve, reject) => {
      global.con.query('UPDATE users SET ? WHERE id = ?',
        [jUser, iUserId],
        (error, jResult) => {
          if (error) return reject(error)
          return resolve(jResult)
        })
    })
  }

}

module.exports = Database
