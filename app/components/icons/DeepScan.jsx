import React from 'react';

const DeepScan = ({ className, ...props }) => {
  // The primary color for the icon, converted from oklch to a hex value for broader SVG compatibility.
  const primaryColor = "#1279cf"; 
  // A secondary color for the animated electrons.
  const secondaryColor = "#fed739";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      className={className}
      {...props}
    >
      {/* Defines the elliptical path for the electrons to follow.
          This path is hidden and only used for the animation reference.
      */}
      <defs>
        <path
          id="orbit-path"
          d="M12,12 m-10,0 a10,4.5 0 1,0 20,0 a10,4.5 0 1,0 -20,0"
          fill="none"
        />
      </defs>

      {/* Central nucleus of the atom */}
      <circle cx="12" cy="12" r="2.5" fill={primaryColor} stroke="none" />

      {/* Electron orbits, styled with the new primary color */}
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.5"
        stroke={primaryColor}
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.5"
        stroke={primaryColor}
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.5"
        stroke={primaryColor}
        transform="rotate(120 12 12)"
      />

      {/* Electrons orbiting the nucleus.
          Each electron is animated to move along the defined 'orbit-path'.
          The parent group is rotated to match the visual orbit lines.
      */}
      <g>
        <circle r="1.5" fill={secondaryColor} stroke="none">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href="#orbit-path" />
          </animateMotion>
        </circle>
      </g>
      <g transform="rotate(60 12 12)">
        <circle r="1.5" fill={secondaryColor} stroke="none">
          <animateMotion dur="4s" repeatCount="indefinite" begin="-1.33s">
            <mpath href="#orbit-path" />
          </animateMotion>
        </circle>
      </g>
      <g transform="rotate(120 12 12)">
        <circle r="1.5" fill={secondaryColor} stroke="none">
          <animateMotion dur="4s" repeatCount="indefinite" begin="-2.66s">
            <mpath href="#orbit-path" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
};

export default DeepScan;
