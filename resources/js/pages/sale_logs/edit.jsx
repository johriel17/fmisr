import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './modals/AddProduct';
const edit = () => {

    const [formData, setFormData] = useState({
        customer_name : '',
        sale_date : ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { id } = useParams();
    const [saleLogProducts, setSaleLogProducts] = useState([])
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const successNotify = (msg) => toast.success(msg);
    const errorNotify = (msg) => toast.error(msg);
    const datetimepickerRef = useRef(null);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {

        const fetchSaleLog = async() => {

            try{
                const response = await axios.get(`/api/sale_logs/${id}`);
                const saleLogData = response.data;
                setSaleLogProducts(saleLogData.sale_log_products)
                setFormData({
                    ...formData,
                    customer_name: saleLogData.customer_name,
                    sale_date: saleLogData.sale_date,
                })

                $(datetimepickerRef.current).datetimepicker({
                    format: 'L',
                    defaultDate: saleLogData.sale_date
                  });
          
                  $(datetimepickerRef.current).on('change.datetimepicker', function (e) {
                      const formattedDate = new Date(e.date).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric'
                        });
                      setFormData(prevFormData => ({
                      ...prevFormData,
                      sale_date: formattedDate
                      }));
                  });

            }catch(error){
                console.log(error)
            }
            
        }

        fetchSaleLog();

        // if (datetimepickerRef.current) {

        //   return () => {
        //     $(datetimepickerRef.current).datetimepicker('destroy');
        //   };
        // }

      }, []);
  
      const handleEditSaleLog = async(e) => {
  
          e.preventDefault()
  
          try{
              setErrors({})
              const response = await axios.put(`/api/sale_logs/${id}`, {...formData, saleLogProducts});
              successNotify(response.data.success)
            //   navigate('/sale_logs')
          }catch(error){
              const errorMsg = error.response.data
              setErrors(errorMsg.errors)
              errorNotify(`warning! ${errorMsg.message}`)
          }
  
      }
  
      const openAddModal = () => {
          setShowModal(true)
      }
  
      const closeAddModal = () => {
  
          setShowModal(false)
          
      }
  
      const handleAddProduct = (newProduct) => {
  
          setSaleLogProducts(prevProducts => [...prevProducts, newProduct]);
          setShowModal(false)
      }
  
      const handleRemoveProduct = (indexToRemove) => {
  
          const updatedSaleLogProducts = [...saleLogProducts];
  
          updatedSaleLogProducts.splice(indexToRemove, 1);
  
          setSaleLogProducts(updatedSaleLogProducts);
      };
  return (
    <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Edit Frozens</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary">
                        <form onSubmit={handleEditSaleLog}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label htmlFor="customer_name">Customer Name</label>
                                        <input type="text" name="customer_name" className={`form-control ${errors.customer_name && 'error-input'}`} value={formData.customer_name} onChange={handleChange} id="customer_name" autoComplete='off' />
                                        {errors.customer_name && errors.customer_name.map((msg, index) => (
                                            <span key={index} className='error-msg'>{msg}</span>
                                        ))}
                                    </div>


                                    <div className="col-6 form-group">
                                        <label htmlFor="sale_date">Date</label>
                                        <input type="text" name='sale_date' className={`form-control datetimepicker-input ${errors.sale_date && 'error-input'}`} id="datetimepicker" data-toggle="datetimepicker" data-target="#datetimepicker" ref={datetimepickerRef}  autoComplete='off'/>
                                        {errors.sale_date && errors.sale_date.map((msg, index) => (
                                            <span key={index} className='error-msg'>{msg}</span>
                                        ))}
                                    </div>
                                    
                                </div>

                                
                                <div className="clearfix mt-5">
                                    <hr></hr>
                                </div>
                                <div className="row pb-2">
                                    <div className="col">
                                        <button type="button" className="btn btn-primary" onClick={openAddModal}>
                                            Add Product
                                        </button>
                                    </div>
                                </div>

                                <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th style={{width: 10}}>#</th>
                                            <th>Frozen</th>
                                            <th>price</th>
                                            <th className='text-center' style={{width: '150px'}}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {saleLogProducts.length > 0 && (saleLogProducts.map((saleLogProduct, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{saleLogProduct.product}</td>
                                                <td>{saleLogProduct.price}</td>
                                                <td className='text-center'>
                                                    <div className="row justify-content-around">

                                                        {/* <Link to={`/sale_logs/view/${saleLogProduct.id}`} className='btn btn-sm btn-info'><i className="fas fa-eye"></i></Link>
                                                        <Link to={`/sale_logs/edit/${saleLogProduct.id}`} className='btn btn-sm btn-warning'><i className="fas fa-edit"></i></Link> */}
                                                        <button onClick={() => handleRemoveProduct(index)} className='btn btn-sm btn-danger'><i className="fas fa-trash-alt"></i></button>

                                                    </div>
                                                </td>
                                            </tr>
                                        )))
                                        }
                                        {saleLogProducts.length === 0 &&(
                                            <tr>
                                                <td colSpan={12} className='text-center text-bold'>No Data Available!</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>


                            </div>
                            <div className="card-footer text-right">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            <AddProduct title="Add Product" isOpen={showModal} handleClose={closeAddModal} handleAddSaleProduct={handleAddProduct} modalId='add-product'/>
            {showModal && (
                <div className='modal-backdrop fade show' onClick={closeAddModal}></div>
            )}

        </div>
  )
}

export default edit