import React from 'react'

const NavigationButtons = () => {

    const goBack = () => {
        window.history.back();
    };

    const goForward = () => {
        window.history.forward();
    };

  return (
    <>
    <div className='col-md-3 col-6'>
        <button className='btn btn-danger w-100' onClick={goBack}><i className="fas fa-backward"></i> BACK</button>
    </div>
    <div className='clearfix'></div>
    <div className='col-md-3 col-6'>
        <button className='btn btn-info w-100' onClick={goForward}>FORWARD <i className="fas fa-forward"></i></button>
    </div>
        
    </>
  )
}

export default NavigationButtons