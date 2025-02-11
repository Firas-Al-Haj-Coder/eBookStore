import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/Elements/ProductCard'
import { getFeaturedList } from '../../../services';
import { toast } from 'react-toastify';

export default function FeaturedProdsSec() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchJson() {

            try {
                
                const data = await getFeaturedList();

                // set the json objekt in products
                setProducts(data);
                // now that we have access to the products we wann build the productCards with their inhalt
                console.log("Fetched products:", data);

            } catch (error) {
                toast.error(`Featured Products: Error Fetching  ${error.message}`);
            }
            
        }

        fetchJson();

    }, [])

    return (
        <section className="my-20">
            <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>    
            <div className="flex flex-wrap justify-center lg:flex-row">
                {/* Product Card */}
                {products.map((p) => (
                    <ProductCard key={p.id} product={p}/> 
                ))} {/** pass the whole product p to the component */}
            </div>
        </section>
      )
    }