import React from "react";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";

export default function Products() {
    const allProducts = useSelector(selectProducts);
    return (
        <div className="productsWrapper">
            <h1>Products</h1>
            <div>
                {allProducts.map(product => {
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