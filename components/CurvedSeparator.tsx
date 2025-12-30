import React from 'react';

interface CurvedSeparatorProps {
    color?: string;
    className?: string;
    flip?: boolean;
}

const CurvedSeparator: React.FC<CurvedSeparatorProps> = ({
    color = '#004E55',
    className = '',
    flip = false
}) => {
    return (
        <div className={`w-full overflow-hidden leading-none ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[60px] md:h-[100px]"
                style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    fill={color}
                    opacity="1"
                ></path>
            </svg>
        </div>
    );
};

export default CurvedSeparator;
