/** Dependencies ************/
const express = require('express')
const formidable = require('express-formidable');
const app = express()
const mysql = require('mysql')
const sharp = require('sharp')
const fs = require('fs-extra')
const path = require('path')

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
/* TESTING
app.use(express.static(`${__dirname}/../public`))
*/

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/test.html`)
})

/** API  ************/
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

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



  /*
app.post('/save-image', (req, res) => {
  const extName = path.extname(req.files.file.name)

  if (['.png', '.jpg', '.jpeg'].includes(extName)) {
    console.log("Valid image was uploaded")

    // Handle image upload
    // Get temporary file path
    const tempPath = req.files.file.path

    // Generate new path, using timestamp to avoid duplication errors
    const timestamp = + new Date()
    const imagePath = "assets/img/" + timestamp + extName
    const targetPath = path.resolve('../src/' + imagePath)

    // Actually move the file to permanent storage
    fs.move(tempPath, targetPath, function (err) {
      if (err) throw err;
      console.log("Upload completed!");
    });

  } else {
    console.log("No valid image")
    // Set the path for default image
    imagePath = "assets/img/default-event.jpg";
  }

/*
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  image = sharp(__dirname+'/test.jpg').resize(200,200).toFile('output.jpg').then(() => {
    console.log('test')
  }).catch((e) => { return res.send(e)})
  return res.send(Ok imaged saved)
})
  */

/** Connection  ************/
app.listen(3000, (err) => {
  if (err) {
    console.log(err)
    return false
  }
  console.log('Server is listening to port 3000')
})
