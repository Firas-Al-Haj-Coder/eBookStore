import { Link } from "react-router-dom";
import Logo  from "../../assets/logo300.png" 

import React, { useEffect, useState } from 'react';
import { Search } from "../Sections/Search";
import { DropdownLoggedOut, DropdownLoggedIn } from "../index";
import { useRef } from "react";
import { useCart } from "../../context";

export default function Header() {

  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  useEffect( () => {
    // eachtime dark changes it will be stored in the localStorage
    localStorage.setItem("darkMode", JSON.stringify(dark));
    if(dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark])

    // Search bar toggle 
    const [showSearchBar, setShowBar] = useState(false);

    // Dropdown toggle 
    const [dropDown, setDropDown]= useState(false);
    // console.log(dropDown)
    const dropdownRef = useRef(null); // Referenz 
    const spanRef = useRef(null);


    const handleClickOutside = (event) => {
      if (
          dropdownRef.current && // Überprüft, ob das Dropdown-Menü-Element existiert
          !dropdownRef.current.contains(event.target) && // überprüft ob sich das geklickte Element außerhalb (nicht contains) des Dropdown referenzierten Menü (unten)
          spanRef.current && 
          !spanRef.current.contains(event.target)
      ) { // falls das Klicken außerhalb des Dropdown Menüs dann schließe es
          setDropDown(false);
      }
  };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true); // 
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      }; // nur zur Sicherheit wird das Eventlistener entfernt wenn die Komponente wo anders gerendert wird (was im Header nicht der Fall ist)
  }, []);


    // Token aus sessionStorage abrufen
    const token = JSON.parse(sessionStorage.getItem("token"));

    // Use Context case (RED DOT over the Cart)
    const { cartList } = useCart();

  return (
      <header>      
        <nav className="bg-white dark:bg-gray-900">
            <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl px-4 md:px-6 py-3">
                <Link onClick={() => setShowBar(false)} to="/" className="flex items-center">
                    <img src={Logo} className="mr-3 h-10" alt="CodeBook Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">eBook Store</span>
                </Link>
                <div className="flex items-center relative">
                    <span onClick={() => setDark(!dark)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
                    <span onClick={() => setShowBar(!showSearchBar)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"></span>
                    <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
                      <span className="text-2xl bi bi-cart-fill relative">
                        <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span> 
                            {/** the red point over the cart */}
                      </span>                    
                    </Link>
                    {/** Anmeldung Avater */}
                    <span ref={spanRef} onClick={() => setDropDown(!dropDown)  } className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
                    {dropDown && (
                      token ? 
                        <DropdownLoggedIn dropdownRef={dropdownRef} setDropDown={setDropDown}/> : 
                        <DropdownLoggedOut dropdownRef={dropdownRef} setDropDown={setDropDown} />
                    )}
                  
                      {/** sobald den token vorhanden ist wird der Login Dropdown sichtbar sein und Logout button wird angezeigt */}
                </div>
            </div>
        </nav>
        {/** Search Bar under the header */}
        {showSearchBar && <Search setShowBar={setShowBar}/>}
      </header>
    )
  }
