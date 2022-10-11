import {ReactNode, FC, MouseEventHandler, useContext} from 'react';
import { routerContext } from '../../context/RouterContext'

interface LinkProps {
	to: string;
	children?: ReactNode;
}

const Link: FC<LinkProps> = ({ to, children }) => {

	return (
		<routerContext.Consumer>
			{({path,handleChangePath}) => {
				const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
					e.preventDefault();
					window.history.pushState({}, "", to);
					handleChangePath(to);
				}
				return (<a href={path} onClick={handleClick}>{children}</a>);	
			}}
		</routerContext.Consumer>
	);
}

export default Link;
