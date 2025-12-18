import { useState, useEffect } from 'react';

export function useTimer(initialMinutes = 5) {
    const [minutes, setMinutes] = useState(initialMinutes);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutes(prev => prev + 1);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return minutes;
}
