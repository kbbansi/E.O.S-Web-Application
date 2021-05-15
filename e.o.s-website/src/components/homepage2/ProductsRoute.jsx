// import axios from 'axios';
// import React, { useState } from 'react';
// import { Route, Switch } from 'react-router';
// import ProductPage from '../productpage/ProductPage';

// export default function ProductsRoute(props) {
//     const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
//     const {fetched, setFetched } = useState(false);
//     const {products, setProducts} = useState([]);

//     useEffect(() => {
//         //masonryFunc();
//         if (!alreadyFetched) {
//           fetchProducts();
//         }
//       });

//       const fetchProducts = () => {
//         axios
//           .get(`${server_url}products/create`)
//           .then((res) => {
//             setProducts(res.data.message);
//           })
//           .catch((e) => console.log(e));
//       };

//     return (
//         <Switch>
//                     {this.props.auctions.pending ? (
//                         <React.Fragment>
//                             <div className="center">
//                                 <LoaderComponent loading={this.state.loading} />

//                             </div>
//                         </React.Fragment>
//                     ) : (Route
//                             path="/products/:slug"
//                             render={({ match }) => {
//                                 let product = products.find(
//                                     a => a.id === parseInt(match.params.slug)
//                                 );
//                                 return <ProductPage productInfo={product} />;
//                             }}
//                         />
//                     )}
//         </Switch>
//     );

// }
