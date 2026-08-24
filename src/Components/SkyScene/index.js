import React from 'react';
import './SkyScene.css';

const STARS = [
    { cx: 60, cy: 40, r: 1.6, delay: '0s' },
    { cx: 140, cy: 95, r: 1.1, delay: '1.2s' },
    { cx: 230, cy: 35, r: 1.8, delay: '2.4s' },
    { cx: 320, cy: 110, r: 1.2, delay: '0.6s' },
    { cx: 400, cy: 55, r: 1.4, delay: '3.1s' },
    { cx: 480, cy: 130, r: 1.6, delay: '1.8s' },
    { cx: 560, cy: 30, r: 1.1, delay: '2.9s' },
    { cx: 640, cy: 100, r: 1.9, delay: '0.3s' },
    { cx: 720, cy: 150, r: 1.2, delay: '2.1s' },
    { cx: 810, cy: 60, r: 1.5, delay: '1.5s' },
    { cx: 880, cy: 130, r: 1.1, delay: '3.6s' },
    { cx: 940, cy: 35, r: 1.7, delay: '0.9s' },
    { cx: 40, cy: 170, r: 1.3, delay: '2.6s' },
    { cx: 970, cy: 180, r: 1.2, delay: '1.1s' },
];

const SkyScene = () => (
    <div className="SkyScene" aria-hidden="true">
        <svg
            className="SkyScene-svg"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid slice"
        >
            <g className="SkyScene-stars">
                {STARS.map((star, index) => (
                    <circle
                        key={index}
                        cx={star.cx}
                        cy={star.cy}
                        r={star.r}
                        className="SkyScene-star"
                        style={{ animationDelay: star.delay }}
                    />
                ))}
            </g>
        </svg>
    </div>
);

export { SkyScene };
