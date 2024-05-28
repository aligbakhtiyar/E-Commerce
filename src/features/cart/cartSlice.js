import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
    cartItems:[],
    numItemsInCart:0,
    cartTotal:0,
    shipping:500,
    tax:0,
    orderTotal:0
};

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || defaultState;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage,
    reducers: {
        addItem: (state, action) => {
            const { product } = action.payload;
            // console.log('Action Payload:', action.payload);
            // console.log('Current State before adding item:', state);
            const  item = state.cartItems.find((i) => i.cartID === product.cartID) 
            if(item){
                item.numItem += product.numItem
            } else {
                state.cartItems.push(product);
            }
            state.numItemsInCart += product.numItem;
            console.log(state.numItemsInCart,'kdmdm')
            state.cartTotal += product.price * product.numItem;
            cartSlice.caseReducers.calculateTotals(state);
            // toast.success('item addd to cart')
        },
        clearCart:(state) => {
            localStorage.setItem('cart', JSON.stringify(defaultState))
            return defaultState
        },

        removeItem:(state, action) => {
            const {cartID} = action.payload;
            const product = state.cartItems.find((i) => i.cartID ===cartID);
            state.cartItems = state.cartItems.filter((i)=> i.cartID !== cartID);
            state.numItemsInCart -= product.numItem;
            state.cartTotal -= product.price * product.numItem;
            cartSlice.caseReducers.calculateTotals(state);
            // toast.success('item removed from cart')
        },
        editItem:(state, action) => {
            const {cartID, numItem} = action.payload;
            const item = state.cartItems.find((i) => i.cartID ===cartID);
            state.numItemsInCart += numItem -item.numItem
            state.cartTotal += item.price * (numItem -item.numItem)
            item.numItem = numItem;
            cartSlice.caseReducers.calculateTotals(state);
            // toast.success('Cart updated')

        },
        calculateTotals:(state) => {
            state.tax = 0.1 * state.cartTotal ;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            localStorage.setItem('cart', JSON.stringify(state))

        }
    }
});
export const {addItem, clearCart, removeItem, editItem} = cartSlice.actions
export default cartSlice.reducer 