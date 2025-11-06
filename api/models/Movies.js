import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
    synopses: String,
    director: String,
    genre: String
});

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: String,
    descriptions: [descriptionSchema]
});

const Movie = mongoose.model('Movie', movieSchema)

export default Movie;