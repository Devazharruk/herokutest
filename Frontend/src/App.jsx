import { useEffect, useState } from "react";
import React from "react";

const App = () => {
  const [data, setData] = useState([]);

  function fetchData() {
    fetch("http://localhost:3000/create")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (!data || data.length === 0) ? (
    <p className="text-5xl">No Users yet</p>
  ) : (
    data.map((val) => (
      <div className="wrapper" key={val._id}>
        <div className="img-area">
          <div className="inner-area">
            <img src={val.image} />
          </div>
        </div>
        <div className="icon arrow">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="icon dots">
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <div className="name">
          {val.name}
        </div>
        <div className="about">
          {val.email}
        </div>
        <div className="social-icons">
          <a href="#" className="fb">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="insta">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="yt">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="buttons">
          <button>Message</button>
          <button>Subscribe</button>
        </div>
        <div className="social-share">
          <div className="row">
            <i className="far fa-heart"></i>
            <i className="icon-2 fas fa-heart"></i>
            <span>20.4k</span>
          </div>
          <div className="row">
            <i className="far fa-comment"></i>
            <i className="icon-2 fas fa-comment"></i>
            <span>14.3k</span>
          </div>
          <div className="row">
            <i className="fas fa-share"></i>
            <span>12.8k</span>
          </div>
        </div>
      </div>
    ))
  );
};

export default App;
