import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Products: React.FC = () => {

    const [product, setProduct] = useState([]);
    const [loading, SetLoading] = useState(true);

    const getAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/products');
            setProduct(res.data);   
            SetLoading(false);
        } catch (error) {
            console.error("Error API Request", error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    if(loading){
        return <div>
            <h2>Loading...</h2>
        </div>
    }

    return(
        <div>
            <h1 className="text-center text-3xl font-bold">Products</h1>
            <div className="flex items-center justify-end px-5">
                <NavLink to={`add`} className={`bg-blue-500 w-[130px] p-2 text-center hover:w-[140px] duration-150`}>Add Product</NavLink>
            </div>
            <table className="w-full py-[8px] px-[12px] text-center relative top-[30px]">
                <thead>
                    <tr className="text-xl">
                        <th>ProductID</th>
                        <th>ProductName</th>
                        <th>ProductPrice</th>
                        <th>Description</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item: any, key: any) =>(
                        <tr key={key} className="text-lg px-2">
                            <td>{item.p_id}</td>
                            <td>{item.p_name}</td>
                            <td>{item.p_price}</td>
                            <td>{item.p_des}</td>
                            <td className="flex gap-1">
                                <button className="bg-blue-500 cursor-pointer w-[50px] rounded-lg font-bold">
                                    <NavLink to={`update/${item.p_id}`}>E</NavLink>
                                </button>
                                <button className="bg-red-500 w-[50px] cursor-pointer rounded-lg">
                                    <NavLink to={`delete/${item.p_id}`}>D</NavLink>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products