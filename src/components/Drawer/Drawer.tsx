import { CSSProperties, FC, ReactElement, ReactNode, useEffect } from 'react';
import './Drawer.css';

const Drawer: FC<{
	style?: CSSProperties;
	className?: string;
	children?: ReactNode | ReactElement;
	open?: boolean;
	onCloseCallback?: () => void;
}> = ({ style, className, children, open, onCloseCallback }) => {
	const closeIcon = '\u2715';
	const body = document.querySelector('body')!;

	useEffect(() => {
		if (open) {
			body.style.setProperty('overflow', 'clip');
		}
		return () => {
			body.style.removeProperty('overflow');
		};
	}, [body.style, open]);

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
