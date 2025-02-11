import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useCart } from '../../context';

export default function ProductCard({ product }) {
//   console.log(product);
  const { id, name, overview, price, image_local, rating, best_seller } = product;

  const [show] = useState(best_seller); // bedingtes Rendering


  // Handhabung das addieren oder das entfernen auf den Cart
  const {addToCart, removeFromCart, cartList} = useCart(); 
  function handleClick( product ) {
    addToCart( product );
  }

  // Handhabung des Button Toggeln wenn das Product im Cart ist (add-remove Button sichtbarkeit - s. ganz unten 2Buttons)
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    if ( // product ist vorhanden
      cartList.find(item => item.id === product.id)
    ) 
    {
      setInCart(true); // produkt ist im Cart vorhanden
    } else {
      setInCart(false);
    }
  }, [cartList, product.id]);

  return (
    <div className="m-3 max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/products/${id}`} className="relative">
        {show && <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded"> "Best Seller"</span>}
        <img className="rounded-t-lg w-full h-64" src={image_local} alt={name} />
      </Link>
      <div className="p-5">
        <Link to={`/products/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
        


        {/** Rating - number converted to filled stars */}
        {/**Vorher */}
        {/**
        <div className="flex items-center my-2">
            <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
            <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
            <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
            <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
            <i className="text-lg bi bi-star text-yellow-500 mr-1"></i>
        </div>
         
         Nachher
         */}
        <div className="flex items-center my-2">
          <Rating rating={rating}/>
        </div>
        
        <p className="flex justify-between items-center">
          <span className="text-2xl dark:text-gray-200">
            <span>$</span><span>{price}</span>
          </span>
          {/* we pass the product that is propped from ProductsList to be added or removed */}
          {!inCart ? <button onClick={() => handleClick(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : "cursor-not-allowed"}`} disabled={ product.in_stock ? "" : "disabled"}> 
            Add To Cart</button>
           : <button onClick={() => removeFromCart(product)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800" disabled={ product.in_stock ? "" : "disabled"}> Remove Item <i className="ml-1 bi bi-trash3"></i></button>}

        </p>
      </div>
    </div>
  );
}