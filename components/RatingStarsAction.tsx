import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
    initialRating?: number;
    maxStars?: number;
    onRatingChange?: (rating: number) => void;
    size?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
    initialRating = 0,
    maxStars = 5,
    onRatingChange,
    size = 30,
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (index: number) => {
        setRating(index);
        onRatingChange?.(index);
    };

    const handleMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="flex" onMouseLeave={handleMouseLeave}>
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (hoverRating || rating);
                return (
                    <Star
                        key={index}
                        size={size}
                        className={`cursor-pointer transition-colors duration-200 ${isFilled ? 'fill-current' : ''
                            }`}
                        style={{
                            color: isFilled ? '#FFD700' : '#999999ff',
                            opacity: isFilled ? 1 : 0.4,
                        }}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                    />
                );
            })}
        </div>
    );
};
export default RatingStars;