import { useEffect, useState } from "react";
import { Orders_Get } from "../api/Orders_Get";


type OrderPlacedControlProps = {
    setActiveComponent: (componentName: string) => void;
    orderID: number;
};

function OrderPlacedControl({ setActiveComponent, orderID }: OrderPlacedControlProps) {

    const [productsList, setProductsList] = useState<any[]>([]);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);    
    const [orderResponse, setOrderResponse] = useState<any[]>([]);
    const [customerName, setCustomerName] = useState('');
    
    const [loading, setLoading] = useState(false);

    async function Async_Order_Get(orderID :number) {
        setLoading(true);
        console.log('Fetching order details for orderID:', orderID);
        const response = await Orders_Get(orderID);
        console.log('Orders_Get response:', response);
        setOrderResponse(response);
        setLoading(false);
    }

    useEffect( () => {
        console.log('OrderPlacedControl mounted');
        Async_Order_Get(orderID);
    }, [orderID]);


  
    async function handleAnotherOrder(): Promise<void> {
        setLoading(true);
        setActiveComponent("OrderScreen");  
        setLoading(false);
    }

    return (
        <div>
            <h1>Order Placed Screen</h1>


           
            <br />
            <span>
                Customer Name:
                &nbsp;
                &nbsp;
                {}
            </span>
            <br />
            <button type="button"
                onClick={() => handleAnotherOrder()}  
                style={{ marginTop: '15px' }} 
                disabled={loading}
            >
            {loading ? 'Opening order screen...' : 'Submit Order'}
            </button>
        </div>
    );
}

export default OrderPlacedControl;
