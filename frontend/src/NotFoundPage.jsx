// NotFoundPage.js

import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1>404 - Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <img src="https://cdn.dribbble.com/users/1138875/screenshots/4669703/404_animation.gif" alt="404 Not Found" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
