import express from 'express'
const movieRoutes = express.Router()
import movieController from '../controllers/movieController.js'

movieRoutes.get("/movies", movieController.getAllMovies)
movieRoutes.post("/movie", movieController.createMovie);
movieRoutes.delete("/movie/:id", movieController.deleteMovie);
movieRoutes.put("/movie/:id", movieController.updateMovie);
movieRoutes.get("/movie/:id", movieController.getOneMovie);

export default movieRoutes