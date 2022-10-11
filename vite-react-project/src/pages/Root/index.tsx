import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Link from '../../components/Link';
// import '../../../App.css'

function Root() {

	return (
		<div className="App">
			<div className="buttons">
				<Link to="/about">
					<button>Go to About Page</button>
				</Link>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<p>
					This is Main Root Page
				</p>
			</div>
		</div>
	)
}

export default Root