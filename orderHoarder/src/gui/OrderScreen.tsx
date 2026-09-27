import { useEffect, useState } from "react";
import { Products_List } from "../api/Products_List";
import { Orders_Submit } from "../api/Orders_Submit";

type OrderScreenProps = {
    setActiveComponentCallback: (component: string) => void;
};

function OrderScreen({ parentSetActiveComponentCallback, parentSetOrderResponse, parentSetProductList  }: OrderScreenProps) {

    const [productsList, setProductsList] = useState<any[]>([]);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);    
    const [orderResponse, setOrderResponse] = useState<any[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        console.log('OrderScreen mounted');

        async function fetchProductsList() {
            const productListResponse = await Products_List();
            setProductsList(productListResponse);
            parentSetProductList(productListResponse);
        }

        async function initializeOrderDetail() {
            setOrderDetails([]);
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
        setOrderDetails([...orderDetails, { "productID": e, "quantity": 1}]);
    }

    function handleDeleteOrderDetail(productID: any): void {
        console.log('handleDeleteOrderDetail called with productID:',productID);
        if (!orderDetails.some(detail => detail.productID === productID)) {
            console.log('Product not found in orderDetails, cannot delete:', productID);
            return;
        }   
        orderDetails.find(detail => detail.productID === productID)
        const targetIndex = orderDetails.findIndex(detail => detail.productID === productID);

        setOrderDetails(orderDetails.filter((_, index) => index !== targetIndex));
        console.log('Updated orderDetails after deletion:', orderDetails);   
    }
  
    async function handleSubmitOrder(): Promise<void> {
        setLoading(true);
        const directResponse = await Orders_Submit(1, new Date().toISOString(), customerName, orderDetails);
        console.log("DIRECT_RESPONSE: ", directResponse)
        setOrderResponse(directResponse);
        //console.log('Order submission returned to the screen. Response:', orderResponse);
        parentSetOrderResponse(directResponse);
        console.log("parentSetOrderResponse: ", directResponse);
        parentSetActiveComponentCallback("OrderPlacedControl");
        setLoading(false);        
    }

    return (
        <div>
            <h1>Order Screen</h1>


            <div className="table-container">
                <table>
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

                    <table style={{ textAlign: 'left', border: '2px solid black', borderCollapse: 'separate', width: '500px', padding: '20px', margin: '20px'}}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.length === 0 ? (
                                <span>
                                    <tr>
                                        <td colSpan={2}>Click on a product in the product list to add it to your order.</td>
                                    </tr>
                                    <tr>
                                        <td>-- empty order --</td>
                                    </tr>
                                </span>
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
                                            <td>
                                            <button type="button" onClick={() => handleDeleteOrderDetail(detail.productID)}>
                                                Delete
                                            </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>

                    </table>
                    <button type="button"
                        onClick={() => handleSubmitOrder()}  
                        style={{ marginTop: '15px' }} 
                        disabled={loading}
                    >
                    {loading ? 'Submitting Order...' : 'Submit Order'}
                    </button>
                </table>

                <table>
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
                </table>
            </div>
        </div>
    )
}

export default OrderScreen;
