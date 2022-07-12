import { CSSProperties, FC, ReactElement, ReactNode } from 'react';
import './Drawer.css';

const Drawer: FC<{
	style?: CSSProperties;
	className?: string;
	children?: ReactNode | ReactElement;
	open?: boolean;
	onCloseCallback?: () => void;
}> = ({ style, className, children, open, onCloseCallback }) => {
	const closeIcon = '\u2715';

	const onClose = () => {
		onCloseCallback?.();
	};

	return (
		<div
			style={style}
			className={`drawer ${open ? 'show' : 'hide'} ${className || ''}`}>
			<div className='drawer-content'>
				<button className='close' onClick={onClose}>
					{closeIcon}
				</button>
				{children}
			</div>
		</div>
	);
};

export default Drawer;
