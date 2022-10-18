import { useState, FC, createContext, useEffect } from "react"
import {routerContext} from '../../context/RouterContext'
import {RouterContext} from '../../context/RouterContext'

interface RouterProps {
	children ?: React.ReactNode;
}

const Router: FC<RouterProps> = ({children}) => {
	const [path, setPath] = useState(window.location.pathname);
	console.log('react Router');

	const contextValue :RouterContext= {
		path,
		handleChangePath: setPath,
	}
	// useEffect(()=> {
	// 	const onLocationChange = () => {
	// 		// console.log('onLocationChange')
	// 	}
	// 	window.addEventListener('popstate',onLocationChange);

	// 	return () => {
	// 		window.removeEventListener('popstate', onLocationChange);
	// 	}
	// },[]);

	return (
		<routerContext.Provider value={contextValue}>
			{children}
		</routerContext.Provider>
	);
}

export default Router;
