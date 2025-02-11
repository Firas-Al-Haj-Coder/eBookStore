import { Routes, Route } from "react-router-dom"
import { HomePage, ProductList, ProductDetailPage, CartPage, DashboardPage} from "../pages"
import { ScrollToTop } from "../components"

import { Login, Register } from "../pages/index"
import { ProtectedRoute } from "./ProtectedRoute"

import { OrderPage } from "../pages"
import { PageNotFound } from "../pages"

export default function AllRoutes() {
  return (
    
    <>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/products" element={<ProductList />}/>
            <Route path="/products/:id" element={<ProductDetailPage />}/>
            
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

            <Route path="/cart" element={<ProtectedRoute> <CartPage /> </ProtectedRoute> }/> {/* uses protected Routes, if i have a token (loggedin) user can access the cart, or they will be navigated to login page */}
            <Route path="/order-summary" element={<ProtectedRoute> <OrderPage /> </ProtectedRoute> }/> {/* uses protected Routes, if i have a token (loggedin) user can access the orders, or they will be navigated to login page */}
            <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute> }/> {/* uses protected Routes, if i have a token (loggedin) user can access their OrderDashboard - what was placed, or they will be navigated to login page */}

            <Route path="*" element={ <PageNotFound />} />
        </Routes>
    </>

  )
}
