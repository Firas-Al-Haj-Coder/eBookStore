
export async function login( usrLogin ) { // used in Login

    console.log(usrLogin)

    let token;

    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
        method: "POST", 
        headers: {"content-type": "application/json"}, 
        body: JSON.stringify(usrLogin)
    });

      if ( !response.ok ) {
        // eslint-disable-next-line
        throw {status: response.status, statusText: response.statusText  };
      }

      token = await response.json();
    

    console.log(token);

    if(token.accessToken) {
        // speichere den Token und die USER_ID in der Sitzung (nicht sicher gegen XSS Attacken)

        sessionStorage.setItem("token", JSON.stringify(token.accessToken));
        sessionStorage.setItem("ebID", token.user.id);


    }

    return token;
}

export async function register( formUser ) {

    let data;

    const response = await fetch(`${process.env.REACT_APP_HOST}/register`, {
        method: "POST", 
        headers: {"content-type": "application/json"}, // somit weiß der Server, dass der formUser in JSON Format ist
        body: JSON.stringify(formUser) // damit er als String in der HTTP Anfrage gesendet werden kann
      }); // send a post Request to our server-auth and get a valid token
  
      if ( !response.ok ) {
        // eslint-disable-next-line
        throw {status: response.status, statusText: response.statusText  };
      }
      
      data = await response.json();
  
      if(data.accessToken) {
        // speichere den Token und die USER_ID in der Sitzung (nicht sicher gegen XSS Attacken)
  
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("ebID", data.user.id);
  
      } 


      return data; // returns user order token 

}

export function logout ( clearCart ) { // used in DropdownLoggedIn

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("ebID");

    clearCart();

}