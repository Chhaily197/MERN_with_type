import React from 'react'
import axios from 'axios'
import { useState } from 'react'

type PropsProduct = {
    name: string;
    price: number;
    des: string;
}

const Add: React.FC = () => {
    const [data, setData] = useState<PropsProduct>(
        {name: '', price: 0, des: ''});
    const [submiting, setSubmting] = useState(false);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setSubmting(true);
            const res = await axios.post('http://localhost:3000/products', data);
            if(res){
                alert("Product added successfully.");
                location.href = '/';
            }
            setSubmting(false);
        } catch (error) {
            console.error('Invalid add product', error);
            setSubmting(false);
        }
    }

  return (
    <div className='flex min-h-screen'>
      <form action="#" className='flex items-center justify-center w-[500px] m-auto gap-5 flex-col'>
        <input 
            type="text" 
            name='name'
            value={data.name}
            onChange={handleChange}
            placeholder='Name'/>
        <input 
            type="number" 
            name='price'
            value={data.price}
            onChange={handleChange}
            placeholder='Price'/>
        <input 
            type="des" 
            name='des'
            value={data.des}
            onChange={handleChange}
            placeholder='Description'/>
        <button
        onClick={HandleSubmit}
        disabled={submiting}
        className='bg-blue-500 w-full p-3'
        >{submiting ? 'Submiting': 'Submit'}</button>
      </form>
    </div>
  )
}

export default Add
