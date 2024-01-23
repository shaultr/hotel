import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/component.module.css';
import { useState, useEffect } from 'react';

export default function Todos() {
    const route = useParams();
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:3500/todos?userId=${route.id}`)
        const arrjson = await response.json();
        setTodos(arrjson);
    }
    useEffect(() => {
        fetchData()
    }, []);

    const todoCompleted = (id) => {
        const listTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        setTodos(listTodos);
        const myItem = listTodos.filter((item) => item.id === id);
        fetch(`http://localhost:3500/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: myItem[0].completed }),
            headers: { 'Content-Type': 'application/json' }
        }
        )
            .then((res) => res.json())
            .then((data) => console.log(data.completed))
    }

    const deleteTodo = (id) => {
        fetch(`http://localhost:3500/todos/${id}`, {
            method: 'DELETE'
        })
            .then((item) => fetchData()
            )

    }
    const alphabet = () => {
        const newArr = todos.sort((a, b) => a.title.localeCompare(b.title));
        setTodos(newArr);
        displeyTodos();
    }
    
    const displeyTodos = () => {
      return  todos.map((item) => (
            <>
                <div className={style.todoContainer}>
                    <div className={style.displeyTodo}>
                        <h3 style={!item.completed ? { color: '#AEC09A' } : null}>task number: {item.id}</h3>
                        <h3 style={!item.completed ? { color: '#AEC09A' } : null}>{item.title}</h3>
                        <input className='checkbox' type='checkbox' checked={item.completed} onChange={() => { todoCompleted(item.id); }}></input>
                    </div>
                    <div className={style.delete} onClick={() => { deleteTodo(item.id) }}>Delete</div>
                </div>
            </>
        ))

    }


    return (
        <div>
            <div className={style.links} onClick={() => { navigate(`/home/${route.id}`) }}>Home</div>
            <div className={style.todosContainer}>
                <div className={style.select} onClick={() => alphabet()}>A-Z</div>
                <div className={style.select}>Serial</div>
                <div className={style.select}>Completed</div>
                <div className={style.select}>Random</div>
                {displeyTodos()}
            </div>

            <form>

            </form>
        </div>
    )
}
