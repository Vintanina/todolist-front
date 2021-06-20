import React from "react";
import "./Item.scss";

export default function Item(props) {
	const content = props.children;
	const index = props.index;
	const updated = props.updated;
	const checked = props.checked;
	const deleted = props.deleted;
	if (content && typeof checked === "boolean") {
		return (
			<li className="item">
				<div
					className="item__box"
					onClick={(e) => {
						e.preventDefault();
						updated(index);
					}}
				>
					<input
						className="item__check"
						type="checkbox"
						checked={checked}
						onChange={() => console.log(`Todo ${index} changed !`)}
					/>
					<p className="item__content">{content}</p>
				</div>
				<button
					className="item__delete"
					onClick={() => {
						deleted(index);
					}}
				>
					Supprimer
				</button>
			</li>
		);
	} else return null;
}
