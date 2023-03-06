import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'

import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const statusApi = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,

    titleSearch: '',
    category: '',
    rating: '',
    apiStatus: statusApi.intial,
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, titleSearch, category, rating} = this.state
    console.log(rating)
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))

      this.setState({
        productsList: updatedData,
        isLoading: false,
        apiStatus: statusApi.success,
      })
    } else {
      this.setState({isLoading: false, apiStatus: statusApi.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  onSearching = () => {
    const {searchInput} = this.state
    this.setState({titleSearch: searchInput}, this.getProducts)
  }

  onCategory = caId => {
    this.setState({category: caId}, this.getProducts)
  }

  onRating = raId => {
    this.setState({rating: raId}, this.getProducts)
  }

  onClickClearBtn = () => {
    this.setState(
      {searchInput: '', titleSearch: '', category: '', rating: ''},
      this.getProducts,
    )
  }

  onChangeInpuse = value => {
    this.setState({searchInput: value})
  }

  renderNoproducts = () => (
    <div className="no-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="products failure"
        className="no-view-image"
      />
      <h1>No Products Found</h1>
      <p>We could not find any products.Try other filters.</p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const isavailable = productsList.length > 0

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        {isavailable ? (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        ) : (
          this.renderNoproducts()
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some troublr processing your request. please try again.
      </p>
    </div>
  )

  render() {
    const {isLoading, apiStatus, searchInput} = this.state
    let renWhat
    switch (apiStatus) {
      case 'SUCCESS':
        renWhat = this.renderProductsList()

        break
      case 'FAILURE':
        renWhat = this.renderFailureView()
        break

      default:
        renWhat = null
        break
    }

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onSearching={this.onSearching}
          onCategory={this.onCategory}
          onRating={this.onRating}
          onClickClearBtn={this.onClickClearBtn}
          searchInput={searchInput}
          onChangeInpuse={this.onChangeInpuse}
        />

        {isLoading ? this.renderLoader() : renWhat}
      </div>
    )
  }
}

export default AllProductsSection
