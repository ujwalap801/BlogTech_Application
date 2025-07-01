import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserAuthorContextObj } from "../../contexts/UserAuthorContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import { MdArrowBack } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { useForm } from "react-hook-form";
import axios from 'axios'

const ArticleByID = () => {
  const { state } = useLocation();
  //console.log(state); //state from article.jsx while navigating

  const { getToken } = useAuth();
  const { currentUser } = useContext(UserAuthorContextObj);
  const [editStatus, setEditStatus] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [currentArticle, setCurrentArticle] = useState(state);
  const [commentStatus, setCommentStatus] = useState('');

  // function to change edit status of article
  function enableEdit() {
    setEditStatus(true);
  }


  // TO SAVE MODIFIED ARTICLE
  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...state, ...modifiedArticle };
    console.log(articleAfterChanges);
    // GET JWT TOKEN
    const token = await getToken();
    const currentDate = new Date();
    // add date of modification
    articleAfterChanges.dateOfModification = currentDate.getDate() + "-"
      + (currentDate.getMonth() + 1) + "-"
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true })

    // console.log(articleAfterChanges);

    // make http post req
    let res = await axios.put(`https://blogtech-backend.onrender.com/author-api/article/${articleAfterChanges.articleId}`, articleAfterChanges, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data.message === 'article modified') {

      // change edit article status to false
      setEditStatus(false);
      // console.log(`${state.articleId}`);
      navigate(`/author-profile/articles/${state.articleId}`, { state: res.data.payload });

    }


  }



  // ADD A COMMENT BY USER
  async function addComment(commentObj) {
    //add name of user to commentObj
    commentObj.nameOfUser = currentUser.firstName;
    // console.log(commentObj);

    // http put
    let res = await axios.put(`https://blogtech-backend.onrender.com/user-api/comment/${currentArticle.articleId}`, commentObj);
    // if(res.data.message === "comment added")
    // {
    //       setCommentStatus(res.data.message);
    // }


    if (res.data.message === "comment added") {
      // Show status message
      setCommentStatus("✅ Comment added!");

      // Update comments in the UI
      setCurrentArticle(res.data.payload); // updated article with new comment

      // Clear input field
      reset();

      // Auto-hide the message
      setTimeout(() => {
        setCommentStatus("");
      }, 2000);
    }
  }



  // DELETE ARTICLE
  async function deleteArticle() {
    state.isArticleActive = false;
    // GET JWT TOKEN
    const token = await getToken();
    let res = await axios.put(`https://blogtech-backend.onrender.com/author-api/articles/${state.articleId}`, state, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload);
    }

  }

  // RESTORE ARTICLE
  async function restoreArticle() {
    state.isArticleActive = true;
    const token = await getToken();
    let res = await axios.put(`https://blogtech-backend.onrender.com/author-api/articles/${state.articleId}`, state, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload);
    }
  }




  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={() => navigate(`/author-profile/${currentUser.role}/articles`)}
        >
          <MdArrowBack size={20} />
          Back to Articles
        </button>
      </div>

      {
        editStatus === false ?
          <>
            {/* ARTICLE HEADER WITH AUTHOR */}
            <div className="border rounded p-3 mb-4">
              <div className="row align-items-start">

                {/* LEFT: Author Info + Dates */}
                {/* LEFT: Author Info + Dates */}
                <div className="col-12 col-md-6 d-flex mb-3 mb-md-0 align-items-center">
                  {state.authorData.profileImageUrl ? (
                    <img
                      src={state.authorData.profileImageUrl}
                      alt="Author"
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                    />
                  ) : (
                    <FaUserCircle size={60} className="me-3 text-secondary" />
                  )}

                  <div>
                    <h5 className="mb-0">{state.authorData.nameOfAuthor || "Unknown Author"}</h5>
                    <small className="text-muted">Author</small>
                    <div className="text-muted small mt-2">
                      <b>Article Created:</b> {state.dateOfCreation} <br />
                      <b>Article Modified:</b> {state.dateOfModification}
                    </div>
                  </div>
                </div>




                {/* RIGHT: Title + Action Buttons */}
                <div className="col-12 col-md-6 text-md-end">
                  <h4 className="text-primary mb-2">{state.title}</h4>

                  {currentUser.role === "author" && (
                    <div className="d-flex justify-content-md-end flex-wrap gap-2">
                      <button className="btn btn-sm btn-outline-warning d-flex align-items-center" onClick={enableEdit}>
                        <FaEdit className="me-1" />
                        Edit
                      </button>
                      {state.isArticleActive ? (
                        <button className="btn btn-sm btn-outline-danger d-flex align-items-center" onClick={deleteArticle}>
                          <MdDelete className="me-1" />
                          Delete
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-outline-info d-flex align-items-center" onClick={restoreArticle}>
                          <MdRestore className="me-1" />
                          Restore
                        </button>
                      )}
                    </div>
                  )}
                </div>



              </div>



            </div>

            {/* ARTICLE CONTENT */}
            <div className="border rounded p-3 mb-4">
              <p className="lead fw-bold">Content</p>

              <p className="lead">{state.content}</p>

            </div>

            {/* COMMENTS SECTION */}
            {/* <div className="border rounded p-3 mb-4">
              <h5 className="mb-3">💬 Comments</h5>
              {state.comments.length === 0 ? (
                <p className="text-muted">No comments yet.</p>
              ) : (
                <div className="list-group">
                  {state.comments.map((commentObj) => (
                    <div key={commentObj._id} className="list-group-item">
                      <strong>{commentObj?.nameOfUser}</strong>
                      <p className="mb-1">{commentObj?.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            {/* COMMENTS SECTION */}
            <div className="border rounded p-3 mb-4">
              <h5 className="mb-3">💬 Comments</h5>
              {currentArticle.comments.length === 0 ? (
                <p className="text-muted">No comments yet.</p>
              ) : (
                <div className="list-group">
                  {currentArticle.comments.map((commentObj) => (
                    <div key={commentObj._id} className="list-group-item">
                      <strong>{commentObj?.nameOfUser}</strong>
                      <p className="mb-1">{commentObj?.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* COMMENT FORM */}
            {commentStatus && (
              <div className="alert alert-success text-center py-2" role="alert">
                {commentStatus}
              </div>
            )}

            {currentUser.role === 'user' && (
              <form className="mt-4 p-4 rounded shadow bg-light" onSubmit={handleSubmit(addComment)} >
                <div className="mb-3">
                  <label htmlFor="commentInput" className="form-label fw-semibold">
                    Add your comment here
                  </label>
                  <input
                    type="text"
                    id="commentInput"
                    {...register("comment")}
                    className="form-control"
                    placeholder="Write something..."
                    autoComplete="off"

                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Comment
                </button>
              </form>
            )}

          </> :
          // FormEdit

          <form onSubmit={handleSubmit(onSave)}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                defaultValue={state.title}
                {...register("title")}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="form-label">
                Select a category
              </label>
              <select
                {...register("category")}
                id="category"
                className="form-select"
                defaultValue={state.category}
              >
                <option value="Java Full Stack">Java Full Stack</option>
                <option value="Web Developer">Web Developer</option>
                <option value="AIML">AIML</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                {...register("content")}
                className="form-control"
                id="content"
                rows="10"
                defaultValue={state.content}
              ></textarea>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>


      }


    </div>


  );

};

export default ArticleByID;
