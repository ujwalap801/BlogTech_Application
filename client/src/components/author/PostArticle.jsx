import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useContext } from 'react';
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useNavigate } from 'react-router-dom';



const PostArticle = () => {

  const { currentUser } = useContext(UserAuthorContextObj);


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(articleFormData) {

    // CREATE ARTICLE OBJECT AS PER ARTICLE SCHEMA
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    }

    articleFormData.authorData = authorData;


    // Article id(timeStamp)
    articleFormData.articleId = Date.now();
    //  add data of creation and date of modification
    let currentDate = new Date();
    // DATE CREATION 
    let dateCreation = currentDate.getDate() + "-"
      + (currentDate.getMonth() + 1) + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })

    articleFormData.dateOfCreation = dateCreation;

    // DATE MODIFICATION
    let dateModification = currentDate.getDate() + "-"
      + (currentDate.getMonth() + 1) + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })

    articleFormData.dateOfModification = dateModification;

    // ADD COMMENTS ARRAY 
    articleFormData.comments = [];
    // ADD ARTICLE STATE
    articleFormData.isArticleActive = true;

    console.log("Submitted Article:", articleFormData);


    //  MAKE HTTP POST req TO CREATE NEW ARTICLE IN BACKEND
    let res = await axios.post("https://blogtech-backend.onrender.com/author-api/article", articleFormData);
    if (res.status === 201) {
      navigate(`/author-profile/${currentUser.role}/articles`);
      console.log("Redirecting to:", `/author-profile/${currentUser.role}/articles`);

    }
    else {
      // sET ERROR
    }
    alert("✅ Article submitted successfully!");
    reset(); // clear form
  };




  return (
    <div>

      <div className="container mt-5 mb-5 p-4 shadow rounded bg-white" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4 text-primary">📝 Write an Article</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Article Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              placeholder="Enter article title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-semibold">
              Select Category
            </label>
            <select
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              id="category"
              {...register("category", { required: "Category is required" })}
            >
              <option value="">-- Choose Category --</option>
              <option value="Java Full Stack">Java Full Stack</option>
              <option value="Web Developer">Web Developer</option>
              <option value="AIML">AIML</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>

          {/* Content */}
          <div className="mb-4">
            <label htmlFor="content" className="form-label fw-semibold">
              Article Content
            </label>
            <textarea
              className={`form-control ${errors.content ? "is-invalid" : ""}`}
              id="content"
              rows="6"
              placeholder="Write your article content here..."
              {...register("content", { required: "Content is required" })}
            ></textarea>
            {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4 py-2">
              🚀 Submit Article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostArticle;