
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

//Category

const addCategory = async (newCategory) =>{
    return await RequestWrapper(`category.json`, {method:'POST', body: newCategory});
};
const getCategory = async () =>{
    return await RequestWrapper(`category.json`, {method:'GET'});
};
const deleteCategory = async (categoryId) => {
    return await RequestWrapper(`category/${categoryId}.json`, { method: 'DELETE' });
};
const updateCategory = async (categoryId, categoryData) => {
    return await RequestWrapper(`category/${categoryId}.json`, { method: 'PATCH', body: categoryData });
};

const addSubCategory = async (categoryId, subcategory) => {
    return await RequestWrapper(`category/${categoryId}/subcategory.json`, {method:'POST', body:{ name:subcategory}});
};

//Product

const addProduct = async (newProduct) =>{
    return await RequestWrapper(`product.json`, {method:'POST', body: newProduct});
};
const getProduct = async () =>{
    return await RequestWrapper(`product.json`, {method:'GET'});
};
const deleteProduct = async (productId) => {
    return await RequestWrapper(`product/${productId}.json`, { method: 'DELETE' });
};
const updateProduct = async (productId, productData) => {
    return await RequestWrapper(`product/${productId}.json`, { method: 'PUT', body: productData });
};

export { addCategory, getCategory, addProduct, getProduct, deleteCategory, updateCategory, deleteProduct, updateProduct, addSubCategory };

export const uploadToImgBB = async (file) => {

    const apiKey = "f78538ebbdf5462df087f4ac962512d0 ";
    const formData = new FormData();
    formData.append("image", file);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            
            return data.data.url; 
};