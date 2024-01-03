import {TasksStateType, todolistsType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equal', () => {
    const startTaskState: TasksStateType = {};
    const startTodolistState: Array<todolistsType> = [];
    const action = addTodolistAC('new Todolist')
    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)
    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolist).toBe(action.todolistId);
});