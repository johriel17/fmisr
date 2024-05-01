import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

const view = () => {
    const {id} = useParams()
    const [saleLog, setSaleLog] = useState({})
    const [saleLogProducts, setSaleLogProducts] = useState([])

    useEffect(() => {

        const fetchSaleLog = async() => {

            try{
                const response = await axios.get(`/api/sale_logs/${id}`)
                setSaleLog(response.data)
                setSaleLogProducts(response.data.sale_log_products)
            }catch(error){
                console.log(error)
            }

        }

        fetchSaleLog()

    }, [])
    
    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>View Sale Log</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-2">
                                <div className="row mx-2">
                                    <div className="col-md-3">
                                        <p className="text-lg text-uppercase">Customer Name :</p>
                                    </div>
                                    <div className="col-md-9">
                                        <p className="text-lg text-uppercase font-weight-bold">{saleLog.customer_name}</p>
                                    </div>
                                </div>
                                <div className="row mx-2">
                                    <div className="col-md-3">
                                        <p className="text-lg text-uppercase">Sale Date :</p>
                                    </div>
                                    <div className="col-md-9">
                                        <p className="text-lg text-uppercase font-weight-bold">{saleLog.sale_date}</p>
                                    </div>
                                </div>
                                <div className="row mx-2">
                                    <div className="col-md-3">
                                        <p className="text-lg text-uppercase">Total Price :</p>
                                    </div>
                                    <div className="col-md-9">
                                        <p className="text-lg text-uppercase font-weight-bold">{saleLog.total_price}</p>
                                    </div>
                                </div>
                                <div className="clear-fix my-3">
                                    <hr></hr>
                                </div>
                                <div className="row mx-2">
                                    <div className="col">
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th style={{width: 10}}>#</th>
                                                <th>Frozen</th>
                                                <th>price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {saleLogProducts.length > 0 && (saleLogProducts.map((saleLogProduct, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{saleLogProduct.product}</td>
                                                    <td>{saleLogProduct.price}</td>
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
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default view;
