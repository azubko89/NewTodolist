import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";


/*export function Counter() {
    let [data,setData] = useState(5)

    return <div>{data}
        <button onClick={() => setData(data + 1)}></button>
    </div>
}*/

export type  FilterValueType = 'all' | 'active' | 'completed'

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObg[todolistId]
        let filterTask = tasks.filter(task => task.id !== id)
        tasksObg[todolistId] = filterTask
        setTask({...tasksObg})
    }

    function removeTodolist(todolistId: string) {
        let filterTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(filterTodolist)
        delete tasksObg[todolistId]
        setTask({...tasksObg})
    }


    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let newTask1 = {id: v1(), title: title, isDone: false}
        let tasks = tasksObg[todolistId]
        let newTasks = [newTask, ...tasks, newTask1]
        tasksObg[todolistId] = newTasks
        setTask({...tasksObg})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObg[todolistId]
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
            setTask({...tasksObg})
        }
    }

    function changeTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObg[todolistId]
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.title = newTitle
            setTask({...tasksObg})
        }
    }


    function changedFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    function changeTitleTodolist(newTitle: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolist([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<todolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]);

    let [tasksObg, setTask] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML/CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'JavaScript', isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Book", isDone: false},
                {id: v1(), title: "Milk", isDone: true},
            ]
        }
    )

    function addTodolist(title: string) {
        let todolist: todolistsType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodolist([todolist, ...todolists])
        setTask({
            ...tasksObg,
            [todolist.id]: [],
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObg[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksObg[tl.id].filter(task => task.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksObg[tl.id].filter(task => task.isDone === false)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              removeTodolist={removeTodolist}
                                              changedFilter={changedFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTitleTask={changeTitle}
                                              changeTitleTodolist={changeTitleTodolist}
                                              filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
