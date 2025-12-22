import React, { useEffect, useRef, useState } from 'react'
import { Button ,Row, Col, Form, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProductThunk, getCategoryThunk, getProductThunk, deleteProductThunk, updateProductThunk } from '../../../Store/catalogueSlice';
import { uploadToImgBB } from '../../../API/Dashboard';
import PreviewCard from '../../UI/PreviewCard';
import '../../CSS/Product.css'
const Product = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.catalogue.categories);
    const products = useSelector(state => state.catalogue.products);
    const [editingProduct, setEditingProduct] = useState(null);
    const [imgType, setImgType] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState("")

    const formRef = useRef();
    const imageRef = useRef();
    
    const submitHandler = async (e) =>{
        e.preventDefault();
        const image = imgType ? imageRef.current.files[0]: imageRef.current.value;
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        const categoryId = formData.get("categoryId");
        const categoryName = categories.find( i => ( i.id === categoryId))?.name;
        const subcatId = formData.get("subcategoryId");
        const subcatName =  categories.find( cat => cat.id === categoryId )?.subcategory?.[subcatId]?.name;
        
        const payload = {
            ...data, 
            category: categoryName, 
            subcategory: subcatName
        }
        if (editingProduct) {
            // UPDATE LOGIC
            try {
                let imgUrl = editingProduct.imgUrl; // Keep old image by default
                if (image) {
                    // if new image is selected, upload it   
                    imgUrl = await uploadToImgBB(image);
                }
                const updatedProduct = {
                    ...editingProduct, // carry over id
                    ...payload, // new form data
                    imgUrl: imgUrl,
                };
                const response = await dispatch(updateProductThunk(updatedProduct));
                if (updateProductThunk.fulfilled.match(response)) {
                    alert("Product updated successfully");
                    setEditingProduct(null);
                    formRef.current.reset();
                } else {
                    alert("Failed to update: " + response.payload);
                }
            } catch (err) {
                alert(err.payload || err.message);
            }
        } else {
            // ADD LOGIC
            try{
              if(!image){
                alert("Please select an image for the new product.");
                return;
              }
    
              const imgUrl = imgType ? await uploadToImgBB(image): image;
              
            const newProduct ={
              ...payload,
              imgUrl: imgUrl,
            };
            const response = await dispatch(addProductThunk(newProduct));
            
            if(addProductThunk.fulfilled.match(response)){
              alert("Product added successfully");
              formRef.current.reset();
            }else{
              alert("Failed to add product: "+ response.payload);
            }
          }catch(err){
            alert (err.payload || err.message);
          }
        }
    };

    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProductThunk(productId));
        }
    };

    const editHandler = (productId) => {
        const productToEdit = products.find(p => p.id === productId);
        if (productToEdit) {
            setEditingProduct(productToEdit);
            formRef.current.scrollIntoView({ behavior: 'smooth' });
            formRef.current.pname.value = productToEdit.pname || '';
            formRef.current.category.value = productToEdit.category || '';
            formRef.current.subcategory.value = productToEdit.subcategory || '';
            formRef.current.price.value = productToEdit.price || '';
        }
    };

    useEffect(()=>{
        dispatch(getProductThunk());
    },[dispatch]);

    useEffect(()=>{          
            dispatch(getCategoryThunk());
    },[dispatch]);

  return (
    <>
    <div className="product-wrapper">

    <div className='input-container'>
        <h2 className='mb-4'>Manage Products</h2>
        <div className='input-form'>
            <Form onSubmit={submitHandler} ref={formRef}>
                <FormGroup className='mb-3'>
                    <FormLabel>Product Name:</FormLabel>
                    <FormControl className='input-field' type='text' name='pname' />
                </FormGroup>
                <Row>
                    <FormGroup className='mb-3' as={Col}>
                        <FormLabel>Category:</FormLabel>
                        <FormSelect className='input-field' name='categoryId' value={selectedCategoryId} onChange={(e)=> setSelectedCategoryId(e.target.value)}>
                            <option value="">--Select--</option>
                            {categories && categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <FormGroup className='mb-3' as={Col}>
                        <FormLabel>Subcategory:</FormLabel>
                        <FormSelect className='input-field' name='subcategoryId'>
                            <option>--Select--</option>
                            {categories.find( cat => cat.id === selectedCategoryId)?.subcategory &&
                                Object.entries(categories.find( cat => cat.id === selectedCategoryId)?.subcategory).map( ([subId, sub]) =>(
                                    <option key={subId} value={subId}>{sub.name}</option>
                                ))   
                            }
                        </FormSelect>
                    </FormGroup>
                </Row>
                <Row>

                <FormGroup as={Col} className="mb-3">
                    <FormLabel>Price</FormLabel>
                    <FormControl className='input-field' type="number" placeholder="₹ 0.00" name='price' />
                </FormGroup>
                <FormGroup as={Col}>
                    <FormLabel>Quantity:</FormLabel>
                    <FormControl className='input-field' type="number" placeholder='0' min={0} name='quantity' />
                </FormGroup>
                </Row>
                <FormGroup className="mb-3" as={Row}>
                    <FormGroup as={Col}>
                        <FormLabel>Category image type:</FormLabel>
                        <FormSelect onChange={(e)=> setImgType(e.target.value === '1')}>
                            <option value="2">link</option>
                            <option value="1">image</option>
                        </FormSelect>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Category image:</FormLabel>
                        <FormControl type={imgType ?'file': 'url'} ref={imageRef}/>
                    </FormGroup>
                </FormGroup>

                {editingProduct ? (
                    <>
                        <Button variant="success" type='submit'>
                            Update Product
                        </Button>
                        <Button variant="secondary" onClick={() => { setEditingProduct(null); formRef.current.reset(); }} className="ms-2">
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="primary" type='submit'>
                        Add Product
                    </Button>
                )}
            </Form>
        </div>
    </div>
    <div className='content' >
        {products && products.map(item =>(
            <PreviewCard 
            key={item.id} 
            id={item.id} 
                title={item.pname} 
                imgUrl={item.imgUrl} 
                price={item.price} 
                quantity={item.quantity}
                category={item.category} 
                subcategory={item.subcategory} 
                variant="admin" 
                onDelete={deleteHandler}
                onEdit={editHandler}
            />
        ))}
    </div>
    </div>
    </>
  )
};

export default Product;