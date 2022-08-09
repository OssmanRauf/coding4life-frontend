import Link from "next/link"
const SuperAdminUserCard = ({ user, handleShowModal, setDeleteId }) => {
  return (
    <div>
      <div style={{ marginTop: "25px" }} className="card sa-users-card">
        <div className="card-body">
          <Link href={`/profile/${user.username}`}>
            <a style={{ textDecoration: "none" }}>
              <h5 className="card-title">{user.username}</h5>
            </a>
          </Link>
          <p
            className="card-title"
            style={{ fontWeight: "500", fontsize: "20px" }}
          >
            Email: {user.email}
          </p>

          {user.description ? (
            <p className="card-text"> {user.description}</p>
          ) : (
            <p className="card-text text-danger">User doesn't have a bio</p>
          )}

          <div className="admin-btn-post">
            <button
              className="btn btn-danger"
              onClick={() => {
                {
                  handleShowModal()
                  setDeleteId(user.id)
                  console.log("delete activated", user.id)
                }
              }}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminUserCard
