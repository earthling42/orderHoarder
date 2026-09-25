import { useEffect, useState } from "react";
import { Products_List } from "../api/Products_List";
import { Orders_Submit } from "../api/Orders_Submit";

type OrderScreenProps = {
    setActiveComponent: (component: string) => void;
    setOrderID: (orderID: number) => void;
};

function OrderScreen({ setActiveComponent, setOrderID }: OrderScreenProps) {

    const [productsList, setProductsList] = useState<any[]>([]);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);    
    const [orderResponse, setOrderResponse] = useState<any[]>([]);
    const [customerName, setCustomerName] = useState('');
    //const [orderID, setOrderID] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        console.log('OrderScreen mounted');
        async function fetchProductsList() {
            setProductsList( await Products_List());
        }

        async function initializeOrderDetail() {
            setOrderDetails([]);
            //setOrderDetails([{"productID": 4, "quantity": 2}, {"productID": 5, "quantity": 1}]);
        }       

        fetchProductsList();
        initializeOrderDetail();
    }
    , []
    );

    const handleCustomerNameChange = (e) => {
        setCustomerName(e.target.value); 
    };

     const handleQuantityChange = (e, productID :number) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity)) {
            setOrderDetails(orderDetails.map(d => d.productID === productID ? { ...d, quantity: newQuantity } : d));
        }
    }

    const addProductToOrder = (e) => {
        console.log('addProductToOrder called with productID:', e);
        if (orderDetails.some(detail => detail.productID === e)) {
            console.log('Product already in orderDetails, not adding:', e);
            return;
        }   
        setOrderDetails([...orderDetails, { "productID": e, "quantity": 0 }]);
    }
  
    async function handleSubmitOrder(): Promise<void> {
        setLoading(true);
        setOrderResponse(await Orders_Submit(1, new Date().toISOString(), customerName, orderDetails));
        console.log('Order submitted. Response:', orderResponse);
        setLoading(false);
        setOrderID(orderResponse[0]?.orderID || 0);
        setActiveComponent("OrderPlacedControl");
        
    }

    return (
        <div>
            <h1>Order Screen</h1>
            <h2>Product List</h2>

            <table style={{ textAlign: 'left', border: '2px solid black', borderCollapse: 'separate', width: '100%', padding: '20px', margin: '20px'}}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Unit Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.map((product) => (
                        <tr key={product.productID}>
                            <td><div onClick={() => addProductToOrder(product.productID)}>{product.productName}</div></td>
                            <td>{product.categoryName}</td>
                            <td>{product.unitPrice.toFixed(2)}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Your Order</h2>

            <span>
            Customer Name:
            &nbsp;
            &nbsp;
            <input 
                type="text" 
                name="customerName" 
                value={customerName} 
                onChange={handleCustomerNameChange} 
            />
            </span>

            <table style={{ textAlign: 'left', border: '2px solid black', borderCollapse: 'separate', width: '100%', padding: '20px', margin: '20px'}}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.length === 0 ? (
                        <tr>
                            <td colSpan={2}>Click on a product in the product list to add it to your order.</td>
                        </tr>
                    ) : (
                        orderDetails.map((detail) => (
                            <tr key={detail.productID}>
                                <td>{productsList.find(product => product.productID === detail.productID)?.productName}</td>
                                <td>
                                    <input
                                        type='text'
                                        value={detail.quantity}
                                        onChange={(e) => handleQuantityChange(e, detail.productID)}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        <br />
        <br />
        <button type="button"
            onClick={() => handleSubmitOrder()}  
            style={{ marginTop: '15px' }} 
            disabled={loading}
        >
          {loading ? 'Submitting Order...' : 'Submit Order'}
        </button>
        </div>
    );
}

export default OrderScreen;
