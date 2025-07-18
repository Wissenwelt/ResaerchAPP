import React from 'react';

const AnimatedLogoIcon = ({ className, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-200 -200 400 400" className={className} {...props}>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="10"/>
        </filter>
        <filter id="pipe-effect" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0866FF" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* Animated Logo Content */}
      <g transform="rotate(0)">
        {/* Pulse Animation */}
        {/* FIX: Changed dur from "2s" to "1s" for faster pulse */}
        <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="1s" repeatCount="indefinite"/>
        
        {/* Perpetual Spin Animation */}
        {/* FIX: Changed dur from "3s" to "1.5s" for faster rotation */}
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="1.5s" repeatCount="indefinite" additive="sum"/>

        {/* Logo Geometry */}
        <g filter="url(#pipe-effect)">
          {/* Central Vertical Line */}
          <line x1="0" y1="-130" x2="0" y2="130" stroke="#0866FF" strokeWidth="3" strokeLinecap="round">
            <animate attributeName="stroke-width" values="3;5;3" dur="1s" repeatCount="indefinite"/>
          </line>

          {/* W Patterns (4 rotations) */}
          <g transform="rotate(0)">
            <path d="M -95,95 L -71,0 L -35,71 L 0,0 L 35,71 L 71,0 L 95,95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
            <path d="M -95,-95 L -71,0 L -35,-71 L 0,0 L 35,-71 L 71,0 L 95,-95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
          </g>
          <g transform="rotate(90)">
            <path d="M -95,95 L -71,0 L -35,71 L 0,0 L 35,71 L 71,0 L 95,95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
            <path d="M -95,-95 L -71,0 L -35,-71 L 0,0 L 35,-71 L 71,0 L 95,-95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
          </g>
          <g transform="rotate(180)">
            <path d="M -95,95 L -71,0 L -35,71 L 0,0 L 35,71 L 71,0 L 95,95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
            <path d="M -95,-95 L -71,0 L -35,-71 L 0,0 L 35,-71 L 71,0 L 95,-95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
          </g>
          <g transform="rotate(270)">
            <path d="M -95,95 L -71,0 L -35,71 L 0,0 L 35,71 L 71,0 L 95,95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
            <path d="M -95,-95 L -71,0 L -35,-71 L 0,0 L 35,-71 L 71,0 L 95,-95" fill="none" stroke="#0866FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-width" values="4;6;4" dur="1s" repeatCount="indefinite"/>
            </path>
          </g>

          {/* Center Elements */}
          <circle cx="0" cy="0" r="32" fill="none" stroke="#0866FF" strokeWidth="3">
            <animate attributeName="r" values="32;36;32" dur="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="0" r="10" fill="#0866FF">
            <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
    </svg>
  );
};

export default AnimatedLogoIcon;