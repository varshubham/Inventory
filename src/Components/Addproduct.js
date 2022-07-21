import React,{useContext,useState} from 'react'
import NoteContext from '../Context/notes/NoteContext'

const Addproduct = () => {
    const context = useContext(NoteContext);
    const {addProduct}=context;
    const [product,setProduct] = useState({pname:"",price:"",category:"null"})
    const handleclick=(e)=>{
        e.preventDefault();
        addProduct(product.pname,product.price,product.category)
    }
    const onChange = (e)=>{
            setProduct({...product,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3" style={{ width: "60%" }}>
      <h1>Add a Product</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="name" name='pname' onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Description</label>
          <input type="text" className="form-control" id="price" name='price' min={0}  onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Tag</label>
          <input type="text" className="form-control" id="category" name='category'  onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
      </form>
      
      </div>
  )
}

export default Addproduct
