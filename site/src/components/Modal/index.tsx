import { CSSProperties, FC, ReactNode, useEffect } from 'react';
import './Modal.css';

const Modal: FC<{
	children: ReactNode;
	open?: boolean;
	style?: CSSProperties;
	className?: string;
	onCloseCallback?: () => void;
}> = ({ children, open, style, className, onCloseCallback }) => {
	const icon = '\u2715';
	const body = document.querySelector('body')!;

	useEffect(() => {
		if (open) {
			body.style.setProperty('overflow', 'clip');
		}
	}, [body.style, open]);

	const onClose = () => {
		// const body = document.querySelector('body')!;
		body.style.setProperty('overflow', 'initial');
		onCloseCallback?.();
	};

	return (
		<div style={style} className={`modal  ${open ? 'show' : ''}`}>
			<div className={`modal-content ${className}`}>
				<button className='close' onClick={onClose}>
					{icon}
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
