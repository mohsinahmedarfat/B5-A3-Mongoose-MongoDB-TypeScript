import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const PORT = 5000;

async function main(){
    try {
        await mongoose.connect('mongodb+srv://mohsinarfat53:mohsinarfat53@cluster0.0xqywot.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0');
    console.log("connected to Mongodb using Mongoose");
        server = app.listen(PORT, ()=>{
            console.log(`app is listening on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main();