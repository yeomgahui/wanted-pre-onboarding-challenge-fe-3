import {ReactNode, FC, MouseEventHandler, useContext} from 'react';
import { routerContext } from '../../context/RouterContext'
import useRouter from '../../hooks/useRouter'

interface LinkProps {
	to: string;
	children?: ReactNode;
}

const Link: FC<LinkProps> = ({ to, children }) => {
	const {push} = useRouter(); 

	return (
		<routerContext.Consumer>
			{({path,handleChangePath}) => {
				const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
					e.preventDefault();
					push(to);
					handleChangePath(to);
				}
				return (<a href={path} onClick={handleClick}>{children}</a>);	
			}}
		</routerContext.Consumer>
	);
}

export default Link;
