
import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) =>{
    const host = "http://localhost:5000"
    const productinitial =[]
    const [products,setProducts]=useState(productinitial)

    const getProducts = async ()=>{

        const response = await fetch(`${host}/api/product/fetchall`,{
            method:'GET',
            headers:{
                'auth-token':localStorage.getItem('token')
            }
          
        });
       const json = await response.json();
        console.log(json)     
        setProducts(json)   
    }


    //add a product
    const addProduct = async (pname,price,category)=>{

        const response = await fetch(`${host}/api/product/add`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({pname,price,category})
        });
        const product = await response.json();
        setProducts(products.concat(product))
    }

    //delete a product
    const deleteProduct = async (id)=>{

        const response = await fetch(`${host}/api/product/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json=response.json()
        console.log(json)

        console.log("deleting the product"+id);
        const newProducts = products.filter((product)=>{return product._id!==id});
        setProducts(newProducts)
    }

    //edit a product
    const editProduct = async (id,pname,price,category)=>{
        
        const response = await fetch(`${host}/api/product/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({pname,price,category})
        });
        const json = response.json()
        console.log(json)
       
        let newProducts = JSON.parse(JSON.stringify(products))
    
        for (let index=0; index<newProducts.length; index++){
            if(newProducts[index]._id ===id){
                newProducts[index].pname = pname;
                newProducts[index].price = price;
                newProducts[index].category = category;
                break;
            }
        }
        setProducts(newProducts)
    }
    return(
            <NoteContext.Provider value={{products,setProducts,addProduct,deleteProduct,editProduct,getProducts}}>
                {props.children}
            </NoteContext.Provider>
    );

}

export default NoteState