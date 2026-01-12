
const BASE_URL = 'https://furniture-site-ae922-default-rtdb.asia-southeast1.firebasedatabase.app/';

const RequestWrapper = async ( path = 'cart.json', {method = 'GET', body=null}={})=>{
    const url = BASE_URL + path;

    const options = {
        method,
        headers: { 'Content-Type' : 'application/json'},
    };

    if(body){
        options.body = JSON.stringify(body);
    };

    try{
        const response = await fetch(url, options);
        const data = await response.json();

        if(response.ok){
            return {ok: true, data: data};
        }else{
            let errorMessage = 'An error occured fetching cart DB';
            if( data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage};
        }
    }catch(err){
        return {ok: false, error: err};
    }
};

const getCart = async () =>{
    const user = localStorage.getItem('user');
    return await RequestWrapper( `cart/${user}.json`, {method:'GET'});
}

const addToCart = async (newItem) =>{
    const user = localStorage.getItem('user');
    return await RequestWrapper( `cart/${user}.json`, {method:'POST', body: newItem});
}

const deleteCartItem = async (id) =>{
    const user = localStorage.getItem('user');
    return await RequestWrapper( `cart/${user}/${id}.json`, {method:'DELETE'});
}

const updateCartItem = async (updatedCartItem) =>{
    const user = localStorage.getItem('user');
    const id = updatedCartItem._id;
    return await RequestWrapper( `cart/${user}/${id}.json`, {method:'PUT', body: updatedCartItem});
}

const clearCart = async () =>{                //CLEAR ALL ITEMS FROM THE CART (USER);
    const user = localStorage.getItem('user');
    return await RequestWrapper( `cart/${user}.json`, {method:'DELETE'});
}


export {getCart, addToCart,  deleteCartItem, updateCartItem, clearCart, };