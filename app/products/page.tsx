"use client"

import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';


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
    const [products, setProducts] = useState<Product[]>([]);
    //const [error, setError] = useState('');

    //console.log(data.products);
    const fetchProducts = async () => {
        try{
            const data = await axios.get('https://dummyjson.com/products');
            
            if(data.status == 200){
                console.log('Product axios get: ', data);
                setProducts(data.data.products);
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
                    <Button><Link href='/products/new'><div className='flex justify-center'><IoIosAddCircleOutline size={22}/><span>เพิ่มทริป</span></div></Link></Button>
                </div>
                <div className="grid grid-cols-4">
                    {products.map(product => (
                    <div key={product.id} className="p-3 rounded-md shadow-md">
                        <h3 className="font-bold">{product.title}</h3>
                        <Image src={product.images[0]} width={300} height={150} alt={product.title} priority={true}/>
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
