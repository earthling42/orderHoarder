import { useState } from 'react'
import './App.css'
import AuthControl from './gui/AuthControl'
import OrderScreen from './gui/OrderScreen'
import OrderPlacedControl from './gui/OrderPlacedControl';

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false)
  const AvailableComponents = {
    AuthControl: "AuthControl",
    OrderScreen: "OrderScreen",
    OrderPlacedControl: "OrderPlacedControl",
  } as const;

  type AvailableComponent =
    (typeof AvailableComponents)[keyof typeof AvailableComponents]

  const [activeComponent, setActiveComponent] = useState<AvailableComponent>(AvailableComponents.AuthControl)
  const [orderID, setOrderID] = useState(0);

  const renderComponent = () => {
    switch (activeComponent) {
      case AvailableComponents.AuthControl:
        return <AuthControl setActiveComponent={setActiveComponent}  />
      case AvailableComponents.OrderScreen:
        return <OrderScreen setActiveComponent={setActiveComponent} setOrderID={setOrderID} />
      case AvailableComponents.OrderPlacedControl:
        return <OrderPlacedControl setActiveComponent={setActiveComponent} orderID={orderID} />
      default:
        return <AuthControl setActiveComponent={setActiveComponent} />
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
