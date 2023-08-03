import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from "../components/Meta"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const keyword = params.keyword
  const pageNumber = params.pageNumber

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <Meta title="Admin Dashboard" />
      )}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen