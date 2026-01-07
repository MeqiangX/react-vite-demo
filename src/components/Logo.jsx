import React from 'react';

const Logo = ({ className, style }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
    >
        <path
            d="M12 2L2 12L12 22L22 12L12 2Z"
            fill="#0052CC" // Using a nice Jira-like blue
            stroke="#0052CC"
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M12 6L6 12L12 18L18 12L12 6Z"
            fill="#2684FF" // Lighter blue inner
        />
    </svg>
);

export default Logo;
