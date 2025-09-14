import mongoose from "mongoose";

const dbUser = "viniciussouzacamargocosta_db_user";
const dbPassword = "JVmW5MhBSciLgzHk";
const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.waplvqd.mongodb.net/API_MOVIES?retryWrites=true&w=majority&appName=Cluster0`
    );
    const connection = mongoose.connection;
    connection.on("error", () => {
        console.log("Erro ao conectar com o mongoDB.")
    });
    connection.on("open", () =>{
        console.log("Conectando com o mongoDB com sucesso!");
    });
};
connect();
export default mongoose;
