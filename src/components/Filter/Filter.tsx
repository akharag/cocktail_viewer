import { useState } from 'react';
import './Filter.css';

export type FilterProps = {
    id: string;
    name?: string;
    src?: string;
    alt?: string;
    SelectFilter?: () => void;
}

const Fitler = ({ id, name, src, alt, SelectFilter }: FilterProps) => {
    const [selected, setSelected] = useState(false);

    const ClickHandler = () => {
        setSelected(!selected)
        if (SelectFilter) SelectFilter();
    }

    const CapitalFirstLetter = (str: string): string => {
        const arr = str.split(" ");

        for (var i = 0; i < arr.length; i++)
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        const new_str = arr.join(" ");

        return new_str;
    }

    return (

        <button
            id={id}
            className={`filter${selected ? ' selected' : ''}`}
            onClick={ClickHandler}>
            {src && <img src={src} alt={alt || `${(name || id).toLowerCase()} thumbnail`} />}
            <h3>{CapitalFirstLetter(name || id)}</h3>
        </button>
    );
}

export default Fitler;