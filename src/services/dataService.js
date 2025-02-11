function getSessionCreds(){

    const ebID = JSON.parse(sessionStorage.getItem("ebID"));
    const token = JSON.parse(sessionStorage.getItem("token"));

    return {ebID, token}
}

export async function getUser () { // used in Checkout, in DropdownloggedIn (email)

    const ebID = getSessionCreds().ebID;
    const token = getSessionCreds().token;

    // get the ebID and token of the session (containing the userID and accesstoken to fetch request our userInfo that is being guarded with code 600)

    try {
        const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${ebID}`, { // to geth the user we need his id
            method: "GET", 
            headers: {
              "CONTENT-TYPE": "application/json", // user ist in From JSON, somit weiß der Server das auch
              Authorization: `Bearer ${token}`
            }
          })
    
        const data = await response.json();

        return data; 
    }
    catch (error) {
        throw new Error("Error fetching user:", error);
    }
}


export async function getUserOrders () { // used in Dashboard

    const userID = getSessionCreds().ebID;
    const token = getSessionCreds().token;

    console.log("userID Orders:", userID);

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${userID}`, { // user.id ist wichtig
        method: "GET", 
        headers: {
            "CONTENT-TYPE": "application/json", // user ist in From JSON, somit weiß der Server das auch
            Authorization: `Bearer ${token}`
        }
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}


export async function postCreateOrder ( order ) { // used in Checkout

    // const ebID = getSessionCreds().ebID;
    const token = getSessionCreds().token;

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
        method: "POST", // write an order in our DB as POST Request
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order) // we need the information of the order - userInfo, and the products name from the cartList of the user (his Cart)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // we get the body zurück, wenn der Order gespeichert wurde
    console.log("Order placed successfully, order:", data);
  
    return data;
}
