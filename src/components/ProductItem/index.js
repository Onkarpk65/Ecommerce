import {useState, useEffect} from 'react'
import {AiFillPlusSquare, AiFillMinusSquare} from 'react-icons/ai'
import './index.css'

const ProductItem = props => {
  const [productItemData, setProductItemData] = useState({})
  const [cart, setCart] = useState({})
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const getProductItemData = async () => {
      const {match} = props
      const {params} = match
      const {id} = params
      const url = `https://fakestoreapi.com/products/${id}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProductItemData(data)
      }
    }
    getProductItemData()
  }, [])

  const onClickMinusBtn = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const onClickPlusBtn = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const onAddCart = product => {
    setCart(product)
  }

  console.log(cart)

  return (
    <div className="product-item-container">
      <div className="product-item-inner-container">
        <div className="product-item-image-container">
          <img
            src={productItemData.image}
            alt={`${productItemData.title} img`}
            className="product-item-img"
          />
        </div>
        <div className="product-item-details-container">
          <h1 className="product-item-name">{productItemData.title}</h1>
          <p className="product-item-price">Price: ${productItemData.price}</p>
          <p className="product-item-details">{productItemData.description}</p>
          <div className="ratings-and-reviews-container">
            <div className="ratings-container">
              <p className="rating">Rating: </p>
              <p className="rating-ans">{productItemData?.rating?.rate}</p>
            </div>
            <div className="ratings-container">
              <p className="rating">Reviews: </p>
              <p className="rating-ans">{productItemData?.rating?.count}</p>
            </div>
          </div>
          <div className="buttons-container">
            <button
              type="button"
              className="plus-minus-btn"
              onClick={onClickMinusBtn}
            >
              <AiFillMinusSquare className="react-btn-icon" />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="plus-minus-btn"
              onClick={onClickPlusBtn}
            >
              <AiFillPlusSquare className="react-btn-icon" />
            </button>
          </div>
          <div>
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={() => {
                onAddCart({productItemData})
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
