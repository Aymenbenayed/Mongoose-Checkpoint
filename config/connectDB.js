// require mongoose 
const mongoose= require ('mongoose')

//connection to Database

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex :true
    })
    console.log(`Database is connected...`)
    } catch (error) {
        console.error(`connection database failed !!!  ${error}`)
    }
}
module.exports = connectDB