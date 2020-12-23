const mongoose = require('mongoose');
const DB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCraeteIndexx:true, useFindAndModify:false})
        console.log('Succesfully connected to DB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = DB