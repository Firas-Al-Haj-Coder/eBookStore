export async function getProductList ( searchTerm ) { // used in ProdcutList

    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products`);
    
    if(!response.ok) {
        // throw an Error so I can capture it (catch) in the utilizing components
        throw new Error( response.statusText );
    }

    const jsons = await response.json();

    // manuelle Suche im Server   

    const filteredData = searchTerm ? 
    jsons.filter(item => item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    : jsons;

    return filteredData; // array von json Objekte 

}

export async function getIndividualProduct( params ) {

    const response = await fetch(
        `${process.env.REACT_APP_HOST}/444/products/${params.id}`
    );
    if(!response.ok) {
        // throw an Error so I can capture it (catch) in the utilizing components
        throw new Error( response.statusText );
    }
    const json = await response.json();

    return json; 

}

export async function getFeaturedList () {

    const response = await fetch(`${process.env.REACT_APP_HOST}/444/featured_products`);
    if(!response.ok) {
        // throw an Error so I can capture it (catch) in the utilizing components
        throw new Error( response.statusText );
    }
    const data = await response.json();

    return data; // Array von json Objekte

}