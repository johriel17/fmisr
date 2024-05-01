import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const edit = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: "",
        error: {}
      });
    
    // const { name, description, amount, error } = formData;
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [errors, setErrors] = useState({})
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const navigate = useNavigate()
    const successNotify = (msg) => toast.success(msg);
    const errorNotify = (msg) => toast.error(msg);
    const {id} = useParams()

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedSize, setSelectedSize] = useState('')

    // Update handleChange function to handle changes in the select inputs
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setSelectedCategory(value);
        } else if (name === 'brand') {
            setSelectedBrand(value);
        } else if (name === 'size'){
            setSelectedSize(value)
        }
    };

    useEffect(() => {

        const fetchFrozen = async() => {

            try{
                const response = await axios.get(`/api/frozens/${id}`);
                console.log(response)
                setFormData({
                    ...formData,
                    name: response.data.name,
                    description : response.data.description,
                    amount : response.data.amount
                })
                setSelectedCategory(response.data.category_id)
                setSelectedBrand(response.data.brand_id)
                setSelectedSize(response.data.size)

            }catch(error){
                console.log(error)
            }

        }

        const selectCategories = async() => {
            try{
                const response = await axios.get(`/api/select?type=${'all-categories'}`);
                setCategories(response.data)
            }catch(error){
                console.log(error)
            }
        }
        const selectBrands = async() => {
            try{
                const response = await axios.get(`/api/select?type=${'all-brands'}`);
                setBrands(response.data)
            }catch(error){
                console.log(error)
            }
        }

        selectCategories();
        selectBrands();
        fetchFrozen();

    },[])

    const handleEditFrozen = async(e) => {

        e.preventDefault()

        try{
            setErrors({})
            const response = await axios.put(`/api/frozens/${id}`, {...formData, category_id : selectedCategory, brand_id : selectedBrand});
            successNotify(response.data.success)
            navigate('/frozens')
        }catch(error){
            const errorMsg = error.response.data
            setErrors(errorMsg.errors)
            errorNotify(`warning! ${errorMsg.message}`)
        }

    }
  return (
    <div>
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
                        <form onSubmit={handleEditFrozen}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="name">Name</label>
                                        <input id='name' name='name' value={formData.name} onChange={handleChange} type="text" className={`form-control ${errors.name && 'error-input'}`} autoComplete='off' />
                                        {errors.name && errors.name.map((msg, index) => (
                                            <span key={index} className='error-msg'>{msg}</span>
                                        ))}
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="description">Description</label>
                                        <input id='description' name='description' value={formData.description} onChange={handleChange} type="text" className={`form-control ${errors.description && 'error-input'}`} autoComplete='off' />
                                        {errors.description && errors.description.map((msg, index) => (
                                            <span key={index} className='error-msg'>{msg}</span>
                                        ))}
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input id='amount' name='amount' value={formData.amount} onChange={handleChange} type="text" className={`form-control ${errors.amount && 'error-input'}`} autoComplete='off' />
                                        {errors.amount && errors.amount.map((msg, index) => (
                                            <span key={index} className='error-msg'>{msg}</span>
                                        ))}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Size</label>
                                            <select name='size' value={selectedSize} onChange={handleSelectChange} className={`form-control ${errors.size && 'error-input'}`}>
                                            <option value="">Select Category</option>
                                            <option value="1 kg">1 Kilogram</option>
                                            <option value="1/2 kg">1/2 Kilograam</option>
                                            <option value="1/4 kg">1/4 Kilogram</option>
                                            </select>
                                            {errors.size && errors.size.map((msg, index) => (
                                                <span key={index} className='error-msg'>{msg}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select name='category' value={selectedCategory} onChange={handleSelectChange} className={`form-control ${errors.category_id && 'error-input'}`}>
                                            <option value="">Select Category</option>
                                            {categories && categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                            </select>
                                            {errors.category_id && errors.category_id.map((msg, index) => (
                                                <span key={index} className='error-msg'>{msg}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <select name='brand' value={selectedBrand} onChange={handleSelectChange} className={`form-control ${errors.brand_id && 'error-input'}`}>
                                            <option value="">Select Brand</option>
                                            {brands && brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            ))}
                                            </select>
                                            {errors.brand_id && errors.brand_id.map((msg, index) => (
                                                <span key={index} className='error-msg'>{msg}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                            <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
  )
}

export default edit