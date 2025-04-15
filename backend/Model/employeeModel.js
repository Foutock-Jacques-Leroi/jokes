import mongoose from 'mongoose'









const FriendSchema = new mongoose.Schema({

    name: String,
    age: Number,
    gender: String,
    salary: Number,
    address: String,
    status: String,
    email: String

})


const FriendModel = mongoose.model('credentials', FriendSchema)

export default FriendModel