const express = require('express')
const cors = require('cors')
const app = express()
const path=require('path')
const fileUpload = require('express-fileupload');
const cookieParser=require('cookie-parser')
const database = require('./Database/database');

const saveBooking = require('./Components/appointmentBooking/appointmentBookingRouter');




app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()
database(process.env.database_url)

app.use(fileUpload())

app.use(cookieParser())


app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.json("hello test")
});


app.use('/booking',saveBooking)


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
