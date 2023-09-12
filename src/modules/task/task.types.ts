import {Document} from "mongoose";
import {Status} from "../../types/generalTypes";

export type Task = {
    create_at: Date;
    status: Status;
    task: string;
    title: string;
    update_at: Date;
} & Document;

export type CreateTask = {
    title: string;
    task: string
}