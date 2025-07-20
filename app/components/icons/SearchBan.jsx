import React from 'react';

const SearchBan = ({ className, active = false, ...props }) => {
  // The primary color for the icon when inactive (default blue with animation)
  const primaryColor = "#1279cf";
  
  // Dark color when active/selected
  const activeColor = "#000000";
  
  // Choose color based on active state (inverted logic)
  const iconColor = active ? activeColor : primaryColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      className={className}
      {...props}
    >
      {/* Globe/World representation */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke={iconColor} 
        strokeWidth="1.5" 
        fill="none"
      >
        {!active && (
          <animate
            attributeName="stroke-dasharray"
            values="0 57;28.5 28.5;0 57"
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      
      {/* Vertical longitude line */}
      <path 
        d="M12 3v18" 
        stroke={iconColor} 
        strokeWidth="1"
        opacity="0.7"
      />
      
      {/* Horizontal latitude lines */}
      <path 
        d="M3 12h18" 
        stroke={iconColor} 
        strokeWidth="1"
        opacity="0.7"
      />
      <path 
        d="M5.5 8.5h13" 
        stroke={iconColor} 
        strokeWidth="1"
        opacity="0.5"
      />
      <path 
        d="M5.5 15.5h13" 
        stroke={iconColor} 
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Curved longitude lines */}
      <path 
        d="M12 3c-2.5 0-4.5 4-4.5 9s2 9 4.5 9" 
        stroke={iconColor} 
        strokeWidth="1"
        opacity="0.6"
        fill="none"
      />
      <path 
        d="M12 3c2.5 0 4.5 4 4.5 9s-2 9-4.5 9" 
        stroke={iconColor} 
        strokeWidth="1"
        opacity="0.6"
        fill="none"
      />
      
      {/* Search magnifying glass integrated into globe */}
      <circle 
        cx="8.5" 
        cy="8.5" 
        r="2.5" 
        stroke={iconColor} 
        strokeWidth="1.5" 
        fill="none"
        opacity="0.8"
      >
        {!active && (
          <animate
            attributeName="r"
            values="2.5;3;2.5"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      
      {/* Search handle */}
      <path 
        d="m10.5 10.5l1.5 1.5" 
        stroke={iconColor} 
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Prohibition sign - X mark over the search */}
      <g>
        <line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          {!active && (
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          {!active && (
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.5s"
              begin="0.75s"
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>
      
      {/* Warning triangles around the globe when NOT active (default state) */}
      {!active && (
        <g opacity="0.6">
          <polygon
            points="12,1 13.2,3.5 10.8,3.5"
            fill={primaryColor}
            stroke={primaryColor}
            strokeWidth="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12 12;360 12 12"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon
            points="23,12 20.5,10.8 20.5,13.2"
            fill={primaryColor}
            stroke={primaryColor}
            strokeWidth="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12 12;360 12 12"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon
            points="12,23 10.8,20.5 13.2,20.5"
            fill={primaryColor}
            stroke={primaryColor}
            strokeWidth="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12 12;360 12 12"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon
            points="1,12 3.5,13.2 3.5,10.8"
            fill={primaryColor}
            stroke={primaryColor}
            strokeWidth="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12 12;360 12 12"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>
        </g>
      )}
      
      {/* Pulsing outer ring when NOT active (default state) */}
      {!active && (
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke={primaryColor}
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="9;12;9"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      
      {/* Digital glitch effect lines when NOT active (default state) */}
      {!active && (
        <g opacity="0.4">
          <line x1="4" y1="7" x2="8" y2="7" stroke={primaryColor} strokeWidth="1">
            <animate attributeName="opacity" values="0;1;0" dur="0.3s" repeatCount="indefinite" begin="0s"/>
          </line>
          <line x1="16" y1="11" x2="20" y2="11" stroke={primaryColor} strokeWidth="1">
            <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" begin="0.5s"/>
          </line>
          <line x1="6" y1="17" x2="10" y2="17" stroke={primaryColor} strokeWidth="1">
            <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" begin="1s"/>
          </line>
        </g>
      )}
    </svg>
  );
};

export default SearchBan;