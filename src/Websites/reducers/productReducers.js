import {
  ADD_NEW_PRODUCT,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  REMOVE_NEW_PRODUCT,
  REMOVE_NEW_PRODUCT_FAIL,
} from "../constants/productsConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    // for this to work, I think we need to connect the backend and store it in there? not entirely sure yet. Will Look into fixing
    case ADD_NEW_PRODUCT:
      const product = action.payload;
      return { ...state, products: [...state.products, product] };
    case REMOVE_NEW_PRODUCT:
      return {
        ...state,
        products: state.products.filter((x) => x.itemId !== action.payload),
      };
    case REMOVE_NEW_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
