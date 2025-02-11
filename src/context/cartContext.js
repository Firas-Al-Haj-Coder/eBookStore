import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducers";

const cartInitialState = {
    cartList: [],
    total: 0
}

const cartContext = createContext(cartInitialState);

export const useCart = () => useContext(cartContext); // lässt den Zustand innerhalb Komponenten benutzt werden, die vom Provider umgeschlossen sind

export function CartProvider({ children }) {
    // after defining our empty action-reducer (cartReducer) we use it here and pass it with the intialState (then we get access to the state.intitalObjekt and the dispatch Funktions that can call the reducer's actions)
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);
    console.log(state); // cart State


    function addToCart(product) {

        const updatedList = state.cartList.concat(product);

        const updatedTotal = state.total + product.price;

        dispatch({
            type:"ADD_TO_CART", 
            payload: {list: updatedList, total: updatedTotal}
        });

    }

    function removeFromCart(product) {

        const updatedList = state.cartList.filter(item => item.id !== product.id); // keep all the items that are not equal to the Product

        const updatedTotal = state.total - product.price;

        dispatch({
            type: "REMOVE_FROM_CART", 
            payload: {list: updatedList, total: updatedTotal}
        });

    }

    function clearCart(){

        dispatch({
            type: "CLEAR_CART"
        });

    }


    const value = {
        state, 
        dispatch, 
        cartList: state.cartList, 
        addToCart,
        removeFromCart,
        clearCart
    };

    return (
        <cartContext.Provider value={value}>
            {children}
        </cartContext.Provider>
    );


}