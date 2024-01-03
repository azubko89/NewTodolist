import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType} from "./todolist-reducer";

export type removeTaskActionType = {
    type: 'REMOVE-TASKS',
    todolistId:string,
    taskId:string
}

export type addTaskActionType = {
    type: 'ADD-TASK',
    title:string,
    todolistId:string
}

export type changeStatusTaskActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId:string,
    taskId:string,
    isDone:boolean
}

export type changeTitleTaskActionType = {
    type: 'CHANGE-TITLE-STATUS',
    todolistId:string,
    taskId:string,
    title:string
}


export type actionsTypes = removeTaskActionType | addTaskActionType | changeStatusTaskActionType |
    changeTitleTaskActionType | addTodolistActionType | removeTodolistActionType

export const tasksReducer = (state:TasksStateType, action:actionsTypes) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':{
            const copyState = {...state}
            const tasks = state[action.todolistId]
            const filterTasks = tasks.filter(t =>t.id !== action.taskId)
            copyState[action.todolistId] = filterTasks
            return copyState
        };
        case 'ADD-TASK':
        {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const newTask =  {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask,...tasks]
            stateCopy[action.todolistId]= newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS":{
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TITLE-STATUS":{
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(task => task.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADDED-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error ('I dont understand this action type')
    }

}
export const removeTasksAC = (todolistId:string,tasksId:string) : removeTaskActionType => {
    return { type:"REMOVE-TASKS",todolistId:todolistId, taskId:tasksId }
}
export const addTaskAC = (todolistId:string,title:string) : addTaskActionType => {
    return { type:"ADD-TASK",title:title,todolistId:todolistId}
}
export const changeStatusTaskAC = (todolistId:string,taskId:string,isDone:boolean) : changeStatusTaskActionType => {
    return { type:"CHANGE-TASK-STATUS",isDone:isDone ,todolistId:todolistId,taskId:taskId }
}
export const changeTitleTaskAC = (todolistId:string,taskId:string,title:string) : changeTitleTaskActionType => {
    return { type:"CHANGE-TITLE-STATUS",title:title ,todolistId:todolistId,taskId:taskId}
}


