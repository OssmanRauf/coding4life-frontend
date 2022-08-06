const Modal = ({ closeModal, addImage, deleteImage }) => {
  return (
    <div className="full-container">
      <div className="custom-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose new image</h5>
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
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={deleteImage}
              >
                Delete Image
              </button>
              <input
                id="profile-pic"
                type="file"
                onChange={(e) => {
                  addImage(e.target.files[0])
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="profile-pic" className="btn btn-primary">
                Add image
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
