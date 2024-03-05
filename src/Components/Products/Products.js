import React, {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const getProducts = useCallback(async () => {
        try {
            await fetch('').then(response => {
                
            })
        } catch (e) {

        }
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