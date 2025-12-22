import React from 'react'
import { Button, Card } from 'react-bootstrap'

const PreviewCard = ({ id, title, imgUrl, price, category, subcategory, quantity, subcategories, onClick, variant, onAddToCart, onEdit, onDelete }) => {
    
  return (
        <Card onClick={onClick} className={`preview-card ${variant === "recipeView"? "recipe-view" :""}`} style={{ width: '18rem'}}>
            <Card.Img variant="top" src={imgUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {category && <Card.Subtitle className="mb-2">Category: {category}</Card.Subtitle> }           
                {subcategory && <Card.Subtitle className="mb-2">Subcategory: {subcategory}</Card.Subtitle> }           
                {price && <Card.Subtitle className="mb-2">Price: ₹ {price}</Card.Subtitle>}
                {quantity && <Card.Subtitle className='mb-2'>Quantity: {quantity}</Card.Subtitle>}

                {subcategories && 
                    <ul>
                        {subcategories.map(sub => 
                        <li key={sub.id}>{sub.name}</li>
                    )}
                    </ul>}
            
                {variant ==="admin" && (<>
                    <Card.Link className='p-1 fw-semibold text-primary' onClick={(e) => {e.stopPropagation(); onEdit(id);}}>Edit</Card.Link>
                    <Card.Link className='p-0 fw-semibold text-danger' onClick={(e) => {e.stopPropagation(); onDelete(id);}}>Delete</Card.Link>
                </>)}
                
            </Card.Body>
                {variant ==="user" && (
                    <div className='prev-card-btn'>
                    <Button variant='primary' onClick={(e) => {e.stopPropagation(); onAddToCart();}}>Add to cart</Button>
                    </div>
                )}
        </Card>
  )
}

export default PreviewCard;