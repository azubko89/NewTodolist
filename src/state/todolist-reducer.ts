import {FilterValueType, todolistsType} from "../App";
import {v1} from "uuid";

export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id:string
}
export type addTodolistActionType = {
    type: 'ADDED-TODOLIST'
    title:string
    todolistId:string
}
export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type actionsTypes = removeTodolistActionType | addTodolistActionType | changeTodolistTitleActionType |
    changeTodolistFilterActionType

export const todolistsReducer = (state:Array<todolistsType>, action:actionsTypes) : Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id )
        };
        case 'ADDED-TODOLIST': {
            return [...state, {id: action.todolistId,title:action.title,filter:'all'}]
        };
        case 'CHANGE-TODOLIST-TITLE': {
               const todolist = state.find(tl => tl.id === action.id)
                if(todolist) {
                    todolist.title = action.title
                }
                return [...state]
            };
        case 'CHANGE-TODOLIST-FILTER' : {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        };

        default:
            throw new Error ('I dont understand this action type')
    }

}
export const removeTodolistAC = (todolistId:string) : removeTodolistActionType => {
    return { type:"REMOVE-TODOLIST",id:todolistId}
}
export const addTodolistAC = (title:string) : addTodolistActionType => {
    return { type:"ADDED-TODOLIST",title:title,todolistId:v1()}
}
export const changeTodolistAC = (todolistId:string, title:string): changeTodolistTitleActionType => {
    return {type:"CHANGE-TODOLIST-TITLE",title:title,id:todolistId}
}
export const changeFilterTodolistAC = (todolistId:string, filter:FilterValueType): changeTodolistFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER",filter:filter,id:todolistId}
}
