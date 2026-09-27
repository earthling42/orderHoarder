import { useState } from "react";

type OrderPlacedControlProps = {
    parentSetActiveComponentCallback: (componentName: string) => void;
    orderResponse: any[];
    parentGetProductList: () => any[];
};

function OrderPlacedControl({ parentSetActiveComponentCallback, orderResponse , parentGetProductList}: OrderPlacedControlProps) {

    const [loading, setLoading] = useState(false);
    const response = orderResponse;
    console.log("OrderPlacedControl: passed in order response: ",{response})
    const productList = parentGetProductList();
      
    async function handleAnotherOrder(): Promise<void> {
        setLoading(true);
        parentSetActiveComponentCallback("OrderScreen");  
        setLoading(false);
    }

    return (
        <div>
            <h1>Order Placed</h1>
            <br />
            <span>
                Customer Name:
                &nbsp;
                &nbsp;
                {}
            </span>
            <table style={{ textAlign: 'left', border: '2px solid black', borderCollapse: 'separate', width: '500px', padding: '20px', margin: '20px'}}>
                 <thead>
                    <tr>
                        <th>Customer:</th>
                        <th>{response.customerName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Order Number: </td>
                        <td>{response.orderID}</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ textAlign: 'left', border: '2px solid black', borderCollapse: 'separate', width: '500px', padding: '20px', margin: '20px'}}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                        {response.orderDetails.map((detail) => (
                            <tr>
                                <td>{productList.find(product => product.productID === detail.productID)?.productName}</td>
                                <td>
                                    {detail.quantity}
                                </td>
                            </tr>
                        )
                    )}
                                       
                </tbody>
            </table> 
            <table style={{ textAlign: 'left', border: '2px solid black', borderCollapse: 'separate', width: '500px', padding: '20px', margin: '20px'}}>
                <tbody>
                    <tr>
                        <td>Subotal(Ex VAT)</td>
                        <td>{response.salesValueExcludingVAT}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{response.salesValueIncludingVAT}</td>
                    </tr>     
                </tbody>
            </table>                      
            <br />
            <button type="button"
                onClick={() => handleAnotherOrder()}  
                style={{ marginTop: '15px' }} 
                disabled={loading}
            >
            {loading ? 'Opening order screen...' : 'New Order'}
            </button>
        </div>
    );
}

export default OrderPlacedControl;
