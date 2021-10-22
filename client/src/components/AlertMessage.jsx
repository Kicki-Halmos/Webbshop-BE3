import React from 'react';

export default function AlertMessage({ message }) {
  return (
    <>
      {message.status === 'success'
        ? (
          <div className="alert alert-success" role="alert">
            <p>{message.content}</p>
          </div>
        )
        : (
          <div className="alert alert-danger" role="alert">
            <p>{message.content}</p>
          </div>
        )}

    </>

  );
}
