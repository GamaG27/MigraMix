import express from "express";
import dotenv from "dotenv";

dotenv.config();

/*paquete de logging http */
import morgan from "morgan";
import cors from "cors"; //linea agregada por anggi

import authRouter from "./routes/auth.routes.js";
import organizerRoutes from "./routes/organizer.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import eventsRoutes from "./routes/event.routes.js";

const server = express();
server.use(morgan("dev"));

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

/* expres podra convertir request de cliente en json, o se leeran como undefined */
server.use(express.json());

server.use("/api", authRouter);
server.use("/organizers", organizerRoutes);
server.use("/artists", artistRoutes);
server.use("/events", eventsRoutes);

export default server;
