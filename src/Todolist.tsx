import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changedFilter: (value: FilterValueType, todolistId: string) => void
    id: string
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitleTask: (taskId: string, newTitle:string, todolistId: string) => void
    changeTitleTodolist:(newTitle:string,todolistId:string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValueType
    //tasks: TaskType[]

}

function Todolist(props: PropsType) {  //props={title:'What to learn',arrTasks:[]}

    const onAllClickHandler = () => props.changedFilter('all', props.id)
    const onActiveClickHandler = () => props.changedFilter('active', props.id)
    const onCompletedClickHandler = () => props.changedFilter('completed', props.id)

    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTaskNeu = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeTitleTodolist = (newTitle:string) => {
        props.changeTitleTodolist(newTitle,props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTitleTodolist}/>
                <IconButton onClick={onClickRemoveTodolist} >
                    <Delete />
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTaskNeu}/>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onRemoveHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newTitle:string) => {
                        props.changeTitleTask(task.id, newTitle, props.id)
                    }

                    return <li key={task.id} >
                        <Checkbox
                               onChange={onChangeStatusHandler}
                               checked={task.isDone}/>
                        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler} >
                            <Delete />
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;
