import React from "react"

const ModalConfirmation = ({ closeModal, deleteUser }) => {
  return (
    <div className="full-container">
      <div
        className="custom-modal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteUser}
              >
                Delete user
              </button>
              <button onClick={closeModal} className="btn btn-primary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmation
