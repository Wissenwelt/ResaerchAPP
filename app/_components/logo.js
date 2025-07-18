import React from 'react';

/**
 * This component renders the Victus AI SVG logo.
 * It's designed to be styled via a className passed in as a prop.
 * The SVG uses 'currentColor' for its stroke and fill, so changing the
 * text color of this component will change the color of the logo.
 */
const Logo = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 440 100"
      // The className is passed from the parent, allowing for dynamic styling (e.g., hover effects)
      className={className}
      {...props}
    >
      {/* The original SVG content is placed here.
        I have removed the embedded <style> tag, as styling will now be handled by Tailwind.
        All 'stroke' and 'fill' attributes are set to 'currentColor', so they inherit the
        color from the parent element's text color.
      */}
      <g>
        <g id="logo-icon" transform="translate(55, 50) scale(0.35)">
          <line x1="0" y1="-130" x2="0" y2="130" stroke="currentColor" strokeWidth="4" />
          <g id="w-pattern">
            <path d="M -95,95 L -71,0 L -35,71 L 0,0 L 35,71 L 71,0 L 95,95" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            <path d="M -95,-95 L -71,0 L -35,-71 L 0,0 L 35,-71 L 71,0 L 95,-95" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
          </g>
          <use href="#w-pattern" />
          <use href="#w-pattern" transform="rotate(90)" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle cx="0" cy="0" r="10" fill="currentColor" />
        </g>
        <text
          x="125"
          y="50"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="50"
          fontWeight="bold"
          fill="currentColor"
          dominantBaseline="middle"
        >
          Victus AI
        </text>
      </g>
    </svg>
  );
};

export default Logo;
