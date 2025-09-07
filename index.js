import express from "express";
const app = express();
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/api_movies");
import Movie from "./models/Movies.js";
import movieRoutes from "./routers/movieRoutes.js";


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", movieRoutes);

app.get("/", async (req, res) => {
   try{
    const movies = await Movie.find();
    res.status(200).json({ games: games });
   }catch (error){
    console.log(error);
    res.status(500).json({error: "Erro interno do servidor."});
   }
});

const port = 4001;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`API rodando em http://localhost:${port}.`);
});