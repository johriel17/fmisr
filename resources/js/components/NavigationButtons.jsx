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
    <div>
        <button className='btn btn-info' onClick={goBack}><i className="fas fa-backward"></i></button>
    </div>
    <div className='clearfix mx-2'></div>
    <div>
        <button className='btn btn-warning' onClick={goForward}><i className="fas fa-forward"></i></button>
    </div>
        
    </>
  )
}

export default NavigationButtons