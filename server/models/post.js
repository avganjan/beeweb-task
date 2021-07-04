const mongoose = require('mongoose')

const post = new mongoose.Schema(
    {
        id: String,
        date: String,
        title: String,
        content: String,
        user: String,
        reactions: Object
    }
)

module.exports = mongoose.model('Post', post)