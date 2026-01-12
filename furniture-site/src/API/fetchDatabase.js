
const BASE_URL = 'https://furniture-site-ae922-default-rtdb.asia-southeast1.firebasedatabase.app/';

const RequestWrapper = async ( path='dashboard.json', {method = 'GET', body = null}={})=>{
    const url = `${BASE_URL}${path}`;
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
            let errorMessage = "Failed Request";
            if(data && data.error.message){
                errorMessage = data.error.message;
            }
            return {ok:false, error: errorMessage};
        }
    }catch(err){
        return { ok: false, error: err};
    }
};

const getCategory = async () =>{
    return await RequestWrapper(`category.json`, {method:'GET'});
};
const getProduct = async () =>{
    return await RequestWrapper(`product.json`, {method:'GET'});
};

export {getCategory, getProduct};