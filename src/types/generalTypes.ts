export type TypeEnv = "dev" | "prod";
export type TypeServerConfig = {
    dev: configServer;
    prod: configServer;
}
export type configServer = {
    hostname: string;
    port: number;
    ssl: boolean;
}
export type Result<Z> = {
    status: 500 | 404 | 200
    success: boolean;
    message: string;
    data: Z | null
}

export enum Status {
    active = "active",
    inactive = "inactive",
}