import React, { useRef } from "react";
import "./Nav.scss";
import axios from "axios";
import req from "../http";

const todolist = {
	add: (task) => {
		return axios
			.put(req.base_url + req.todo, {
				task,
			})
			.then((response) => response.data.status)
			.catch((e) => console.log(e));
	},
};

export default function Nav({ play_loading, stop_loading }) {
	const ref_input = useRef("");
	const add_todo = (e) => {
		e.preventDefault();
		const task = ref_input.current.value;
		if (task.length > 0) {
			play_loading();
			todolist.add(task).then((status) => {
				stop_loading();
				if (status === 0) console.log("Request failed !");
			});
		}
	};

	return (
		<nav className="nav">
			<h1 className="nav__title">Todolist</h1>
			<form className="nav__form">
				<input
					ref={ref_input}
					className="nav__input"
					type="text"
					placeholder="Entrer une tâche"
				/>
				<button className="nav__button" onClick={add_todo}>
					Ajouter
				</button>
			</form>
		</nav>
	);
}
