
export function cartReducer(state, action) {
    //The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types

    console.log(action);
    const { type, payload } = action; // action get passed by the dispatch function from useReducer and it gets computed here
    // it’s common to pass objects with a type property identifying the action. It should include the minimal necessary information that the reducer needs to compute the next state.

    switch(type) {
        case "ADD_TO_CART":
            return {...state, cartList: payload.list, total: payload.total}
        case "REMOVE_FROM_CART":
            return {...state, cartList: payload.list, total: payload.total}
        case "CLEAR_CART":
            return {...state, cartList: [], total: 0}
        default: 
            throw new Error("No case found!");
    }
}