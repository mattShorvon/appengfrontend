import React, { useContext, useEffect, useState } from "react";
import "../../css/products.css";
import "../../css/changeproducts.css";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
// import { AddToCart } from './cartSlice'
import { useDispatch } from "react-redux";
import {
  ProductsContainer,
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton,
} from "../../css/productselements";
import { listProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { ListGroupItemHeading } from "reactstrap";

const Services = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const businessName = useSelector((state) => state.home.businessName);
  console.log(businessName);
  const itemCategory = "Service";

  useEffect(() => dispatch(listProducts(businessName, itemCategory)), []);

  const addToCartHandler = (e) => {
    dispatch(addToCart(e));
    e.preventDefault();
  };

  return (
    <>
      {console.log(loading)}
      {loading ? (
        <div>
          <h1> loading </h1>
        </div>
      ) : (
        <ProductsContainer>
          <ProductsHeading>Welcome to the products Page</ProductsHeading>
          <ProductWrapper>
            {console.log(productList)}
            {products
              .filter((product) => {
                if (product.quantityInStock === 0) {
                  return false;
                } else {
                  return true;
                }
              })
              .map((product) => {
                //   var quant = 1;
                //   const setquant = (value) => {
                //     quant = value;
                //   };
                return (
                  <ProductCard key={product.itemId}>
                    <ProductImg
                      src={`https://comp0067.herokuapp.com/${product.itemPicture}`}
                    />
                    <ProductInfo>
                      <ProductTitle>{product.name}</ProductTitle>
                      <ProductDesc>{product.description}</ProductDesc>
                      <ProductPrice>{product.price}</ProductPrice>

                      <>
                        <li>
                          <div className="row">
                            <div>Qty</div>
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(5).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </li>
                      </>
                      <ProductButton
                        onClick={() => dispatch(addToCart(product, qty))}
                      >
                        Add to Basket
                      </ProductButton>
                    </ProductInfo>
                  </ProductCard>
                );
              })}
          </ProductWrapper>
        </ProductsContainer>
      )}
    </>
  );
};

export default Services;
