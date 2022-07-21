import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import Productitem from './Productitem'
import Addproduct from './Addproduct'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext)
  const ref = useRef(null)
  const refclose = useRef(null)
  const { products, getProducts, editProduct } = context
  const [product, setProduct] = useState({ id: "", epname: "", eprice: "", ecategory: "" })
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getProducts();
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateproduct = (currentProduct) => {
    ref.current.click();
    setProduct({ id: currentProduct._id, epname: currentProduct.pname, eprice: currentProduct.price, ecategory: currentProduct.category })
  }

  const handleclick = () => {
    editProduct(product.id, product.epname, product.eprice, product.ecategory)
    refclose.current.click()
  }


  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  return (<>
    <Addproduct/>

    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="ename" className="form-label">Product Name</label>
                <input type="text" className="form-control" id="ename" name='epname' value={product.epname} aria-describedby="emailHelp" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="eprice" className="form-label">Price</label>
                <input type="text" className="form-control" id="eprice" name='eprice' value={product.eprice} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ecategory" className="form-label">Category</label>
                <input type="text" className="form-control" id="ecategory" name='ecategory' value={product.ecategory} onChange={onChange} />
              </div>


            </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refclose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleclick}>Update</button>
          </div>
        </div>
      </div>
    </div>

    <div className='row my-3 ' style={{width:"70%",margin:"auto"}}>
      <h2>Your Products</h2>
      {products.map((product) => {
        return <Productitem key={product._id} updateproduct={updateproduct} product={product} />
      })}
    </div>

  </>
  )
}

export default Notes
