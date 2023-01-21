import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useReducer } from 'react';
import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

// import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function HomeScreen() {
  // const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await Axios.get('http://localhost:5000/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// // import data from '../data';

// export default function HomeScreen() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get('http://localhost:5000/api/products');
//       setProducts(result.data);
//     };
//     fetchData();
//   }, []);
//   return (
//     <div>
//       <h1>Featured Products</h1>
//       <div className="products">
//         {products.map((product) => (
//           <div className="product" key={product.slug}>
//             <Link to={`/product/${product.slug}`}>
//               <img src={product.image} alt={product.name} />
//             </Link>
//             <div className="product-info">
//               <Link to={`/product/${product.slug}`}>
//                 <p>{product.name}</p>
//               </Link>
//               <p>
//                 <strong>${product.price}</strong>
//               </p>
//               <button>Add to cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
