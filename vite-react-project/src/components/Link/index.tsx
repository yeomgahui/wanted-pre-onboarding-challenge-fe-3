import {ReactNode, FC, MouseEventHandler, useContext} from 'react';
import { routerContext } from '../../lib/Router'

interface LinkProps {
	to: string;
	children?: ReactNode;
}

const Link: FC<LinkProps> = ({ to, children }) => {
	//컨텍스트 사용
	const {changePath} = useContext(routerContext);

	const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
		e.preventDefault();

		changePath(to);
	}
	return <a href={to} onClick={handleClick}>
		{children}
	</a>
}

export default Link;
