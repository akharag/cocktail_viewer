import React, { useEffect, useState } from 'react';
import './DrinkPreview.css';
import { updateUrl, useReactPath } from '../../hooks/url';

interface DrinkDetailProps {
	title: string;
	[key: string]: string;
}

function DrinkDetails({ title }: DrinkDetailProps) {
	const [hide, setHide] = useState(false);
	const path = useReactPath();
	const icon = '\u2715';

	useEffect(() => {
		setHide(false);
	}, [path]);

	return (
		<div className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
			<h1>{title}</h1>
			<button className='close' onClick={() => setHide(!hide)}>
				{icon}
			</button>
		</div>
	);
}

export default DrinkDetails;
