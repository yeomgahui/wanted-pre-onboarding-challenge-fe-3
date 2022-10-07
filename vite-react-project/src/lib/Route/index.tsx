import {FC} from 'react';

interface RouteProps {
	path:string;
	component: React.ReactNode;
}

const Route: FC<RouteProps> = ({path, component}) => null;

export default Route;