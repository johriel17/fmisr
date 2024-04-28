import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { toast } from 'react-toastify'
import DeleteConfirmation from '../../components/modals/DeleteConfirmation'

const index = () => {

    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const [noData, setNoData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const successNotify = (msg) => toast.error(msg);
    const errorNotify = (msg) => toast.warning(msg);

    const [showModal, setShowModal] = useState(false);
    const [deleteBrand, setDeleteBrand] = useState({});


    const fetchBrands = async () => {
        setLoading(true)
        try{
            const response = await axios.get(`/api/brands?page=${currentPage}&search=${searchQuery}`);

            setBrands(response.data.data.data)
            setNoData(response.data.data.data.length === 0)
            setCurrentPage(response.data.data.current_page)
            setTotalPages(response.data.data.last_page)
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchBrands();

    }, [currentPage])

    const goToPage = (page) => {
        setCurrentPage(page);
    };


    const handleSearch = async(e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const response = await axios.get(`/api/brands?page=${currentPage}&search=${searchQuery}`)
            setBrands(response.data.data.data)
            setNoData(response.data.data.data.length === 0)
            setCurrentPage(response.data.data.current_page)
            setTotalPages(response.data.data.last_page)
            setLoading(false)
            setCurrentPage(1);
        }catch(error){
            console.log(error)
            setLoading(false)
        }

    }

    const openDeleteModal = (brand) => {
        setDeleteBrand(brand);
        setShowModal(true);
    };

    const closeDeleteModal = () => {
        setShowModal(false);
        setDeleteBrand({});
    };

    const handleDelete = async () => {

        try{
            const response = await axios.delete(`/api/brands/${deleteBrand.id}`);
            successNotify(`${response.data.name} has been deleted`)
            console.log(response.data)
            closeDeleteModal()
            fetchBrands()
        }catch(error){
            console.log(error)
            errorNotify('Somthing went wrong!')
        }

    }


  return (
    <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Brands</h1>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-grow spinner-size" role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ):
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-3">
                                                <Link to='/brands/add' className='btn btn-primary btn-md'><i className="fas fa-plus"></i> Add Brand</Link>
                                            </div>
                                            <div className="col-9">
                                                <div className="row justify-content-end">
                                                    <div className="card-tools"> 
                                                        <form onSubmit={handleSearch}>
                                                        <div className="input-group input-group-md" style={{width: 150}}>
                                                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} name="table_search" autoComplete='off' className="form-control" placeholder="Search" />
                                                                <div className="input-group-append">
                                                                    <button type="submit" className="btn btn-default">
                                                                    <i className="fas fa-search" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                </div>
                                            </div>
                                        </div>                        
                                    </div>
                                </div>

                                    <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th style={{width: 10}}>#</th>
                                            <th>Name</th>
                                            <th className='text-center' style={{width: '150px'}}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {brands.length > 0 && (brands.map((brand, index) => (
                                            <tr key={brand.id}>
                                                <td>{(currentPage - 1) * 10 + index + 1}</td>
                                                <td>{brand.name}</td>
                                                <td className='text-center'>
                                                    <div className="row justify-content-around">

                                                        <Link to={`/brands/view/${brand.id}`} className='btn btn-sm btn-info'><i className="fas fa-eye"></i></Link>
                                                        <Link to={`/brands/edit/${brand.id}`} className='btn btn-sm btn-warning'><i className="fas fa-edit"></i></Link>
                                                        <button onClick={() => openDeleteModal(brand)} className='btn btn-sm btn-danger'><i className="fas fa-trash-alt"></i></button>

                                                    </div>
                                                </td>
                                            </tr>
                                        )))
                                        }
                                        {noData && (
                                            <tr>
                                                <td colSpan={12} className='text-center text-bold'>No Data Available!</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    </div>
                                    <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            }
            <DeleteConfirmation title="Delete Brand" name={deleteBrand.name} isOpen={showModal} handleClose={closeDeleteModal} handleConfirm={handleDelete} modalId='delete-brand'/>
            {showModal && (
                <div className='modal-backdrop fade show' onClick={closeDeleteModal}></div>
            )}
        </div>
  )
}

export default index