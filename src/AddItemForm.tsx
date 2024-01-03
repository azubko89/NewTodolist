import {Button, IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Autorenew} from "@material-ui/icons";


export type AddItemFormPropsId = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsId) {
    const [newAddTask, setNewAddTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAddTask(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13 && newAddTask.trim() !== '') {
            props.addItem(newAddTask)
            setNewAddTask('')
        }
        if (e.ctrlKey && e.charCode === 13 && newAddTask.trim() === '') {
            setError('Field is required')
        }
    }

    const addTask = () => {
        if (newAddTask.trim() === '') {
            setError('Field is required')
        } else {
            props.addItem(newAddTask.trim());
            setNewAddTask('')
        }
    }

    return <div>
        <TextField variant={"outlined"} label={'Type value'} value={newAddTask} onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
               error={!!error} helperText={error}/>
        <IconButton onClick={addTask} color={"primary"} >  <Autorenew/> </IconButton>

    </div>
}