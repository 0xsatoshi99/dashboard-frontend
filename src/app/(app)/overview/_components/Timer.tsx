import React, { useEffect, useState } from 'react'
import { formattedSeconds } from '@/utils/date.utils'

const Timer = ({ scanTime, block, last }: any) => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <span>{formattedSeconds(
            (360 - ((block - last) % 360)) * 12 * 1000 - (time - scanTime)
        ) || "updated"}</span>
    )
}

export default Timer