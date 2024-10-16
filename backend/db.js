const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1/library_management_system'

const connectToDb= async()=>{
    mongoose.connect(URI,
        console.log('mongoose database connected')
    )
}

module.exports= connectToDb;