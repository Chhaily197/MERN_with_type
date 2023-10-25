import axios from "axios";
import React from "react";
import { useState } from 'react'
import { useParams } from "react-router-dom";

type PropsUpdateProducts = {
    name: string;
    price: number;
    des: string;
}

const UpdateProducts: React.FC = () => {

    const { id } = useParams();

    const [updateData, setUpdateData] = useState<PropsUpdateProducts>({
        name: '',
        price: 0,
        des: ''
    });
    const [updating, setUpdating] = useState(false);

    const handlChange = (e: any) => {
        const {name, value} = e.target;
        setUpdateData({...updateData, [name]: value});
    }

    const handlSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setUpdating(true);
            const res = await axios.put(`http://localhost:3000/products/${id}`, updateData);
            if(res){
                alert('Products updated successfully.');
                location.href = '/';
            }
            setUpdating(false);
        } catch (error) {
            console.error('Invalid update products',error);
            setUpdating(false);
        }
    }

    return(
        <div className='flex min-h-screen'>
            <h1>Update Products</h1>
        <form action="#" className='flex items-center justify-center w-[500px] m-auto gap-5 flex-col'>
            <input 
                type="text" 
                name='name'
                value={updateData.name}
                onChange={handlChange}
                placeholder='Name'/>
            <input 
                type="number" 
                name='price'
                value={updateData.price}
                onChange={handlChange}
                placeholder='Price'/>
            <input 
                type="text" 
                name='des'
                value={updateData.des}
                onChange={handlChange}
                placeholder='Description'/>
            <button
            disabled={updating}
            className='bg-blue-500 w-full p-3'
            onClick={handlSubmit}
            >{updating ? 'Updating': 'Update'}</button>
        </form>
        </div>
    )
}

export default UpdateProducts