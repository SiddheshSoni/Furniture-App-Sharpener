
const BASE_URL = 'https://furniture-site-ae922-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const saveAddress = async (address) => {
    const user = localStorage.getItem('user');

    try{
        const res = await fetch(`${BASE_URL}/users/${user}/addresses.json`, {
            method: 'POST',
            body: JSON.stringify(address),
            headers:{'Content-Type' : 'application/json'},
        });
        const data = await res.json();
        
        if(!res.ok){
            let errorMessage = 'An error occured in saving address';
            if(data && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage};
        }

        return {ok: true, data: data};
    }catch(err){
        return {ok: false, error: err};
    }
};

export const fetchAddress = async () => {
    const user = localStorage.getItem('user');
    try{
        const res = await fetch(`${BASE_URL}/users/${user}/addresses.json`, {
            method: 'GET',
            headers:{'Content-Type' : 'application/json'},
        });
        const data = await res.json();
        
        if(!res.ok){
            let errorMessage = 'An error occured in saving address';
            if(data && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage};
        }

        return {ok: true, data: data};
    }catch(err){
        return {ok: false, error: err};
    }
};