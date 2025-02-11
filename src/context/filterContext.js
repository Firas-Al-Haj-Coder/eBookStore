import { createContext, useCallback, useContext, useReducer } from "react"
import { filterReducer } from "../reducers";

const initialFilterState = { // initial State des Filters und dessen Funktionen
    productList: [],

    sortBy: null, // ascendig || descending
    ratings: null, // 4StarsAbove..etc

    inStockOnly: false, 
    bestsellerOnly: false
}

const filterContext = createContext(initialFilterState); // gibt den aktuellen Stand des Filters und dessen Funktionen 

export const useFilter = () => useContext(filterContext); // ist ein benutzer definierter hook, der den FilterContext verwendet, um den !aktuellen! Stand des Filters und die zugehörigen Funktionen zurückzugeben global via den umschließenden Provider, der einen Value bereitstellt 
// Der [useFilter]-Hook kann nur innerhalb von Komponenten verwendet werden, die von `FilterProvider` umschlossen sind

export function FilterProvider({children}) { 
    // stellt filterContext für childeren bereit, um den Zustand und die dispatch-Funktion verfügbar zu machen

    // Erstelle den Store (mit initialen zustand und den Reducer)
    const [state, dispatch] = useReducer(filterReducer, initialFilterState); // Der Zustand (state) wird vom filterReducer verwaltet, der auf Aktionen reagiert und den Zustand entsprechend aktualisiert.
    // state ist der aktuelle Zustand des Filters, der vom Reducer verwaltet wird. Es enthält alle Eigenschaften, die im initialFilterState definiert sind, wie sortBy, rating, inStockOnly, bestsellerOnly und productList.

    // 1ste Aktion PRODUCT_LIST
     const initProductList = useCallback((products) => { // from fetch in ProductsList.js
         dispatch({
             type: "PRODUCT_LIST",
             payload: { // payload entählt Daten, die die Aktion in reducer benötigt, in diesem Fall die Liste der Produkte, die übergeben und global gesetzt wird
                 products: products  // sende an reducer die gefetchte Liste der Produkte zum setzen in state.productList
             }
         })
    }, [dispatch]);

    // 2te Aktion SORT_BY Price HighToLow & LowToHigh
    function sortByPrice(productList) {
        // radio -> if 
        if(state.sortBy === "ascendig") {
            return productList.sort((a, b) => Number(a.price) - Number(b.price)); // sort ascendig nach price
            /**
             * Wenn die Vergleichsfunktion eine negative Zahl zurückgibt (a - b), wird a vor b platziert, a ist kleiner.
             * Wenn die Vergleichsfunktion 0 zurückgibt, bleibt die Reihenfolge von a und b unverändert.
             * Wenn die Vergleichsfunktion eine positive Zahl zurückgibt (a - b), wird b vor a platziert.
             */
        }
        if( state.sortBy === "descending") {
            return productList.sort((a, b) => Number(b.price) - Number(a.price) );
            /**
         * Wenn die Vergleichsfunktion eine negative Zahl zurückgibt (b - a), wird b vor a platziert, b ist kleiner.
         * Wenn die Vergleichsfunktion 0 zurückgibt, bleibt die Reihenfolge von a und b unverändert.
         * Wenn die Vergleichsfunktion eine positive Zahl zurückgibt (b - a), wird a vor b platziert.
         */
        }

        return productList;
    }

    // 3te Aktion Rating Filter nach Stars
    function filterByRating( productList ) {
        if(state.ratings === "4StarsAbove"){
            // filter products nach the 4 ratings or above 
            return productList.filter(product => product.rating >= 4 );
        }
        if(state.ratings === "3StarsAbove"){
            return productList.filter(product => product.rating >= 3 );
        }
        if(state.ratings === "2StarsAbove"){
            return productList.filter(product => product.rating >= 2 );
        }
        if(state.ratings === "1StarsAbove"){
            return productList.filter(product => product.rating >= 1 );
        }
        return productList;
    }

    // 4te Aktion Filter BEST_SELLER_ONLY
    function filterBSO( productList ) {
        return  state.bestsellerOnly ? productList.filter(p => p.best_seller === true) : productList;
    }

    // 5te Aktion Filter INSTOCK_ONLY
    function filterISO( productList ) {
        return state.inStockOnly ? productList.filter(p => p.in_stock === true) : productList;
    }
    
    const filteredProductList = filterByRating(sortByPrice(filterISO(filterBSO(state.productList))));
        // Verarbeitete Verschatlung (via if und state.Eigenschaft) - if eine Eigenschaft ist gesetzt, dann wird gefiltert
        /**
         * Diese Zeile kombiniert mehrere Filter- und Sortierfunktionen, um die productList zu verarbeiten. Hier ist eine Schritt-für-Schritt-Erklärung:
         * filterBSO(state.productList): Diese Funktion filtert die Produktliste basierend auf dem bestsellerOnly-Zustand.
         * filterISO(...): Diese Funktion filtert die Produktliste basierend auf dem inStockOnly-Zustand.
         * sortByPrice(...): Diese Funktion sortiert die gefilterte Produktliste basierend auf dem sortBy-Zustand.
         * filterByRating(...): Diese Funktion filtert die sortierte Produktliste basierend auf dem rating-Zustand.
         */

    const value = { // enthält ein Objekt, das an dem Provider übergeben wird, das alle Funktionen und aktuelle Daten enthäht, die von den Komponenten verwendet werden können, die den Kontext konsumieren (in diesem Fall der Filtercontext, der in der ProductList Komponente konsumiert wird, aber wir stellen das für alle Komponenten bereit).
        state, 
        dispatch,
        products: filteredProductList, // vorher - state.productList,
        initProductList
    }

    // console.log(value);


    return (
        <filterContext.Provider value={value}>
            {children}
        </filterContext.Provider>
    )
}