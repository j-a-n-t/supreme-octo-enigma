import http from "http";
import colors from "colors";
import express, {Express} from "express";
import morgan from "morgan";

import {configServer, TypeEnv} from "./types/generalTypes";
import {taskRoutes} from "./routes/task.routes";
import {ConnectDB} from "./config/connectDB";

type PropsApp = {
    connectDB: ConnectDB;
    env: TypeEnv;
    expressApp: Express;
    server: configServer;
}

class App {
    private readonly urlBase: string = "/api/v1";
    private readonly connectDB: ConnectDB;
    private readonly app: Express;
    private readonly env: TypeEnv;
    private readonly server: configServer;

    constructor({connectDB, env, expressApp, server}: PropsApp) {
        this.app = expressApp;
        this.connectDB = connectDB;
        this.env = env;
        this.server = server;
    }

    public Middlewares():void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morgan("dev"))
    }

    public Routes(): void {
        this.app.use(`${this.urlBase}/task`, taskRoutes);
    }

    public ListenStart(): void {
        this.connectDB.connected();
        this.Middlewares();
        this.Routes();
        this.server.ssl ? this.ProdStart() : this.DevStart();
    }

    private ProdStart(): void {
        console.log("SSL not configured yet");
    }

    private DevStart(): void {
        const httpServer = http.createServer(this.app);
        httpServer.listen(this.server.port, () => {
            console.log(colors.bgBlue(` 🐮 Server running on port http://${this.server.hostname}:${this.server.port}${this.urlBase}/task 🐮 `));
        });
    }
}

export {App};