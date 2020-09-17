import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
    name: string;
    done: boolean;
}

function App(): JSX.Element {
    const [newTask, setNewTask] = useState<string>('');
    const [tasksList, setTasksList] = useState<ITask[]>([]);
    const taskInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        addTask(newTask);
        setNewTask('');
        taskInput.current?.focus();
    };

    const addTask = (name: string): void => {
        const newTasks: ITask[] = [...tasksList, { name: name, done: false }];
        setTasksList(newTasks);
    };

    const toggleDoneTask = (i: number): void => {
        const newTasks: ITask[] = [...tasksList];
        newTasks[i].done = !newTasks[i].done;
        setTasksList(newTasks);
    };

    const removeTask = (i: number) => {
        const newTasks: ITask[] = [...tasksList];
        newTasks.splice(i, 1);
        setTasksList(newTasks);
    };

    return (
        <div className='container p-4'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1>
                        React and Typescript TasksApp stylized with Bootswatch,
                        by Ignacio Ceaglio.
                    </h1>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    onChange={(e) => setNewTask(e.target.value)}
                                    value={newTask}
                                    className='form-control'
                                    autoFocus /**+-Para que al cargar la Página Automáticamente se Ponga el Cursor en el Input.*/
                                    ref={
                                        taskInput
                                    } /**+-Para que al haber Creado una Tarea Automáticamente se Ponga el Cursor en el Input de nuevo.*/
                                />
                                <button className='btn btn-dark btn-block mt-2'>
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                    {tasksList.map((t: ITask, i: number) => (
                        <div key={i} className='card card-body mt-2'>
                            <h2
                                style={{
                                    textDecoration: t.done
                                        ? 'line-through'
                                        : '',
                                }}>
                                {t.name}
                            </h2>
                            <div>
                                <button
                                    className='btn btn-secondary'
                                    onClick={() => toggleDoneTask(i)}>
                                    {t.done ? '✅' : '❌'}
                                </button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => removeTask(i)}>
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
