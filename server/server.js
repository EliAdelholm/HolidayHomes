/** Dependencies ************/
const express = require('express')
const formidable = require('express-formidable');
const app = express()
const mysql = require('mysql')
const sharp = require('sharp')
const fs = require('fs-extra')
const path = require('path')
const mime = require('mime-types')

app.use(formidable());
/** Imports  ************/
const dbClass = require('./controllers/database.js')
const db = new dbClass

/** sql connection ************/
global.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'holidayhouses'
});

global.con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mysql!");
});

/** Server side routing  ************/

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/test.html`)
})

/** API  ************/

/** Get one user **/
app.get('/get-user', async (req, res) => {
  const iUserId = req.query.id
  const ajUsers = await db.getUser(iUserId)
  return res.send(ajUsers)
})

/** Login **/
app.get('/login', async (req, res) => {
  const sUserEmail = req.query.email
  const sUserPassword = req.query.password
  try {
    const ajUsers = await db.loginUser(sUserEmail, sUserPassword)
    return res.send(ajUsers)
  } catch (e) {
    return res.send(e)
  }
})

/** Get details about one house house **/
app.get('/get-house', async (req, res) => {
  const iHouseId = req.query.id
  try {
    const jHouse = await db.getHouse(iHouseId);
    return res.send(jHouse)
  } catch (e) {
    return res.send(e)
  }
})

/** Get houses **/
app.get('/get-houses', async (req, res) => {
  const iNumberOfHouses = parseInt(req.query.number)
  try {
    const ajHouses = await db.getHouses(iNumberOfHouses)
    return res.send(ajHouses)
  } catch (e) {
    return res.send(e)
  }
})

/** Create house **/
app.post('/create-house' , async (req,res) => {
  const thumbnailMimeType = mime.contentType(req.files.thumbnail.name)
  try{

    if (thumbnailMimeType.split('/')[0] !== 'image') {
      return res.send('The upload is not a valid image')
    }
    // Get temporary file path
    // Handle image upload
    const tempPath = req.files.thumbnail.path
    const extName = path.extname(req.files.thumbnail.name)
    // Generate new path, using timestamp to avoid duplication errors
    const timestamp = + new Date()
    const targetPath = "src/assets/img/" + timestamp + extName

    fs.move(tempPath, targetPath, function (err) {
      if (err) throw err;
      console.log("Upload completed!");
      const image = sharp(targetPath).resize(200,200).toFile('src/assets/img' + timestamp +'small'+extName).then(() => {
        console.log('Success!')
      }).catch((e) => { console.log(e) })
    });

    console.log(image)
    const jHouse = {
      users_id: req.fields.userid,
      thumbnail_image: targetPath,
      headline: req.fields.headline,
      description: req.fields.description,
      price: req.fields.price,
      address: req.fields.address,
      space: req.fields.space,
      is_house: req.fields.house,
      wifi: req.fields.wifi,
      familyfriendly: req.fields.familyFriendly,
      tv: req.fields.tv,
      dryer: req.fields.dryer
    }
    const response = await db.createHouse(jHouse)
    return res.send(response)
  } catch (e) {
    console.log('error saving house '+e)
  }
})

/** Connection  ************/
app.listen(3000, (err) => {
  if (err) {
    console.log(err)
    return false
  }
  console.log('Server is listening to port 3000')
})
