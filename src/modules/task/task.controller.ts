import {Request, Response} from "express";
import {Types} from "mongoose";

import {Result, Status} from "../../types/generalTypes";
import {TaskSchema} from "./task.schema";
import {TaskService} from "./task.service";
import {Task} from "./task.types";

class TaskController {
    private readonly taskService: TaskService;

    constructor() {
        this.taskService = new TaskService(TaskSchema);
    }

    CreateTask: (req: Request, res: Response) => Promise<Response<Result<Task>>> = async (req: Request, res: Response): Promise<Response<Result<Task>>> => {
        const {title, task} = req.body;
        const addTask = await this.taskService.CreateTask({title, task});
        return res.status(addTask.status).json(addTask);
    }
    EditTask: (req: Request, res: Response) => Promise<Response<Result<Task>>> = async (req: Request, res: Response): Promise<Response<Result<Task>>> => {
        const {id} = req.params;
        const {title, task} = req.body;
        const editTask = await this.taskService.EditTask(new Types.ObjectId(id), title, task);
        return res.status(editTask.status).json(editTask);
    }

    DeleteTask: (req: Request, res: Response) => Promise<Response<Result<Task>>> = async (req: Request, res: Response): Promise<Response<Result<Task>>> => {
        const {id} = req.params;
        const deleteTask = await this.taskService.DeleteTask(new Types.ObjectId(id));
        return res.status(deleteTask.status).json(deleteTask);
    }
    GetAllTasks: (req: Request, res: Response) => Promise<Response<Result<Task[]>>> = async (req: Request, res: Response): Promise<Response<Result<Task[]>>> => {
        const allTask = await this.taskService.GetAllTasks(Status.active);
        return res.status(allTask.status).json(allTask);
    }
    GetTaskById: (req: Request, res: Response) => Promise<Response<Result<Task>>> = async (req: Request, res: Response): Promise<Response<Result<Task>>> => {
        let statusParse: Status;
        const {id} = req.params;
        const {status} = req.query;
        statusParse = status === "inactive" ? Status.inactive : Status.active;
        const getTask = await this.taskService.GetTaskById(new Types.ObjectId(id), statusParse);
        return res.status(getTask.status).json(getTask);
    }
}

export {TaskController};