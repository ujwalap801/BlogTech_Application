
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { FaUserCircle } from "react-icons/fa";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const token = await getToken();
      const res = await axios.get('https://blogtech-backend.onrender.com/author-api/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.message === "articles") {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Something went wrong while fetching articles.");
    }
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    if (selected === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article => article.category === selected);
      setFilteredArticles(filtered);
    }
  };

  const gotoArticleById = (articleObj) => {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  };

  return (
    <div className="container py-4">
      {/* Show error if exists */}
      {error && (
        <div className="alert alert-danger text-center fw-medium" role="alert">
          {error}
        </div>
      )}

      {/* Filter by Category */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label fw-semibold">Filter by Category:</label>
        <select
          className="form-select"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">-- All Categories --</option>
          <option value="Java Full Stack">Java Full Stack</option>
          <option value="Web Developer">Web Developer</option>
          <option value="AIML">AIML</option>
        </select>
      </div>

      {/* Display Articles */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {
          filteredArticles.map((articleObj) => (
            <div className="col" key={articleObj.articleId}>
              <div className="card h-100 shadow-sm border border-light-subtle rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">

                  {/* AUTHOR */}
                  {/* <div className="d-flex justify-content-end align-items-center mb-3">
                    <img
                      src={articleObj.authorData.profileImageUrl}
                      width="40"
                      height="40"
                      className="rounded-circle me-2 border"
                      alt="Author"
                    />
                    <small className="text-muted">
                      {articleObj.authorData.nameOfAuthor}
                    </small>
                  </div> */}


                  <div className="d-flex justify-content-end align-items-center mb-3">
                    {articleObj.authorData.profileImageUrl ? (
                      <img
                        src={articleObj.authorData.profileImageUrl}
                        width="40"
                        height="40"
                        className="rounded-circle me-2 border"
                        alt="Author"
                      />
                    ) : (
                      <FaUserCircle size={40} className="me-2 text-secondary" />
                    )}

                    <small className="text-muted">
                      {articleObj.authorData.nameOfAuthor || "Unknown Author"}
                    </small>
                  </div>

                  {/* TITLE & CONTENT */}
                  <div>
                    <h5 className="card-title fw-bold">{articleObj.title}</h5>
                    <p className="card-text text-secondary">
                      {articleObj.content.length > 80
                        ? articleObj.content.substring(0, 80) + "..."
                        : articleObj.content}
                    </p>
                  </div>

                  {/* READ MORE BUTTON */}
                  <div className="mt-3">
                    <button className="btn btn-primary w-100" onClick={() => gotoArticleById(articleObj)}>
                      Read More
                    </button>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="card-footer bg-white border-0">
                  <small className="text-muted">
                    Last updated on <span className="fw-semibold">{articleObj.dateOfModification}</span>
                  </small>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Articles;
