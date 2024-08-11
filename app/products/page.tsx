"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";


interface Product{
    id: number;
    title: string;
    email: string;
    images: string;
    description: string;
    brand: string;
    category: string;
    price: string;
    stock: string;
}

const ProductPage = () => {
    //const res = await fetch("https://dummyjson.com/products");
    //const data = await res.json();
    //const products = data.products;

    const [products, setProducts] = useState<Product[]>([]);
    //const [error, setError] = useState('');

    //console.log(data.products);
    const fetchProducts = async () => {
        try{
            const res = await fetch("https://dummyjson.com/products");
            const data = await res.json();
            if(res.ok){
                //console.log(data.products);
                //const products:Product[] = data.products;
                setProducts(data.products);
            } else {
                throw new Error("Failed to fetch data.");
            }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchProducts();
      }, []);

    return (
        <>
            <div>
                <div className="p-3 my-3">
                    <h3>Products</h3>
                </div>
                <div className="grid grid-cols-4">
                    {products.map(product => (
                    <div key={product.id} className="p-3 rounded-md shadow-md">
                        <h3 className="font-bold">{product.title}</h3>
                        <Image src={product.images[0]} width={300} height={150} alt={product.title}/>
                        <p>Description: {product.description}</p>
                        <p>Brand: {product.brand}</p>
                        <p>Category: {product.category}</p>
                        <p><span>Price: {product.price}</span> | <span>Stock: {product.stock}</span></p>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
  }

export default ProductPage
