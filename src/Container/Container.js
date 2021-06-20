import React, { useState, useEffect } from "react";
import "./Container.scss";
import Item from "../Item/Item";
import req from "../http";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const todolist = {
	get: () => {
		return axios
			.get(req.base_url + req.todo)
			.then((response) => response.data.response)
			.catch((e) => console.log(e));
	},
	set_done: (id, status) => {
		return axios
			.post(req.base_url + req.todo, {
				id: id,
				done: status,
			})
			.then((response) => response.data.status)
			.catch((e) => console.log(e));
	},
	delete: (id) => {
		return axios
			.delete(req.base_url + req.todo, {
				data: {
					id,
				},
			})
			.then((response) => response.data.status)
			.catch((e) => console.log(e));
	},
};

export default function Container({ loading, play_loading, stop_loading }) {
	const [todo, set_todo] = useState([]);

	useEffect(() => {
		todolist.get().then((data) => {
			set_todo(data);
			stop_loading();
		});
	}, [stop_loading]);

	let updated = (index) => {
		if (index >= 0 && index < todo.length) {
			play_loading();
			todolist
				.set_done(todo[index].id, todo[index].done === 1 ? 0 : 1)
				.then((status) => {
					if (status === 1)
						set_todo((prev_s) => {
							let new_state = [...prev_s];
							new_state[index].done = new_state[index].done === 1 ? 0 : 1;
							return new_state;
						});
					else console.log("Request failed !");
					stop_loading();
				});
		}
	};

	const deleted = (index) => {
		play_loading();
		todolist.delete(todo[index].id).then((status) => {
			if (status === 0) console.log("Request failed !");
			stop_loading();
		});
	};

	const mapped_list = todo.map((t, k) => {
		return (
			<Item
				key={k}
				checked={t.done === 1 ? true : false}
				updated={updated}
				index={k}
				deleted={deleted}
			>
				{t.task}
			</Item>
		);
	});

	const display = loading ? <Spinner /> : mapped_list;

	return (
		<div className="container">
			<ul className="container__box">{display}</ul>
		</div>
	);
}
