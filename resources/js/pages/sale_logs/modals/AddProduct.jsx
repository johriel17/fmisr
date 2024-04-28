import React, { useEffect, useRef, useState } from 'react'

const AddProduct = ({title, isOpen, handleClose, handleAddSaleProduct, modalId}) => {

    
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({});
    const [price, setPrice] = useState('')





    const handleAddProduct = (e) => {
        e.preventDefault()

        console.log(selectedProduct);

        const { id, name } = JSON.parse(selectedProduct);

        const newProduct = {
            frozen_id : id,
            product: name,
            price,
        };

        handleAddSaleProduct(newProduct);

        setSelectedProduct({})
        setPrice('')
        $(select2Ref.current).val(null).trigger('change.select2');
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === 'product') {
            setSelectedProduct(value);
        }
    };

    const modalRef = useRef(null);
    const select2Ref = useRef(null);

    useEffect(() => {

        if(isOpen){
            const fetchProducts = async() => {

                try{
                    const response = await axios.get('/api/select?type=all-frozen-with-cat')
                    setProducts(response.data)
                }catch(error){
                    console.log(error)
                }

            }
            fetchProducts()
        }


        

        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();        
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }


        
        if(select2Ref.current){
            $(select2Ref.current).select2()
            $(select2Ref.current).on('change', handleSelectChange);
        }


        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };




    }, [isOpen, handleClose]);
    
    return (
        <div id={modalId} className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" ref={modalRef}>
                <div className="modal-content">
                    <form onSubmit={handleAddProduct}>
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Product</label>
                                            <select name='product' required className='form-control select2' ref={select2Ref}>
                                            <option value=''>Select Product</option>
                                            {products && products.map((product, index) => (
                                                <option key={index} value={JSON.stringify(product)}>{product.name}</option>
                                            ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="price">price</label>
                                            <input id='price' name='price'  type="text" value={price} onChange={(e) => setPrice(e.target.value)} className={`form-control`} required autoComplete='off' />
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct