import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const getProducts = useCallback(async () => {
        let products = await fetch('') // Put the URL to get all products from the database
            .then(response => {
                return response.json()
            })
            .then(jsonResponse => {
                setProducts(products)
            })
            .catch(e => {
                setError(e);
            });
    }, []);

    useEffect(() => {
         getProducts();
    }, [getProducts])

    return (
        <div className="productsWrapper">
            <h1>Products</h1>
            <div>
                {products.map(product => {
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <div className="product-card">
                            <h3>{product.name}</h3>
                            <p className="product-diff">{product.difficulty}</p>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    );
}