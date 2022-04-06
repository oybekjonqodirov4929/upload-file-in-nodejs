const express = require("express")
const cors = require("cors")
let multer = require("multer")
let bodyParser = require('body-parser')
const port = 3000

const app = express()

app.use(cors(""))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({
    storage: fileStorageEngine
})

app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log(req.file)
    res.send("uploaded")
})

app.listen(port, () => {
    console.log("server is running on port " + port)
})