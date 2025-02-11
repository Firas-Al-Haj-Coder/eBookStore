import CartEmpty  from "./components/CartEmpty"
import CartList  from "./components/CartList"
import { useCart } from "../../context";
import useTitle from "../../hooks/useTitle";

export default function CartPage() {

  useTitle("Cart");


    const { cartList } = useCart(); // gewährleistet Zugriff auf total und cartList und die funktionen add,remove,clearCart
    // console.log( cartList );

    return (
    <div className="min-h-screen">
        {cartList.length ? <CartList /> : <CartEmpty/>}
    </div>
  )
}
