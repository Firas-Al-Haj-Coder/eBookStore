import React from 'react'
import OrderSuccess from "./components/OrderSuccess"
import OrderFails from "./components/OrderFails"
import { useLocation } from 'react-router-dom';

export default function OrderPage() { 
  const location = useLocation();  
  console.log("locations obj:", location);
  const status = location.state.status; // state is being passed from Checkout with a property status and order that holds the order's info and status:the state of the order, if it failed or was true successful by navigate-location Übergabe to this target-component (Navigationsverhalten)
  const order = location.state.order; // we passed state that has status and order als properties and we are accessing them here
  
  return (
    <main>
      {status ? <OrderSuccess order={order}/> : <OrderFails /> }
    </main>
  )
}
