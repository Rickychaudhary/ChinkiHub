"use client";
import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  // Log error details to the console
  console.error(err);

  return { statusCode };
};

export default ErrorPage;
