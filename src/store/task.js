import {createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import {setError} from "./errors";

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elIndex = state.entities.findIndex(el => el.id === action.payload.id)
            state.entities[elIndex] = {...state.entities[elIndex], ...action.payload}
        },
        remove(state, action) {
            state.entities = state.entities.filter(el => el.id !== action.payload.id)
        },
        add(state, action) {
            state.entities.push(action.payload)
            state.isLoading = false
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state) {
            state.isLoading = false
        }
    }
})

const {actions, reducer: taskReducer} = taskSlice
const {update, remove, recived,add, taskRequested, taskRequestFailed} = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const addTask = (payload) => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.addTask(payload)
        dispatch(add(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const getTasks = () => (state) => state.tasks.entities

export const getTasksLoadingStatus = () => state => state.tasks.isLoading

export const completeTask = (id) => (dispatch) => dispatch(update({id, completed: true}))

export function titleChanged(id) {
    return update({id, title: `New title for ${id}`})
}

export function taskDeleted(id) {
    return remove({id})
}

export default taskReducer
