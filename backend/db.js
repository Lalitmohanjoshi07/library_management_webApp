const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/library_management_system'

const connectToDb= async()=>{
    mongoose.connect(URI,
        console.log('mongoose database connected')
    )
}

module.exports= connectToDb;