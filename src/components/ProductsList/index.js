import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FcSearch} from 'react-icons/fc'
import './index.css'

const ProductList = () => {
  const [searchInput, setSearchInput] = useState('')

  const getProductListDataFromLocalStorage = () => {
    const getData = localStorage.getItem('productsListData')
    const parsedData = JSON.parse(getData)
    return parsedData
  }

  const searchResults = () => {
    const getSearchResults = getProductListDataFromLocalStorage().filter(
      eachData =>
        eachData.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return getSearchResults
  }

  useEffect(() => {
    const getApiData = async () => {
      const url = 'https://fakestoreapi.com/products'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const stringifyAndStoreDataOnLocalStorage = localStorage.setItem(
          'productsListData',
          JSON.stringify(data),
        )
      }
    }

    getApiData()
    getProductListDataFromLocalStorage()
  }, [])

  return (
    <div className="app-bg">
      <div className="app-card-container">
        <h1 className="main-heading">Product List</h1>
        <div className="input-container">
          <input
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => {
              setSearchInput(e.target.value)
            }}
            value={searchInput}
          />
          <button type="submit" className="react-search-btn">
            <FcSearch className="react-icon" />
          </button>
        </div>
        <ul className="products-list-ul-container">
          {searchResults().map(eachData => (
            <Link
              key={eachData.id}
              className="link-item"
              to={`/products/${eachData.id}`}
            >
              <li className="product-list-item">
                <img
                  src={eachData.image}
                  alt={eachData.title}
                  className="image-product-list"
                />
                <div className="product-list-text-container">
                  <h1 className="product-list-item-title">{eachData.title}</h1>
                  <p className="product-list-price">$ {eachData.price}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductList
