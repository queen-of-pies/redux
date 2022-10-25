import * as actionTypes from "./actionTypes";

export function taskReducer(state=[], action) {
    switch (action.type) {
        case actionTypes.taskUpdated: {
            const newArr = [...state]
            const elIndex = newArr.findIndex(el => el.id === action.payload.id)
            newArr[elIndex] = {...newArr[elIndex], ...action.payload}
            return newArr
        }
        case actionTypes.taskDeleted: {
            const newArr = [...state]
            return newArr.filter(el => el.id !== action.payload.id)
        }
        default:
            return state
    }
}
