
const BASE_URL = 'https://furniture-site-ae922-default-rtdb.asia-southeast1.firebasedatabase.app/';

const RequestWrapper = async (path='orders.json', {method ='GET', body = null}={}) =>{
    const url = BASE_URL+path;
    const options = {
        method,
        headers:{ 'Content-Type': 'application/json'},
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    try{
        const response = await fetch(url, options);
        const data = await response.json();

        if(response.ok){
            return {ok: true, data: data};
        }else{
            let errorMessage = "An Error occured in orders";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return {ok: false, error: errorMessage};
        }
    }catch(err){
        return {ok: false, error: err};
    }

};

const getOrders = async () => {
    return RequestWrapper(`orders.json`, {method:'GET'});
};

const sendOrder = async (newOrder) => {
    return RequestWrapper(`orders.json`, {method:'POST', body: newOrder});
};

const updateOrder = async (id, status) => {
    return RequestWrapper(`orders/${id}.json`, {method:'PATCH', body: {status}});
};

export {getOrders, sendOrder, updateOrder};