import { useEffect } from "react";

export function OrderScreen() {
    useEffect(() => {
        console.log('OrderScreen mounted');
    }, []);

    return (
        <div>
            <h1>Order Screen</h1>
            <p>This is the order screen.</p>
        </div>
    );
}