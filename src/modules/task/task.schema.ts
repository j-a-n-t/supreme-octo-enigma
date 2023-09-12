import {Schema, Model, model} from 'mongoose';
import {Status} from "../../types/generalTypes";
import {Task} from "./task.types";

const taskSchema = new Schema<Task>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    task: {
        type: String,
        required: true,
        unique: false,
    },
    status: {
        type: String,
        required: true,
        unique: false,
        enum: Status,
        default: Status.active
    },
    create_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    update_at: {
        type: Date,
        required: true,
        default: new Date()
    }
}, {
    timestamps: false,
});
const TaskSchema: Model<Task> = model<Task, Model<Task>>("tasks", taskSchema, "tasks");
export {TaskSchema};