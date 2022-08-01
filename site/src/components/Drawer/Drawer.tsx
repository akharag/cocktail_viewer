import { CSSProperties, FC, ReactElement, ReactNode, useEffect } from 'react';
import './Drawer.css';

const Drawer: FC<{
	style?: CSSProperties;
	show?: boolean;
	className?: string;
	children?: ReactNode | ReactElement;
	transitionTiming?: number;
	onOpen?: () => void;
	onClose?: () => void;
}> = ({
	style,
	show,
	className,
	children,
	transitionTiming,
	onOpen,
	onClose
}) => {
	const closeIcon = '\u2715';
	const body = document.querySelector('body')!;

	useEffect(() => {
		if (show) {
			body.style.setProperty('overflow', 'clip');
		}
		return () => {
			body.style.removeProperty('overflow');
		};
	}, [show, body.style]);

	return (
		<div
			style={
				{ '--transition-drawer-time': transitionTiming + 'ms' } as CSSProperties
			}
			className={`drawer${show ? ' show' : ''}`}>
			<div
				style={style}
				className={'drawer-content' + (className ? ' ' + className : '')}>
				<button
					className='close'
					onClick={() => {
						onClose?.();
					}}>
					{closeIcon}
				</button>
				{children}
			</div>
		</div>
	);
};

export default Drawer;
