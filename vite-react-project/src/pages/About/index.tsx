import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Link from '../../components/Link'
// import '../../../App.css'

function About() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			 <div className="buttons">
				<Link to="/">
					<button> go to Main Page</button>
				</Link>
			 </div>
            <p>
                About Page  
            </p>
            
			
		</div>
	)
}

export default About;