import React from "react"
import loading from "../public/loading.gif"
import { getDateInfo, info } from "../utils/tokens"
import styles from "../styles/adminRequestList.module.css"
import Link from "next/link"
const AdminRequestList = ({
  showLoading,
  adminRequest,
  acceptRequest,
  denyRequest,
}) => {
  return (
    <div>
      {showLoading ? (
        <div className={styles.full_container}>
          <img style={{ width: "20%" }} src={loading.src} />
        </div>
      ) : null}
      <div className={styles.admin_request_container}>
        <h3>Admin Requests</h3>
        <div className={styles.admin_requests}>
          {adminRequest.map((request) => {
            return (
              <div
                key={request.AdminRequest.id}
                className={`card mt-2 ${styles.request_card}`}
              >
                <div className="card-body">
                  <span className="card-head">
                    <Link href={`/profile/${request.User.username}`}>
                      <a
                        style={{
                          textDecoration: "none",
                          color: "black",
                          padding: 0,
                          margin: 0,
                          color: "black",
                        }}
                      >
                        <img
                          width="50"
                          src={`${info.baseUrl}/users/profile_pic/${request.User.username}`}
                          style={{ borderRadius: "50%" }}
                        />

                        <h5 className={`${styles.card_title}`}>
                          {request.User.username}
                        </h5>
                      </a>
                    </Link>
                    <p clasname={`${styles.request_card_date}`}>
                      {`${getDateInfo(request.AdminRequest.requested_at)}`}
                    </p>
                  </span>
                  {request.User.description ? (
                    <p className="card-text">{request.User.description}</p>
                  ) : (
                    <p className="card-text" style={{ color: "red" }}>
                      User does not have a Bio
                    </p>
                  )}
                </div>
                <div className={`${styles.request_btns}`}>
                  <button
                    onClick={() => {
                      acceptRequest(request.AdminRequest.id)
                    }}
                    className="btn btn-success"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      denyRequest(request.AdminRequest.id)
                    }}
                    className="btn btn-danger"
                  >
                    Deny
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminRequestList
