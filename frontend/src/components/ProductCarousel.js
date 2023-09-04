import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import Rating from './Rating'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    const isLargeScreen = window.matchMedia('(min-width: 1200px)').matches
    const isMediumScreen = window.matchMedia('(min-width: 992px)').matches

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-dark' controls={isLargeScreen ? true : false}>
            {products.map((product, index) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image id='carsoul-product-image' className='carsoul-product-image' src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>
                                <span className='carsoul-product-name'>{product.name}</span>
                                <span className='carsoul-product-price'> (${product.price})</span>
                            </h2>
                        </Carousel.Caption>
                        {/* <Rating
                            textColor={"white"}
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        /> */}
                        <p id='carsoul-rating'>#{index + 1}</p>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel