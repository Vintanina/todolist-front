import React from "react";
import "./Nav.scss";

export default function Nav() {
	return (
		<nav className="nav">
			<h1 className="nav__title">Todolist</h1>
			<form className="nav__form">
				<input className="nav__input" type="text" placeholder="Entrer une tâche" />
				<button className="nav__button">Ajouter</button>
			</form>
		</nav>
	);
}
