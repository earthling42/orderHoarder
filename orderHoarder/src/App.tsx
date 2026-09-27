import { useState } from 'react'
import './App.css'
import AuthControl from './gui/AuthControl'
import OrderScreen from './gui/OrderScreen'
import OrderPlacedControl from './gui/OrderPlacedControl';

function App() {

  const AvailableComponents = {
    AuthControl: "AuthControl",
    OrderScreen: "OrderScreen",
    OrderPlacedControl: "OrderPlacedControl",
  } as const;

  type AvailableComponent =
    (typeof AvailableComponents)[keyof typeof AvailableComponents]

  const [activeComponent, setActiveComponent] = useState<AvailableComponent>(AvailableComponents.AuthControl);
  const [orderResponse, setOrderResponse] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);

  // function getOrderResponse() :any[] {
  //   return orderResponse;
  // } 

  function getProductList() :any[] {
    return productList;
  } 

  const renderComponent = () => {
    switch (activeComponent) {
      case AvailableComponents.AuthControl:
        return <AuthControl parentSetActiveComponentCallback={setActiveComponent}  />
      case AvailableComponents.OrderScreen:
        return <OrderScreen parentSetActiveComponentCallback={setActiveComponent} parentSetOrderResponse={setOrderResponse} parentSetProductList={setProductList}/>
      case AvailableComponents.OrderPlacedControl:
        //return <OrderPlacedControl parentSetActiveComponentCallback={setActiveComponent} getOrderResponse={getOrderResponse} parentGetProductList={getProductList}/>
        console.log("passing in orderResponse:", orderResponse);
        return <OrderPlacedControl parentSetActiveComponentCallback={setActiveComponent} orderResponse={orderResponse} parentGetProductList={getProductList}/>
      default:
        return <AuthControl parentSetActiveComponentCallback={setActiveComponent} />
    }
  }

  return (
    <>
      <section id="center">
        
      {renderComponent()}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
       
      </section>

      <h5>OrderHoarder Interview Project</h5>



    </>
  )
}

export default App
