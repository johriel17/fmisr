import React, { useRef, useEffect} from 'react'

const DeleteConfirmation = ({title, name, isOpen, handleClose, handleConfirm, modalId}) => {

    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();        
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, handleClose]);
    
    return (
        <div id={modalId} className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <b>{name}</b> ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation