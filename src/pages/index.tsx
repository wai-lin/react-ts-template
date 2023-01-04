import { Link } from 'react-router-dom';

export default function Page() {
	return (
		<div>
			<h1>React + Typescript + Vite</h1>
			<Link to="counter">Counter store example</Link>
		</div>
	);
}
