
const API_KEY = import.meta.env.VITE_API_KEY;


const Authentication = async (email, password, authMode) => {
    let authEndPoint = authMode ? "signUp" : "signInWithPassword";

    try{

        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${authEndPoint}?key=${API_KEY}`,{
            method:'POST',
            body: JSON.stringify({
                email, 
                password,
                returnSecureToken: true,
            }),
            headers: { 'Content-Type': 'application.json'},
        });

        const data = await res.json();

        if(!res.ok){
            let errorMessage = "Authentication Failed!";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return {ok: false, error: errorMessage};
        }

        localStorage.setItem('idToken', data.idToken);
        const userId = email.replace(/[.#$[\]]/g, "_");
        localStorage.setItem('user', userId );
        
        return {ok: true, data: data};

    }catch(err){
        console.log(err.message);
        return {ok: false, error: err.message};
    }
};

export default Authentication;