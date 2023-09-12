import express from "express";

import {App} from "./app";
import {ConfigEnv} from "./config/configEnv";
import {ConnectDB} from "./config/connectDB";
import {TypeServerConfig} from "./types/generalTypes";

const configEnv: ConfigEnv = new ConfigEnv("dev");
const configServer: TypeServerConfig = {
    dev: {port: 4000, hostname: "localhost", ssl: false},
    prod: {port: 4000, hostname: "localhost", ssl: true}
}
const envInUse = configEnv.GetEnv();
const uriDB = process.env.MONGODB_URI || "";

const app: App = new App({
    connectDB: new ConnectDB({uriDB}),
    env: envInUse,
    expressApp: express(),
    server: configServer[envInUse],
});
app.ListenStart();