'use client';
import React from 'react';

export default function Scroll() {


  return (
    <div>
      <button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
          padding:'7px 13px',
          fontSize: '0.8rem',
          backgroundColor: 'white',
          cursor:'pointer',
          border:'1px solid blue',
          borderRadius:'5px'
        }}
      >
       Back to top
      </button>
    </div>
  );
}
