import Loaf1 from "../Photos/loaf.png";
import Loaf2 from "../Photos/loaf2.png";
import Loaf3 from "../Photos/loaf3.png";
import axios from "axios";
import jwt_decode from "jwt-decode";

function data() {
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  // async function getData() {
  //   const result = await axios.post("http://localhost:5000/getproductslist", {
  //     userId,
  //   });
  //   return result.data;
  // }
  //   return axios
  //     .post("http://localhost:5000/getproductslist", {
  //       userId,
  //     })
  //     .then((response) => response.data);
  // }

  // getting the results of getData onto the products page will be tricky, requires some async await stuff
  // need to make sure the products page doesn't render until the query promise is fulfilled, will try
  // to map over an undefined object otherwise.

  return {
    products: [
      {
        id: 1,
        name: "bread",
        img: Loaf1,
        description: "haha",
        price: 2,
      },

      {
        id: 2,
        name: "more bread",
        img: Loaf2,
        description: "more",
        price: 3,
      },

      {
        id: 3,
        name: "more more bread",
        img: Loaf3,
        description: "frekjhugrfbrfrf4b",
        price: 4,
      },
      {
        id: 4,
        name: "more bread",
        img: Loaf2,
        description: "refuihregfrtlkghfr4",
        price: 3,
      },
      {
        id: 5,
        name: "Brownie",
        img: Loaf2,
        description: "Brownie",
        price: 3,
      },
    ],
  };
}

export default data;
