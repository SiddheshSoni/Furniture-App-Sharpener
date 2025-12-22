
const API_Key = import.meta.env.VITE_API_KEY; //API Key required


const Authenticate = async (email, password) => {

    try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_Key}`,{
            method:'POST',
            body:JSON.stringify({
                email, 
                password,
                returnSecureToken:true,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await res.json();
        

        if(res.ok){
            localStorage.setItem('idToken', data.idToken);
            const userId = email.replace(/[.#$[\]]/g, "_");
            localStorage.setItem('user', userId);
            return{data: data, ok: true};
        }else{
            let errorMessage = "Authentication Failed!";
            if(data && data.error.message){
                errorMessage = data.error.message;
            }
            return {error: errorMessage, ok: false};
        }
    }catch(err){
        console.log(err);
        return {error: err.message || "A network error occured!", ok: false};
    }
};

export default Authenticate;

const BASE_URL = import.meta.env.VITE_BASE_URL; 

export const checkAccess = async (email) =>{
    const cleanEmail = email.replace(/[.#$[\]]/g, "_");
    try{
        const res = await fetch(`${BASE_URL}/admin/${cleanEmail}/isAdmin.json`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const isAdmin = await res.json();

        console.log(isAdmin);
        return !!isAdmin;
    }catch(err){
        console.log(err);
        return { ok: false, error: err.message };
    }
}

export const addAdmin = async (email) =>{
    const cleanEmail = email.replace(/[.#$[\]]/g, "_");
    try{
        const res = await fetch(`${BASE_URL}/admin/${cleanEmail}.json`,{
            method:'PUT',
            body: JSON.stringify({
                isAdmin: true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();

        if(!res.ok){
            return { ok: false, error: "Network response was not ok" };
        }
        console.log(data.isAdmin);
        return { ok: true, data: data, isAdmin: !!data };

    }catch(err){
        console.log(err);
        return { ok: false, error: err.message };
    }
};