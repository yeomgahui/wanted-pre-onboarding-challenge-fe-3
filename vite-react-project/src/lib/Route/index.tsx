import {FC, useContext} from 'react';
import {routerContext} from '../../context/RouterContext'


interface RouteProps {
	path:string;
	component: React.ReactNode;
}

const Route: FC<RouteProps> = ({path, component}) => {
	const {path:realPath } = useContext(routerContext);

	if(realPath === path){
		return (
			<routerContext.Consumer>
				{path => <>{component}</>}
			</routerContext.Consumer>
		);
	}

	return <></>

};

export default Route;