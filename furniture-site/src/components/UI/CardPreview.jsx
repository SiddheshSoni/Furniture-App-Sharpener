import React from 'react'
import "./CardPreview.css"
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'react-bootstrap'


const CardPreview = ({title, imgUrl, subcategory, quantity, price, onAddToCart, isLoading , onClick }) => {
  return (
        <Card className='preview-card' onClick={onClick}> 
            <CardImg variant='top' src ={imgUrl} />
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle className="mb-2">Subcategory: {subcategory}</CardSubtitle>
                <CardSubtitle className="mb-3">Quantity: {quantity}</CardSubtitle>
                <CardSubtitle className=" price">₹ {price}</CardSubtitle>
            </CardBody>
            <div className="prev-card-btn">
                <Button disabled={isLoading} onClick={() => onAddToCart()}>
                    {isLoading && <span className="spinner-border spinner-border-sm me-2" />}
                    {isLoading ? "Adding..." : "Add to cart"}
                </Button>
            </div>
        </Card>
  )
}

export default CardPreview