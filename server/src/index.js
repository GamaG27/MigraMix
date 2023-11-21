import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

/*paquete de logging http */
import morgan from 'morgan';

import authRouter from './routes/auth.routes.js';
import organizerRoutes from './routes/organizer.routes.js';

const server = express();
server.use(morgan('dev'));

/* expres podra convertir request de cliente en json, o se leeran como undefined */
server.use(express.json());

server.use('/api', authRouter);
server.use('/organizers', organizerRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`server listen in port ${PORT}`));
