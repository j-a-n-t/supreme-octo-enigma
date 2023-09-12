import {Router} from "express";
import {body, param, query} from "express-validator";

import {RequestValidationMiddleware} from "../middlewares/requestValidation.middleware";
import {TaskController} from "../modules/task/task.controller";

const taskRoutes: Router = Router();
const taskController: TaskController = new TaskController();
const requestValidationMiddleware: RequestValidationMiddleware = new RequestValidationMiddleware();

taskRoutes.get("/", taskController.GetAllTasks);
taskRoutes.get("/:id", [
    param("id")
        .isMongoId().withMessage("Identificador de tarea invalido"),
    query("status")
        .optional()
        .isIn(["active", "inactive"]).withMessage("status de la tarea invalido")
        .escape(),
    requestValidationMiddleware.ValidationRequest], taskController.GetTaskById);
taskRoutes.post("/", [
    body("title")
        .notEmpty().withMessage("El titulo no puede ir vacio")
        .isString().withMessage("El titulo tiene que ser una cadena de caracteres")
        .toLowerCase()
        .escape(),
    body("task")
        .notEmpty().withMessage("La tarea no puede ir vacia")
        .isString().withMessage("La tarea tiene que ser una cadane de texto")
        .toLowerCase()
        .escape(),
    requestValidationMiddleware.ValidationRequest], taskController.CreateTask);
taskRoutes.put("/:id", [
    param("id")
        .isMongoId().withMessage("Identificador de tarea invalido"),
    body("title")
        .optional()
        .notEmpty().withMessage("El titulo no puede ir vacio")
        .isString().withMessage("El titulo tiene que ser una cadena de caracteres")
        .toLowerCase()
        .escape(),
    body("task")
        .notEmpty().withMessage("La tarea no puede ir vacia")
        .isString().withMessage("La tarea tiene que ser una cadane de texto")
        .toLowerCase()
        .escape(),
], taskController.EditTask);
taskRoutes.delete("/:id", [
    param("id").isMongoId().withMessage("Identificador de tarea invalido")
    ,], taskController.DeleteTask);

export {taskRoutes};