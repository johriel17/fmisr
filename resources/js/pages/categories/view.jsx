import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

const view = () => {
    const {id} = useParams()
    const [category, setCategory] = useState({})

    useEffect(() => {

        const fetchCategory = async() => {

            try{
                const response = await axios.get(`/api/categories/${id}`)
                setCategory(response.data)
            }catch(error){
                console.log(error)
            }

        }

        fetchCategory()

    }, [])
    
    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>View Category</h1>
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
                                        <p className="text-lg text-uppercase font-weight-bold">{category.name}</p>
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
