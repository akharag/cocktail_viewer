import { useState } from 'react';
import './Filter.css';

type FilterProps = {
    id?: string; //will derive from name when empty
    name: string;
    src?: string;
    alt?: string;//will derive from name when empty
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
        <span className={`${selected ? 'selected' : ''}`} onClick={ClickHandler}>
            {src && <img
                id={id || name.toLowerCase()}
                src={src} alt={alt || `${name.toLowerCase()} thumbnail`}
            />}
            <h3>{CapitalFirstLetter(name)}</h3>
        </span>
    );
}

export default Fitler;