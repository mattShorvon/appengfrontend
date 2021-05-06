import axios from "axios";
import { useState, useEffect } from "react";
import Loaf1 from "./Photos/loaf.png";
import Loaf2 from "./Photos/loaf2.png";
import Loaf3 from "./Photos/loaf3.png";
import Man from "./Photos/man.png";

// updated to receive data from backend query
const Websitelist = () => {
  return axios.post("http://localhost:5000/websitelist");
};
//   const websitelist = await axios.post("http://localhost:5000/websitelist");
//   console.log("Websitelist() function called, result:" + websitelist);
//   return websitelist;
// };

// var websitelist = [
//   {
//     id: 0,
//     name: "Jane's Hairdressers",
//     role: "services business",
//     items: [
//       { id: 1, name: "cut & style", img: null, description: "haha", price: 40 },
//     ],
//     aboutme: "East-London hairdresser with decades of experience.",
//   },
//   {
//     id: 1,
//     name: "Charlie's Bakery",
//     role: "goods business",
//     items: [
//       {
//         id: 1,
//         name: "bread",
//         img: Loaf1,
//         description: "haha",
//         price: 2,
//       },

//       {
//         id: 2,
//         name: "more bread",
//         img: Loaf2,
//         description: "more",
//         price: 3,
//       },

//       {
//         id: 3,
//         name: "more more bread",
//         img: Loaf3,
//         description: "frekjhugrfbrfrf4b",
//         price: 4,
//       },
//       {
//         id: 4,
//         name: "more bread",
//         img: Loaf2,
//         description: "refuihregfrtlkghfr4",
//         price: 3,
//       },
//       {
//         id: 5,
//         name: "Brownie",
//         img: Loaf2,
//         description: "Brownie",
//         price: 3,
//       },
//     ],
//     aboutme:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//     aboutmephoto: Man,
//   },
// ];

export default Websitelist;
