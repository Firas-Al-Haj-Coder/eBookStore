import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../components";
import useTitle from "../hooks/useTitle";
import { useCart } from "../context";
import { getIndividualProduct } from "../services";
import { toast } from "react-toastify";

export default function ProductDetailPage() {


  const params = useParams(); // returns an object 
  // console.log(params);
  const [product, setProduct] = useState({}); // a product so on the json server is a json object

  
  useEffect(() => {
    async function fetchProduct() {
      try {
        
        const json = await getIndividualProduct( params );

        setProduct(json);
        console.log("Fetched PDP product:", json);
      } catch (error) {
        toast.error(`Product Details: Error Fetching  ${error.message}`);
      }
    }

    fetchProduct();
  }, [params]);

  const {name, overview, poster, in_stock, price, rating, long_description, size, best_seller} = product;

  useTitle(product.name);

  // Best seller proccessing
  const [show, setShow] = useState(best_seller);
  const [instock, setInstock] = useState(in_stock);

  useEffect(() => {
    setShow(best_seller);
    setInstock(in_stock);
  }, [best_seller, in_stock]);

  // Handhabung des Button Toggeln wenn das Product im Cart ist (add-remove Button sichtbarkeit - s. ganz unten 2Buttons)
    // konsumiere den Kontext
  const { cartList, addToCart, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);
  // console.log(cartList);
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
    <main>
      <section>
        <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">
          {name}
        </h1>
        <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">
          {overview}
        </p>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-xl my-3">
            <img className="rounded w-full" src={poster} alt={name} />
          </div>
          <div className="max-w-xl my-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              <span className="mr-1">$</span>
              <span className="">{price}</span>
            </p>
            <p className="my-3">
              <span>
                <Rating rating={rating}/>
              </span>
            </p>
            <p className="my-4 select-none">
              {show && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">
                BEST SELLER
              </span>}
              {instock ? <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                INSTOCK
              </span> :
              <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span>} 

              <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                {size} MB
              </span>
            </p>
            <p className="my-3">
              {!inCart ? <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : " cursor-not-allowed"}`} disabled={product.in_stock ? "" : "disabled"}> {/* if product is not in stock, disable the button and show cursor not allowed */}
                Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
              </button> :
              <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button>}
            </p>
            <p className="text-lg text-gray-900 dark:text-slate-200">
              {long_description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
