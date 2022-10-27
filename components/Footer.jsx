import React from "react"
import Image from "next/image"
const Footer = () => {
  return (
    <div>
      <div className="my-5 mb-0">
        {/* <!-- Footer --> */}
        <footer
          className="text-center text-lg-start text-dark"
          style={{ backgroundColor: "#ECEFF1" }}
        >
          {/* <!-- Section: Social media --> */}
          <section
            className="d-flex justify-content-between p-4 text-white"
            style={{ backgroundColor: "#21D192" }}
          >
            {/* <!-- Left --> */}
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>
            {/* <!-- Left --> */}

            {/* <!-- Right --> */}
            <div>
              {/* <a href="" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a> */}
              <a
                href="https://www.instagram.com/coding4lifeblog/"
                target="_blank"
                rel="noreferrer"
                className="text-white me-4"
              >
                <Image
                  // layout="fill"
                  src="/instagram.svg"
                  alt=""
                  width="30px"
                  height="30px"
                />
              </a>
              <a
                href="https://github.com/OssmanRauf"
                target="_blank"
                rel="noreferrer"
                className="text-white me-4"
              >
                <Image
                  // layout="fill"
                  src="/github.svg"
                  alt=""
                  width="30px"
                  height="30px"
                />
              </a>
            </div>
            {/* <!-- Right --> */}
          </section>
          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Coding4Life</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <Image
                      // layout="fill"
                      src="/footer.png"
                      alt=""
                      width="150px"
                      height="100px"
                    />
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <i className="fas fa-home mr-3"></i> Nampula, Mozambique
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3"></i>
                    coding4lifeblog@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2022 Copyright:
            <a
              className="text-dark"
              style={{ margin: "10px" }}
              href="https://www.instagram.com/ossman786/"
              target="_blank"
              rel="noreferrer"
            >
              Ossman Rauf
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
