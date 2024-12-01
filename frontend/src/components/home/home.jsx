import React, { useEffect } from 'react';
import { useOkto } from 'okto-sdk-react';

export default function Home() {
    const { getSupportedNetworks } = useOkto();

    useEffect(() => {
        getSupportedNetworks()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(`error:`, error);
            });
    }, [getSupportedNetworks]);

    return (
        <div>
            Home
        </div>
    );
}
