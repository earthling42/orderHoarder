import { HttpGet } from './HttpHandler';

export async function Products_List() {
    
    let response: any[] = [];
    console.log('Attempting to get Products_List');

    try {
        //response = await HttpGet("Products_List");
        response = [{"productID":1,"productName":"Table","categoryName":"Furniture","unitPrice":2000.0000}
            ,{"productID":2,"productName":"Chair","categoryName":"Furniture","unitPrice":500.0000}
            ,{"productID":3,"productName":"Plasma screen","categoryName":"Audio Visual","unitPrice":15000.0000}
            ,{"productID":4,"productName":"Hi Fi","categoryName":"Audio Visual","unitPrice":1200.0000}
            ,{"productID":5,"productName":"LCD Screen","categoryName":"Audio Visual","unitPrice":800.0000}
            ,{"productID":6,"productName":"Camping Table","categoryName":"Outdoor","unitPrice":2000.0000}
            ,{"productID":7,"productName":"Camping Chair","categoryName":"Outdoor","unitPrice":2000.0000}
            ,{"productID":8,"productName":"Gas Braai","categoryName":"Outdoor","unitPrice":2000.0000}
            ,{"productID":9,"productName":"Tent","categoryName":"Outdoor","unitPrice":5000.0000}
            ,{"productID":10,"productName":"TV Stand","categoryName":"Furniture","unitPrice":700.0000}];
        if (response && "error" in response)
        {
            throw new Error(`HTTP error! status: ${response.error}`);
        }
    } catch (error) {
            console.error('Error making GET request:', error);
    }
    
    return (response);
};

