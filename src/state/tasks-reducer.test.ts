import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addTaskAC, changeStatusTaskAC, changeTitleTaskAC,
    removeTasksAC, tasksReducer

} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


test('correct tasks should be delete from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML/CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: 'React', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Glace", isDone: true},
        ]
    }

    const action = removeTasksAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id !='2')).toBe(true)
   /* expect(endState['todolistId2'][0].id).toBe('1');
    expect(endState['todolistId2'][1].id).toBe('3');*/

});

test('correct tasks should be added in correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML/CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: 'React', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Glace", isDone: true},
        ]
    }

    const action = addTaskAC('todolistId2', 'Tee')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('Tee');
    expect(endState['todolistId2'][0].isDone).toBe(false);


});

test('change of status of specified tasks  in correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML/CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: 'React', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Glace", isDone: true},
        ]
    }

    const action = changeStatusTaskAC('todolistId2', '2',false)
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'][1].isDone).toBe(false);
    expect(endState['todolistId2'][1].isDone).toBe(false);
});

test('change of title of specified tasks  in correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML/CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: 'React', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Glace", isDone: true},
        ]
    }

    const action = changeTitleTaskAC('todolistId2', '2','Ukraine')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'][1].isDone).toBe(false);
    expect(endState['todolistId2'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].title).toBe('Ukraine');
});

test('new property with new array should be added when hew todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML/CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: 'React', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Glace", isDone: true},
        ]
    }

    const action = addTodolistAC('title no matter what')
    const endState = tasksReducer(startState, action)
    const keys =Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

});

test('new property with new array should be deleted from array list', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML/CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: 'React', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Glace", isDone: true},
        ]
    }

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys =Object.keys(endState)
    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();

});