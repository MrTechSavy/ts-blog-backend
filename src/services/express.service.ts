import express, {Application} from 'express';
import bodyParser from 'body-parser';
import apiRouter from '../routes';
import cors, {CorsOptions} from 'cors';
import appConfig from '../configs/app.config'

const corsOptions: CorsOptions = {
    origin: "http://localhost:8000"
}

const app: Application = express()

app.use(bodyParser.json());

app.use(cors(corsOptions))

app.use('/api/v1',apiRouter);

export const start = ():void => {
    const port = appConfig.port || 8000
    app.listen(port, (err?: Error) => {
        if(err){
            // Log an error message and exit the process if there's a problem starting the server
            console.log(`Erreur: ${err}`)
            process.exit(-1);
        }
        // Log a message indicating that the server is running
        console.log(`L'application est en marche sur le port ${port}`)
    })
}