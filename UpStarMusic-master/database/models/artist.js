const mongoose = require('mongoose');
const AlbumSchema = require('./album');

const ArtistSchema = new mongoose.Schema({
    name: String,  // name: { type: String, text: true } ---> Index defined here
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    albums: [AlbumSchema]
});

const Artist = mongoose.model('artist', ArtistSchema); // User represent whole user collection of data

module.exports = Artist;