// für den STORE in Provider

export function filterReducer(state, action) {
    const {type, payload} = action; // action hat type und payload der dispatch-Funktion hier in reducer

    switch(type){
        case "PRODUCT_LIST": // GLOBALE ZUGRIFF zur Initialisierung der Liste (bleibt fest nachdem Fetchen)
            return { productList: payload.products } 
                // Dieser Rückgabewert ersetzt den gesamten Zustand durch ein neues Objekt, das nur productList enthält.
        case "SORT_BY":
            return {...state, sortBy: payload.sortBy}
        case "RATING":
            return {...state, ratings: payload}
        case "BEST_SELLER_ONLY":
            return { ...state, bestsellerOnly: payload} // payload hier ist kein Objekt 
        case "INSTOCK_ONLY":
            return { ...state, inStockOnly: payload}
        case "CLEAR_FILTER": // Produkte bleiben, aber obere Eigenschaften zurücksetzen
            return {...state, 
                sortBy: null, 
                ratings: null,
                inStockOnly: false, 
                bestsellerOnly: false
            }
        default: 
            throw new Error("No Case Found.");

    }
}