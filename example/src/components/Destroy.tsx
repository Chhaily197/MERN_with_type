import React from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

const DestroyProducts: React.FC = () => {
    const { id } = useParams();

    const handlSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:3000/products/${id}`);
            if(res){
                alert("Products deleted successfully.");
                location.href = '/';
            }
        } catch (error) {
            console.error("Invalid delete products");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center gap-7 h-screen">
            <h1>Do you wanna delete the product?</h1>
            <div className="flex items-center justify-center gap-2">
                <button className="bg-slate-500 py-2 w-[100px] rounded-lg hover:w-[110px]">
                    <NavLink to="/">Cancel</NavLink>
                </button>
                <button 
                className="bg-red-500 py-2 w-[100px] rounded-lg hover:w-[110px]"
                onClick={handlSubmit}
                >Delete</button>
            </div>
        </div>
    )
}

export default DestroyProducts