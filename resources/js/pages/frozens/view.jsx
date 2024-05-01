import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

const view = () => {
    const {id} = useParams()
    const [frozen, setFrozen] = useState({})

    useEffect(() => {

        const fetchFrozen = async() => {

            try{
                const response = await axios.get(`/api/frozens/${id}`)
                setFrozen(response.data)
            }catch(error){
                console.log(error)
            }

        }

        fetchFrozen()

    }, [])
    
    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>View Frozen</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-2">
                                <div className="row ml-2">
                                    <div className="col-md-2">
                                        <p className="text-lg text-uppercase">Name :</p>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="text-lg text-uppercase font-weight-bold">{frozen.name}</p>
                                    </div>
                                </div>
                                <div className="row ml-2">
                                    <div className="col-md-2">
                                        <p className="text-lg text-uppercase">Description :</p>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="text-lg text-uppercase font-weight-bold">{frozen.description}</p>
                                    </div>
                                </div>
                                <div className="row ml-2">
                                    <div className="col-md-2">
                                        <p className="text-lg text-uppercase">Amount :</p>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="text-lg text-uppercase font-weight-bold">{frozen.amount}</p>
                                    </div>
                                </div>
                                {frozen.category && (
                                    <div className="row ml-2">
                                        <div className="col-md-2">
                                            <p className="text-lg text-uppercase">Category :</p>
                                        </div>
                                        <div className="col-md-10">
                                            <p className="text-lg text-uppercase font-weight-bold">{frozen.category.name}</p>
                                        </div>
                                    </div>
                                )}
                                {frozen.brand && (
                                    <div className="row ml-2">
                                        <div className="col-md-2">
                                            <p className="text-lg text-uppercase">Brand :</p>
                                        </div>
                                        <div className="col-md-10">
                                            <p className="text-lg text-uppercase font-weight-bold">{frozen.brand.name}</p>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default view;
