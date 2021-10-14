import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) return null;

    return (
        <>
            <div>
                <section className="bg-light">
                    <div className="container pb-5">
                        <div className="row">
                            <div className="detail">
                                <img src={detailProduct.images.url} alt="" />
                                <div className="box-detail">
                                    <div className="row">
                                        <h2>{detailProduct.title}</h2>
                                        <h6>#id: {detailProduct.product_id}</h6>
                                    </div>
                                    <span>$ {detailProduct.price}</span>
                                    <p>{detailProduct.description}</p>
                                    <p>{detailProduct.content}</p>
                                    <p>Sold: {detailProduct.sold}</p>
                                    <Link to="/cart" className="cart text-decoration-none"
                                        onClick={() => addCart(detailProduct)}>
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <div className="row text-left p-2 pb-3">
                            <h4>Related Products</h4>
                        </div>
                        <div id="carousel-related-product">
                            <div className="p-2 pb-3">
                                <div className="product-wap card rounded-0">
                                    <div className="products">
                                        {
                                            products.map(product => {
                                                return product.category === detailProduct.category
                                                    ? <ProductItem key={product._id} product={product} /> : null
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DetailProduct





