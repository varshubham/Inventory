import React,{useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext';

const Noteitem = (props) => {
    const {product,updateproduct} = props;
    const context = useContext(NoteContext)
    const {deleteProduct} = context
  return (
    <div className='col-md-3 '>
      <div className="card my-3">
          <div className="card-body">
              <h5 className="card-title">{product.pname}</h5>
              <p className="card-text">{product.price}</p>
              <i className="far fa-trash-alt mx-2" onClick={()=>{deleteProduct(product._id)}}></i>
              <i className="far fa-edit mx-2" onClick={()=>{updateproduct(product)}}></i>
          </div>
      </div>
    </div>
  )
}

export default Noteitem
