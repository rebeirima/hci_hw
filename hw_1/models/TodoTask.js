//we made our collection schema and we exported so we could use it in the index.js file
const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);