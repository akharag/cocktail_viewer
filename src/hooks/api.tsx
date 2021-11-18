import { useState, useEffect } from "react";

type APIProps = {
    end_point: string,
    key?: string,
    headers?: Headers
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    parameters?: [key: string | number]
}

const useAPI = ({ end_point, key, headers, method = 'GET', parameters }: APIProps) => {
    const [data, setData] = useState<JSON | undefined>();
    const [status, setStatus] = useState('loading');

    const constructURL = () => {

    };

    useEffect(() => {
        const fetchAPIData = async () => {
            try {
                const url = end_point;
                const response = await fetch(url);
                const data = await response.json();
                return data;
            } catch (err) {
                setStatus('error');
            }
        };
        fetchAPIData();
    });

    return
};

export default useAPI;