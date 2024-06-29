import express from 'express';
import colors from 'colors';
import cors, { CorsOptions} from 'cors';
import morgan from 'morgan';
import router from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger';

// Connect to the database
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue('Connection has been established successfully.'));
    } catch (error) {
        console.log(error)
        console.error(colors.red('Unable to connect to the database'));
    }
}

connectDB();

// Create an express server
const server: express.Application = express();

// allow conecctions
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS Error')) 
        }
    }
}
server.use(cors(corsOptions))

// read json data
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server;