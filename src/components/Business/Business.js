import React from "react";
import "./Business.css";

// Start Stateless Functional Component
// add props as a parameter
// remove 'this'

const Business = ({ business }) => {
  const bgStyle = {
    backgroundImage: `url(${business.imageSrc})`
  };
  return (
    <div className="Business">
      <div className="Business-img" style={bgStyle} />
      <div className="Business-address">
        <h2>{business.name}</h2>
        <p>{business.address}</p>
        <p>
          {business.city}, {business.state}
        </p>
        <p>{business.zipCode}</p>
      </div>
      <div className="Business-category">
        <p>{business.category}</p>
      </div>
      <div className="Business-footer">
        <p className="Business-rating">{business.rating} stars</p>
        <p className="Business-reviews">{business.reviewCount} reviews</p>
      </div>
    </div>
  );
};

export default Business;
