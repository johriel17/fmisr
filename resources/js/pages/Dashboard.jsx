import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Dashboard = () => {

    const [salesOftheDay, setSalesOfTheDay] = useState(0)
    const [bestSeller, setBestSeller] = useState('')
    useEffect(() => {

        const fetchSalesOfTheDay = async() => {
            try{
                const response = await axios.get('/api/dashboard/sales');
                setSalesOfTheDay(response.data)
            }catch(error){
                console.log(error)
            }
        }

        const fetchBestSeller = async() => {
            try{
                const response = await axios.get('/api/dashboard/best_seller');
                setBestSeller(response.data)
            }catch(error){
                console.log(error)
            }
        }

        fetchSalesOfTheDay()
        fetchBestSeller()

        const pieChartCanvas = $('#pieChart')[0].getContext('2d');
        const pieData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['red', 'blue', 'yellow']
        }]
        };
        const pieOptions = {
        maintainAspectRatio: false,
        responsive: true
        };

        new Chart(pieChartCanvas, {
        type: 'pie',
        data: pieData,
        options: pieOptions
        });

    }, [])



  return (
    <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="small-box bg-info">
                                <div className="d-flex flex-column align-items-center">
                                    <p>Sales of the day</p>
                                    <h3>Php {salesOftheDay}</h3>
                                </div>
                                <Link to='sale_logs' className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="small-box bg-info">
                                <div className="d-flex flex-column align-items-center">
                                    <p>Best Seller</p>
                                    <h3>{bestSeller}</h3>
                                </div>
                                <Link to='frozens' className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                    <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Bordered Table
                                    </h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 10 }}>#</th>
                                                <th>Task</th>
                                                <th>Progress</th>
                                                <th style={{ width: 40 }}>
                                                    Label
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>Update software</td>
                                                <td>
                                                    <div className="progress progress-xs">
                                                        <div
                                                            className="progress-bar progress-bar-danger"
                                                            style={{
                                                                width: "55%",
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-danger">
                                                        55%
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2.</td>
                                                <td>Clean database</td>
                                                <td>
                                                    <div className="progress progress-xs">
                                                        <div
                                                            className="progress-bar bg-warning"
                                                            style={{
                                                                width: "70%",
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-warning">
                                                        70%
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3.</td>
                                                <td>Cron job running</td>
                                                <td>
                                                    <div className="progress progress-xs progress-striped active">
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            style={{
                                                                width: "30%",
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-primary">
                                                        30%
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4.</td>
                                                <td>Fix and squish bugs</td>
                                                <td>
                                                    <div className="progress progress-xs progress-striped active">
                                                        <div
                                                            className="progress-bar bg-success"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-success">
                                                        90%
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer clearfix">
                                    <ul className="pagination pagination-sm m-0 float-right">
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                «
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                »
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div class="card card-danger">
                            <div>
                            <div className="card-header">
                                <h3 className="card-title">Pie Chart</h3>
                                <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times" />
                                </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <canvas id="pieChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                    {/* /.container-fluid */}
                </div>
            </section>
            {/* /.content */}
        </div>
  )
}

export default Dashboard