import Link from "next/link"
const Index = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ padding: "25px 0 25px 0", margin: "auto" }}>
        Super admin options
      </h3>
      <div className="super-admin-index">
        <Link href="/super-admin/admin-requests">
          <button className="btn btn-success">Admin Requests</button>
        </Link>
        <Link href="/super-admin/users">
          <button className="btn btn-success">Users</button>
        </Link>
      </div>
    </div>
  )
}

export default Index
