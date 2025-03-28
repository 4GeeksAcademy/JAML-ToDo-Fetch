import React, { useEffect, useState } from "react";
import "./Lista.css"


const API_URL = 'https://playground.4geeks.com/todo/users/AlessGreen';

const Lista = () => {

	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');

	const addTodo = async () => {
		const res = await fetch('https://playground.4geeks.com/todo/todos/AlessGreen', {
			method: 'POST',
			body: JSON.stringify(
				{
					"label": newTodo,
					"is_done": false
				}
			),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await res.json()
		setTodos([...todos, data])
		console.log(todos)
	}

	const deleteTodo = async (id) => {
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: 'DELETE'
			}) 
			setTodos(todos.filter(todo => todo.id !== id));
		} catch (err) {
			console.error("Error en DELETE:", err);
		  }
	}

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch(API_URL)
				const data = await res.json()
				setTodos(data.todos)
			}
			catch (error) { console.error(error) }
		}
		fetchUser()
	}, [])

	return (
		<>
			<div className="container">
				<h2>Lista de tareas</h2>
				<div className="container-input">
					<input placeholder=" Escriba una tarea" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTodo()} />
				</div>
				<ul>
					{todos.length > 0 ? (
						todos.map((todo) => (
							<li key={todo.id}>
								{todo.label}
								<button onClick={() => deleteTodo(todo.id)} className="btn-delete">
									X
								</button>
							</li>
						))
					) : (<p className="footer">No hay tareas!</p>)}
				</ul>
			</div>

		</>
	);
};

export default Lista;