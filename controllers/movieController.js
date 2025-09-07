import { ObjectId } from "mongodb";
import movieService from "../services/movieService.js";

const getAllMovies = async (req, res) => {
    try{
        const movies = await movieService.getAll();
        res.status(200).json({ movies: movies});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Erro interno do servidor."});
    }
};

const createMovie = async (req, res) => {
    try{
        const { title,year,genre,rating} = req.body;
        await movieService.Create(title,year,genre,rating);
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Erro interno do servidor"});
    }
}

const deleteMovie = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            movieService.Delete(id);
            res.sendStatus(204);
        }else{
            res.sendStatus(400);
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor.'});
    }
}

const updateMovie = async (req, res) => {
    try{
        if (ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const {title,year,genre,rating} = req.body;
            const movie = await movieService.Update(id,title,year,genre,rating);
            res.status(200).json({movie});
        }else{
            res.sendStatus(400);
        }
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const getOneMovie = async (req, res) => {
    try{
        if (ObjectId.isValid(req.params.id)){
            const id = req.params.id
            const movie = await movieService.getOne(id)
            if (!movie){
                res.sendStatus(404)
            }else{
                res.status(200).json({movie});
            }
        }else{
            res.sendStatus(400)
        }
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}    
export default {getAllMovies, createMovie, deleteMovie, updateMovie, getOneMovie};