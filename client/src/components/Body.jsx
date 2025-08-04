import Image from '../assets/Image.jpg';
import TechImage from '../assets/TechImage.jpg'
const Body = () => {
  return (

    <div className="container py-5">
      <div className="card shadow border-0 bg-light">
        <div className="row g-0 flex-column flex-md-row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 text-center">
            <img
              src={TechImage}
              alt="Kids with Technology"
              className="img-fluid rounded-start p-3"

            />
          </div>


          {/* Text Content */}
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-primary mb-3">Welcome to Tech Blog </h2>
              <p className="card-text text-muted fs-6">
                Join our vibrant tech community! Whether you're an <strong>author</strong> eager to share insights or a <strong>reader</strong> looking to explore articles, we've got you covered.
                <br /><br />
                <strong>Sign in</strong> or <strong>Sign up</strong> to access, publish, and engage with insightful tech content crafted by developers and enthusiasts like you.
              </p>
              <a href="/signin" className="btn btn-outline-primary mt-2">
                View Articles
              </a>
            </div>
          </div>



        </div>




      </div>
    </div>


  )
}

export default Body