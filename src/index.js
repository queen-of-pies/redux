import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from "./store/store";
import {
    addTask,
    completeTask,
    getTasks,
    getTasksLoadingStatus,
    loadTasks,
    taskDeleted,
    titleChanged
} from "./store/task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getErrors} from "./store/errors";

const store = configureStore();

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getErrors())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])


    const changeTitle = (id) => {
        dispatch(titleChanged(id))
    }

    const deleteTask = (id) => {
        dispatch(taskDeleted(id))
    }

    if (isLoading) {
        return <h1>Loading</h1>
    }

    if (error) {
        return <p>{error}</p>
    }

    return <>
        <h1>App</h1>
        <button onClick={() => dispatch(addTask({userId: 1, title: "Bla-bla", completed: false}))}>Add task</button>
        <ul>
            {state.map(el =>
                <li key={el.id}>
                    <p>{el.title}</p>
                    <p>{`Completed: ${el.completed}`}</p>
                    <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
                    <button onClick={() => changeTitle(el.id)}>Change title</button>
                    <button onClick={() => deleteTask(el.id)}>Delete task</button>
                    <hr/>
                </li>)}
        </ul>
    </>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
