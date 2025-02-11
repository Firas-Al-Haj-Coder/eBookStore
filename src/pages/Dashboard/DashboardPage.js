import React, { useEffect, useState } from 'react'
import DashboardCard from './components/DashboardCard';
import DashboardEmpty from "./components/DashboardEmpty";
import { getUserOrders } from '../../services';
import useTitle from '../../hooks/useTitle';
import { toast } from 'react-toastify';

export default function DashboardPage() {

  useTitle("Dashboard");
  

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchUserOrders() {
      
      try {

        const data = await getUserOrders();
        setOrders(data);
        console.log(data);

      } catch (error) {

        toast.error(error.message);

      }
        
    }
    
    fetchUserOrders();

  } , [])

  useEffect(() => {
    console.log(orders);
  }, [orders])

    return (
        <main>
          <section>
            <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
          </section>

          {/* if orders has elements the map overthem and render them */}
          <section>
            { orders.length > 0 ? ( 
              orders.map( (order) => (
              <DashboardCard key={order.id} order={order} />
              ))
            ) : (
            <DashboardEmpty />
            )}
          </section>
        </main>
      )
    }