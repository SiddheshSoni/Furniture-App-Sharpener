import React from 'react'
import { Card } from 'react-bootstrap'

const CardStats = ({icon, title, value, linkTitle, onClick}) => {
  return (
    <Card className='dashboard-card' onClick={onClick} >
        <Card.Body>
            <div className='dashboard-icon'>
                <i className={icon}></i>
            </div>

            <div className='dashboard-title'>{title}</div>
            <div className='dashboard-value'>{value}</div>

        </Card.Body>
        
        <Card.Footer>
            <div className='dashboard-link'>{linkTitle}</div>
        </Card.Footer>

    </Card>
  )
}

export default CardStats;