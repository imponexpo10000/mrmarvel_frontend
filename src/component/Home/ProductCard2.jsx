import React from 'react'
import { Link } from 'react-router-dom'
import "./ProductCard2.css"

const ProductCard2 = ({product}) => {
  return (
    <Link to={`product/${product._id}`} className='product_card' >
        <div className="card_container">
            <div className="image_container">
            <img src={product.images[0].url} alt={product.name} />

            </div>
            <div className="info_container">
                <p>{product.name}</p>
                <p className='price' >$ {product.price}</p>

            </div>

        </div>

    </Link>
  )
}

export default ProductCard2