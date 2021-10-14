require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true,
}))


//Router
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/productRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api',require('./routes/index'))


//connection to mongodb
const URI = process.env.MONGO_URI
mongoose.connect(URI,{
    // useCreateIndex: true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
},err => {
    if(err) throw err;
    console.log('connected to MongoDB')
})

app.get('/',(req, res) => {
    res.json({msg:"hello world"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})