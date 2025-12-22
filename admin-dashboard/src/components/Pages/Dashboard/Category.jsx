import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row
} from 'react-bootstrap'
import "../../CSS/Category.css"
import { uploadToImgBB } from '../../../API/Dashboard'
import {
  addCategoryThunk,
  getCategoryThunk,
  deleteCategoryThunk,
  updateCategoryThunk,
  addSubCategoryThunk
} from '../../../Store/catalogueSlice'
import { useDispatch, useSelector } from 'react-redux'
import PreviewCard from '../../UI/PreviewCard'

const Category = () => {
  const dispatch = useDispatch()

  const [editingCategory, setEditingCategory] = useState(null)
  const [imgType, setImgType] = useState(false)

  // 🔹 subcategory state
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  const imageRef = useRef()
  const formRef = useRef()

  const categories = useSelector(state => state.catalogue.categories)

  useEffect(() => {
    dispatch(getCategoryThunk())
  }, [dispatch])

  ////////////////category ///////////////////////

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const image = imgType
      ? imageRef.current.files[0]
      : imageRef.current.value

    if (editingCategory) {
      try {
        let imgUrl = editingCategory.imgUrl
        if (image) {
          imgUrl = await uploadToImgBB(image)
        }

        const updatedCategory = { ...editingCategory, ...data, imgUrl }
        const response = await dispatch(updateCategoryThunk(updatedCategory))

        if (updateCategoryThunk.fulfilled.match(response)) {
          alert("Category updated successfully!")
          setEditingCategory(null)
          formRef.current.reset()
        } else {
          alert("Error updating: " + response.payload)
        }
      } catch (error) {
        alert(error.message)
      }
    } else {
      try {
        if (!image) {
          alert("Please select an image")
          return
        }

        const imgUrl = imgType ? await uploadToImgBB(image) : image
        const newCategory = { ...data, imgUrl }

        const response = await dispatch(addCategoryThunk(newCategory))

        if (addCategoryThunk.fulfilled.match(response)) {
          alert("Category added successfully!")
          formRef.current.reset()
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }

  ////////////Subcategory////////////////
  const addSubCategoryHandler = async (e) => {
    e.preventDefault()

    if (!selectedCategoryId) {
      alert("Select a category first")
      return
    }

    const formData = new FormData(e.target)
    const subcategory = formData.get("subcategory")

    if (!subcategory) {
      alert("Enter subcategory name")
      return
    }

    const res = await dispatch(
      addSubCategoryThunk({
        categoryId: selectedCategoryId,
        subcategory
      })
    );
    if(addSubCategoryThunk.fulfilled.match(res)){
      console.log("done")
    }else{
      console.log("err")
    }

    e.target.reset()
  }



  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryThunk(id))
    }
  }

  const editHandler = (id) => {
    const cat = categories.find(c => c.id === id)
    if (cat) {
      setEditingCategory(cat)
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.name.value = cat.name || ""
    }
  }

  return (
    <>
      <div className="category-wrapper">

        {/* ////////////AddCategory///////////// */}
        <div className="add-category-form">
          <h5>Add / Edit Category</h5>

          <Form onSubmit={submitHandler} ref={formRef}>
            <Row className='mb-3'>
              <FormGroup as={Col}>
                <FormLabel>Category</FormLabel>
                <FormControl name='name' />
              </FormGroup>
            </Row>

            <Row className='mb-3'>
              <FormGroup as={Col}>
                <FormLabel>Image Type</FormLabel>
                <FormSelect onChange={(e) => setImgType(e.target.value === '1')}>
                  <option value="2">Image URL</option>
                  <option value="1">Image Upload</option>
                </FormSelect>
              </FormGroup>

              <FormGroup as={Col}>
                <FormLabel>Category Image</FormLabel>
                <FormControl
                  type={imgType ? 'file' : 'url'}
                  ref={imageRef}
                />
              </FormGroup>
            </Row>

            <Button type="submit" className="w-100">
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </Form>
        </div>

      {/* /////////////Subcategory//////////////// */}
        <div className="add-category-form mt-4">
          <h5>Add Subcategory</h5>

          <Form onSubmit={addSubCategoryHandler}>
            <FormGroup className="mb-3">
              <FormLabel>Select Category</FormLabel>
              <FormSelect
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">-- Select --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Subcategory</FormLabel>
              <FormControl name="subcategory" />
            </FormGroup>

            <Button type="submit" variant="info" className="w-100">
              Add Subcategory
            </Button>
          </Form>
        </div>

        <div className="content">
          {categories.map(cat => (
            <PreviewCard
              key={cat.id}
              id={cat.id}
              title={cat.name}
              subcategories={ cat.subcategory ? Object.entries(cat.subcategory).map(([subId, sub] )=> ({subId, ...sub})): []}
              imgUrl={cat.imgUrl}
              variant="admin"
              onEdit={editHandler}
              onDelete={deleteHandler}
            />              
          ))}
        </div>

      </div>
    </>
  )
}

export default Category
