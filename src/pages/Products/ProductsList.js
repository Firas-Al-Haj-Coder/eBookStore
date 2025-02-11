import { useEffect, useState } from "react"
import ProductCard from "../../components/Elements/ProductCard"
import FilterBar from "./components/FilterBar"
import { useLocation } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

import { useFilter } from "../../context/";
import { getProductList } from "../../services";
import { toast } from "react-toastify";

export default function ProductsList() {

  useTitle('Products');

  const [show, setShow] = useState(false);

  // const [data, setProducts] = useState([]); // products on the json server is an array of json objects

  // SEARCH - access the query via Web API URL - then fetch them from the json db 
  const searchPath = useLocation().search;
  const searchTerm = new URLSearchParams(searchPath).get('q'); // http://localhost:3001/products?q=react we get 'react'
  // console.log(searchTerm) 

  // Konsimierung des Filterkontext um die Productliste globale zu initialisieren, diese Liste verfügt über die Filtereigenschaft BEST_SELLER_ONLY, inStockOnly, sortBy, etc..
  const { products, initProductList } = useFilter();
  //  console.log(products);

  useEffect(() => {
    async function fetchProducts(){

      try {

        const filteredData = await getProductList( searchTerm );

        // setProducts(filteredData);

        initProductList(filteredData); 
        console.log('Fetched products:', filteredData);
      } catch (error) {
        toast.error(`Error fetching products: ${error.message}`);      }
    }

    fetchProducts();
  }, [searchTerm, initProductList])

  
  
  return (
    <main>
        <section className="my-5">
          <div className="my-5 flex justify-between">
            <span className="text-2xl font-semibold dark:text-slate-100 mb-5">All eBooks ({products.length})</span>
            <span>
              <button onClick={() => setShow(!show)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button"> 
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                <span className="sr-only">Filter Bar Toggle Button ^</span>
              </button>
            </span>            
          </div>    

          <div className="flex flex-wrap justify-center lg:flex-row">
            {/* Product Card map */}
            {products.map((product)=> {
              return <ProductCard key={product.id} product={product}/>
            })}
          </div>  
        </section>

       {show && <FilterBar func={setShow} />} {/** Wann immer wir auf den Button oben klicken wollen wir die Sichtbarkeit toggeln
        * dies geht entwedet durch den oberen Button oder den Button in Filter selbst, deshalb drillen wir setShow in Filter hier rüber
        * Damit einen inneren Klick schon eine andere Komponente bzw. hier setShow steuern kann
        */}
      </main> 
  )//#endregion
}
