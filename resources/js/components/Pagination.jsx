import React from 'react'
const Pagination = ({ currentPage, totalPages, goToPage}) => {
  return (
    <div className="card-footer clearfix d-flex justify-content-center"> 
        <div className="row justify-content-center">
            <ul className="pagination pagination-md m-0">
                    <li className='page-item'>
                        <button disabled={currentPage === 1} className='page-link' onClick={() => goToPage(1)}>«</button>
                    </li>
                    <li className="page-item">
                        <button disabled={currentPage === 1} className='page-link' onClick={() => goToPage(currentPage - 1)}>&laquo;</button>
                    </li>
                    <li className="page-item">
                        <button onClick={() => goToPage(page)} className="page-link active">
                            <span className='active'>{currentPage}</span>
                        </button>
                    </li>
                    <li className="page-item">
                        <button disabled={currentPage >= totalPages} className='page-link' onClick={() => goToPage(currentPage + 1)}>&raquo;</button>
                    </li>
                    <li className="page-item">
                        <button disabled={currentPage === totalPages} className='page-link' onClick={() => goToPage(totalPages)}>»</button>
                    </li>
                </ul>   
            <div className='col-12 text-center'>
                <span className='text-xs font-thin'>page {currentPage} out of {totalPages}</span>
            </div> 
        </div>
        
    </div>
    
  )
}

export default Pagination