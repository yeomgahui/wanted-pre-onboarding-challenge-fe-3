import { useState, FC, createContext } from "react"

interface RouterProps {
	children ?: React.ReactNode;
}

interface RouterContext {
	path:string;
	changePath(value:string): void;
}

const Router: FC<RouterProps> = ({children}) => {
	const [path, setPath] = useState(window.location.pathname);

	const contextValue = {
		path,
		changePath: setPath,
	}

	return (
		<>
		{children}
		</>
	);
}

// export const routerContext = createContext({path: "", changePath: () => undefined});

export default Router;
// routerContext.displayName = 'RouterContext';