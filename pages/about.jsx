import styles from "../styles/about.module.css"
import creator from "../public/creator.png"
import Head from "next/head"
import GoogleAds from "../components/GoogleAds"
import Image from "next/image"
const About = () => {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="about, Coding4Life, coding4life, about coding4lif, About"
        />
        <meta
          name="description"
          content="Coding4Life everything about coding in one place, Coding4Life is a blog just like DEV or Medium that aims to bring you
            the best content for coding, software engineering and more"
        />
        <title>About</title>
      </Head>
      <div className={styles.about}>
        <h1 className={styles.about_title}>
          Welcome to Coding4Life <span>&#128512;</span>
        </h1>
        <div className={`${styles.red} ${styles.sections}`}>
          <p>
            Coding4Life is a blog just like DEV or Medium that aims to bring you
            the best content for coding, software engineering and more...
          </p>
        </div>
        <div className={`${styles.purple} ${styles.sections}`}>
          <p>
            <b>
              But Why? <span>&#128533;</span>
            </b>
          </p>
          <p>
            Well being a developer means that you will have to learn constantly
            and be aware of new features and technologies as a way to improve
            yourself(and to be honest:
            <b>
              <i> to not be left behind new opportunities</i>
            </b>
            ), Coding4Life can make that a little bit easier.
          </p>
          <p>
            In our Blog we are not limited to one or two developers knowledge
            and experience because Coding4Life is not designed to be a private
            blog but a public blog where all of us can participate in, and give
            our knowledge and experience to the new developers coming in the
            industry.
          </p>
        </div>
        <div className={`${styles.green} ${styles.sections}`}>
          <p>
            <b>What is Coding4Life&apos;s purpose?</b>
          </p>
          <p>
            Our goal is to provide information and motivation to all developers
            especially the ones getting started <span>&#128521;</span>.
          </p>
          <p>
            If you are a developer with experience you know that keeping
            yourself in touch with new technologies is the best way to improve
            your knowledge.
          </p>
        </div>
        <div className={`${styles.orange} ${styles.sections}`}>
          <p>
            <b>Is it free?</b>
          </p>
          <p>
            <b>Yes</b> it&apos;s totally free to read or write articles you
            don&apos;t need to pay for anything but to pay for our servers and
            domain we added ads so that we can generate some revenue to maintain
            the blog up and running.
          </p>
        </div>
        <div className={`${styles.sections} ${styles.brown}`}>
          <p>
            <b>Alright how do i get started?</b>
          </p>
          <p>
            First you need to create an account and login, after that choose
            myprofile in the navigation bar and complete your information and
            wait for the approval of your request until that enjoy the content
            already available.
          </p>
          <p>
            If you have any questions, comments or suggestions to improve our
            blog, please put an issue on our <a href="">Github repository</a>,
            contact us on our social media or be a developer and make your own
            changes and pull a request on our repository we&apos;ll take a look
            and get to you soon <span>&#128517;</span>.
          </p>
        </div>
        <div>
          <h3>A little bit about the creator of Coding4Life</h3>
          <div className={`${styles.sections} ${styles.blue}`}>
            <p>
              <b>Who is Ossman Rauf?</b>
            </p>
            <p>
              Ossman Rauf is a software developer/web developer and the creator
              of Coding4Life.
            </p>

            <div className={`${styles.creators}`}>
              {/* <span style={{ borderRadius: "50px" }}> */}
              <Image
                style={{ borderRadius: "50px" }}
                width="500px"
                height="500px"
                src={creator.src}
                alt=""
              />
              {/* </span> */}
              <p style={{ paddingLeft: "15px" }}>
                Ossman Rauf wanted to create a blog from scratch to share
                information and help others with his knowledge and on the
                development of his blog he decided to make it that anyone can
                use his blog and leave his knowledge to others, that&apos;s when
                Coding4Life come into life.
              </p>
            </div>
            <div className={styles.social}>
              <p>Ossman Rauf&apos;s social media: </p>

              <div className={styles.social_icon}>
                <a
                  href="https://www.instagram.com/ossman786/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "red" }}
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
                  href="https://github.com/thebossmanlab"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black" }}
                >
                  <Image
                    // layout="fill"
                    height="30px"
                    src="/github.svg"
                    alt=""
                    width="30px"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoogleAds currentPath={"aboutPage"} />
    </>
  )
}

export default About
