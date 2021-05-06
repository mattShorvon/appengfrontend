import React, { useContext, useEffect, useState } from "react";
import "../../css/changeproducts.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  removeNewProduct,
  listProductsAndServices,
} from "../actions/productActions";
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

function RemoveProducts() {
  // const products = useSelector((state) => state.products)

  const productList = useSelector((state) => state.productList);
  const [qty, setQty] = useState(1);
  const [rerender, setReRender] = useState(0);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  const businessName = useSelector((state) => state.home.businessName);

  useEffect(() => dispatch(listProductsAndServices(businessName)), []);

  return (
    <>
      {loading ? (
        <div>
          <h1> loading </h1>
        </div>
      ) : (
        <ProductsContainer>
          <ProductsHeading>
            Owner: Click 'Remove Product' to remove it from your selection!
          </ProductsHeading>
          <ProductWrapper>
            {products.map((product) => {
              return (
                <ProductCard key={product.itemId}>
                  <ProductImg src={product.image} />
                  <ProductInfo>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductDesc>{product.description}</ProductDesc>
                    <ProductPrice>{product.price}</ProductPrice>
                    <ProductButton
                      onClick={() => dispatch(removeNewProduct(product))}
                    >
                      Remove Product
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
}

export default RemoveProducts;
