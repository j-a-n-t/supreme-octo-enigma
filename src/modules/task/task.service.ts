import {Model, Types} from "mongoose";

import {CreateTask, Task} from "./task.types";
import {Result, Status} from "../../types/generalTypes";

class TaskService {
    private readonly TaskSchema: Model<Task>;

    constructor(TaskSchema: Model<Task>) {
        this.TaskSchema = TaskSchema;
    }

    async CreateTask({title, task}: CreateTask): Promise<Result<Task>> {
        try {
            const existTitle = await this.GetTaskByObject({title: {$eq: title.toLowerCase().trim()}});
            if (existTitle.success) return {...existTitle, message: "Titulo de tarea ya registrado"};
            const document = {
                title: title.toLowerCase().trim(),
                task: task.trim(),
                create_at: new Date(),
                update_at: new Date()
            }
            const taskSave = await this.TaskSchema.create(document);
            if (!taskSave) throw {status: 404, success: false, message: "Tarea no almacenada"}
            return {data: taskSave, message: "Tarea almacenada", status: 200, success: true}
        } catch (e: any) {
            if (e.status) return e;
            return {status: 500, success: false, message: "Error critico al almacenar tarea", data: null}
        }
    }

    async EditTask(id: Types.ObjectId, title: string, task: string): Promise<Result<Task>> {
        try {
            const existTaskId = await this.GetTaskById(id, Status.active);
            if (!existTaskId.success) return existTaskId;
            const filter = {
                _id: {$eq: id},
                status: {$eq: Status.active}
            };
            const update = {
                $set: {
                    title: title.toLowerCase().trim(),
                    task: task.toLowerCase().trim(),
                    update_at: new Date()
                }
            };
            const updateTask = await this.TaskSchema.findOneAndUpdate(filter, update, {new: true}).exec();
            if (!updateTask) throw {status: 500, success: false, message: "No se logro la actualizacion", data: null}
            return {
                success: true,
                status: 200,
                message: "Registro actualizado",
                data: updateTask
            }
        } catch (e: any) {
            if (e.code === 11000)
                return {status: 404, success: false, message: "Titulo de la nota ya existe", data: null}
            if (e.status) return e;
            return {status: 500, success: false, message: "Error critico  al buscar tarea", data: null}
        }
    }

    async DeleteTask(id: Types.ObjectId): Promise<Result<Task>> {
        try {
            const deleteTask = await this.TaskSchema.findOneAndDelete(id).exec();
            if (!deleteTask) throw {
                success: false,
                status: 500,
                message: "No se pudo eliminar la tarea",
            }
            return {
                status: 200,
                success: true,
                message: "Tarea eliminada",
                data: null
            }
        } catch (e: any) {
            if (e.status) return e;
            return {status: 500, success: false, message: "Error critico  al buscar tarea", data: null}
        }
    }

    async GetAllTasks(status: Status): Promise<Result<Task[]>> {
        try {
            const addTask = await this.TaskSchema.find({status: {$eq: status}}).exec();
            if (addTask.length < 1)
                throw {message: "Sin tareas almacenadas", status: 404, success: false};
            return {
                data: addTask,
                message: "Tareas encontradas",
                status: 200,
                success: true
            }
        } catch (e: any) {
            if (e.status) return e;
            return {status: 500, success: false, message: "Error critico al realizar busqueda de tareas", data: null}
        }
    }

    async GetTaskById(id: Types.ObjectId, status: Status): Promise<Result<Task>> {
        try {
            const searchFilter = {
                $and: [
                    {_id: {$eq: id}},
                    {status: {$eq: status}}
                ]
            }
            const taskFound = await this.TaskSchema.findOne(searchFilter).exec();
            if (!taskFound)
                throw {success: false, status: 404, message: "Tarea no localizada"};
            return {
                status: 200,
                success: true,
                message: "Tarea localizada",
                data: taskFound
            }
        } catch (e: any) {
            if (e.status) return e;
            return {status: 500, success: false, message: "Error critico  al buscar tarea", data: null}
        }
    }

    async GetTaskByObject<T extends object>(searchFilter: T): Promise<Result<Task>> {
        try {
            const taskFound = await this.TaskSchema.findOne(searchFilter).exec();
            if (!taskFound)
                throw {success: false, status: 404, message: "Tarea no localizada"};
            return {
                status: 200,
                success: true,
                message: "Tarea localizada",
                data: taskFound
            }
        } catch (e: any) {
            if (e.status) return e;
            return {status: 500, success: false, message: "Error critico  al buscar tarea", data: null}
        }
    }

}

export {TaskService};