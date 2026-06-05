import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Card } from "flowbite-react";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
const Cards = ({ card_detail }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isHovered
      ? "translateY(0px) scale(1.05)"
      : "translateY(-10px) scale(1)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={springProps}
    >
      <Card className="max-w-sm rounded-xl shadow-lg">
        <img
          className="object-cover object-bottom h-60 w-full rounded-t-xl"
          src={card_detail.url}
          alt="Meaningful alt text for an image that is not purely decorative"
        />
        <div className="pb-6">
          <h5 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {card_detail.heading}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 my-4">
            {card_detail.text}
          </p>
          <Button
            sx={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }} // Green color
            variant="contained" 
          >
            <Link to={card_detail.link}>{card_detail.btn}</Link>  
          </Button>
        </div>
      </Card>
    </animated.div>
  );
};

export default Cards;
