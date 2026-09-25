import { HttpGet, HttpPost } from './HttpHandler';

export async function Orders_Get(orderID :number) {
    let response :any[] = [];

    console.log('Orders_Get - orderID:', orderID);
    
    try {
        console.log('Orders_Get called with orderID:', orderID); 

        response = await HttpGet("Orders", [{ "orderID": orderID }]);

        // response = [{
        //     "orderID": 2, "userID": "1", "orderDate": "2026-09-08T12:00:00Z", "customerName": "Acme Corp",
        //     "salesValueExcludingVAT": 2900.0000, "discount": 0.10, "salesValueIncludingVAT": 2610.000000,
        //     "orderDetails": [
        //         { "orderDetailID": 2, "orderID": 2, "productID": 4, "quantity": 2 },
        //         { "orderDetailID": 3, "orderID": 2, "productID": 2, "quantity": 1 }
        //     ]
        // }]
        console.log('Orders_Get Response:', response);
        if (response && "error" in response)
        {
            throw new Error(`HTTP error in Orders_Submit! status: ${response.error}`);
        }
    } catch (error) {
        console.error('Error making POST request:', error);
    }  
    return (response);
};

