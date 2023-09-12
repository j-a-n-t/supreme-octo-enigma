import dotenv from "dotenv";
import {TypeEnv} from "../types/generalTypes";

class ConfigEnv {
    private readonly env: TypeEnv;

    constructor(env: TypeEnv) {
        this.env = env;
    }

    GetEnv(): TypeEnv {
        dotenv.config();
        if (this.env === "dev") {
            dotenv.config({path: ".env.prod"});
        }
        dotenv.config({path: ".env"})
        return this.env;
    }
}

export {ConfigEnv};