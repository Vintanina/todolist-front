import React, { useState } from "react";
import "./App.scss";
import Nav from "../Nav/Nav";
import Container from "../Container/Container";

export default function App() {
	const [loading, set_loading] = useState(true);
	const play_loading = () => set_loading(true);
	const stop_loading = () => set_loading(false);
	return (
		<>
			<Nav play_loading={play_loading} stop_loading={stop_loading} />
			<Container
				loading={loading}
				play_loading={play_loading}
				stop_loading={stop_loading}
			/>
		</>
	);
}
