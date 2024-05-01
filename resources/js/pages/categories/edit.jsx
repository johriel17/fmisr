import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const edit = () => {

    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const successNotify = (msg) => toast.success(msg);
    const errorNotify = (msg) => toast.error(msg);
    const {id} = useParams()

    useEffect(() => {

        const fetchCategory = async() => {

            try{
                const response = await axios.get(`/api/categories/${id}`)
                setName(response.data.name)
            }catch(error){
                console.log(error)
            }

        }
        fetchCategory()

    }, [])

    const handleEditCategory = async(e) => {

        e.preventDefault()

        try{
            setErrors({})
            const response = await axios.put(`/api/categories/${id}`, {name});
            successNotify(response.data.success)
            navigate('/categories')
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
                            <h1>Edit Categories</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary">
                        <form onSubmit={handleEditCategory}>
                            <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className={`form-control ${errors.name && 'error-input'}`} value={name} onChange={(e) => setName(e.target.value)} id="name" autoComplete='off' />
                                {errors.name && errors.name.map((msg, index) => (
                                    <span key={index} className='error-msg'>{msg}</span>
                                ))}
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