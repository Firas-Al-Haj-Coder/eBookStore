import React, { useEffect, useState } from 'react';
import { useCart } from '../../../context';
import { useNavigate } from 'react-router-dom';

import { getUser, postCreateOrder } from '../../../services';
import { toast } from 'react-toastify';


export default function Checkout({ setShowCheckout }) {

  const { state, cartList, clearCart } = useCart(); // konsumiere den CartContext (für total amount)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate(); // to navigate home after sending an order add POST Request 


  useEffect( () => {

    async function requestUser() {
      try {const data = await getUser();
      setUserInfo(data);
      setName(data.name);
      setEmail(data.email) } catch ( error ) {
        toast.error(error);
      }

    }

    requestUser(); // will be called once, when the user clicks on PLACE ORDER

  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    // to simplify the order-create-request to our DB we can prepare the body of the http-Request
    const order = {
      user: {
        id: userInfo.id,
        name: e.target.name.value , // name, it better to take it from the input field in the form than a hardCoded name from the DB
        email: userInfo.email
      }, // therefore the useEffect - call the Info once (as loggedIn User) 
      productsCartList: cartList, // array that includes the products ordered
      amount: state.total, 
      quantity: cartList.length
    }


    try { 
      const data = await postCreateOrder(order);
      console.log("Post-createOrder response:", data);

      navigate("/order-summary", {state: {status: true, order: data} });

      // After ordering we want to clear our Cart and navigate to OrderPage (to show the summary)
      clearCart();
    } catch (error) {

      console.error("Error placing order:", error);
      navigate("/order-summary", {state: { status: false } });
      
    
    }
  };

  return (
    <section>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <div id="authentication-modal" tabIndex="-1" className="mt-5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto overflow-y-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={() => setShowCheckout(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                <i className="bi bi-credit-card mr-2"></i>CARD PAYMENT
              </h3>
              {/* form that can be handeled  */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email:</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number:</label>
                  <input type="text" name="card" id="card" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" value={cardNumber || ''} onChange={(e) => setCardNumber(e.target.value)} required />
                </div>
                <div className="">
                  <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date:</label>
                  <input type="text" name="month" id="month" className="inline-block w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" value={expiryMonth || ''} onChange={(e) => setExpiryMonth(e.target.value)} required />
                  <input type="text" name="year" id="year" className="inline-block w-20 ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" value={expiryYear || ''} onChange={(e) => setExpiryYear(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="securityCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Security Code:</label>
                  <input type="text" name="securityCode" id="securityCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" value={securityCode || ''} onChange={(e) => setSecurityCode(e.target.value)} required />
                </div>
                <p className="mb-4 text-2xl font-semibold text-lime-500 text-center">
                  ${state.total}
                </p>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                  <i className="mr-2 bi bi-lock-fill"></i>PAY NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}