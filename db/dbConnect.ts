import mongoose from "mongoose";
import { config }  from "dotenv";

config();

export default async function dbConnect (){
    if (mongoose.connection.readyState >= 1 ) return;
        try {
            const dbURI = process.env.DB_URI!;  // (DB_CONNECTION ) ESTA EN .ENV
                                               // con el simbolo ! le digo qe jamas va a estar vacia esa variable
            await mongoose.connect(dbURI);
            console.log("Conectao a la base de datos");
            }
            catch (error){
               
                console.error("Detalles del error:", error);
                        }
}