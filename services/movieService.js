import Movie from "../models/Movies.js";

class movieService {
    async getAll(){
        try{
            const movies = await Movie.find();
            return movies;
        }   catch(error){
            console.log(error);
        }
    }
    async Create(title,year,genre,rating){
        try{
            const newMovie = new Movie({
                title,
                year,
                genre,
                rating
            })
            await newMovie.save()
        }catch(error){
            console.log(error)
        }
    }
    async Delete(id){
        try{
            await Movie.findByIdAndDelete(id);
            console.log(`Movie com a id: ${id} foi deletado.`)
        }catch(error){
            console.log(error)
        }
    }
    async Update(id,title,year,genre,rating){
        try{
            const updateMovie = await Movie.findByIdAndUpdate(
                id,
                {
                    title,
                    year,
                    genre,
                    rating,
                },
                { new: true}
            );
            console.log(`Dados do Movie com id: ${id} alterados com sucesso.`)
            return updateMovie;
        }catch(error){
            console.log(error);
        }
    }
    async getOne(id){
        try{
            const movie = await Movie.findOne({_id:id})
            return movie
        }catch(error){
            console.log(error)
        }
    }
}

export default new movieService();