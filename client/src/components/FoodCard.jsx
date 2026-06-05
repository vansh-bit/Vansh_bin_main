import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Card } from "flowbite-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const FoodCard = ({ card_detail }) => {
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
          className="object-cover h-60 w-full rounded-t-xl"
          src={card_detail.photo}
          alt="Meaningful alt text for an image that is not purely decorative"
        />
        <div className="pb-6">
          <h5 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {card_detail.title || "Title Here"}
          </h5>
          <div className="container">
            <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
              Description:- {card_detail.description}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
              Address:- {card_detail.address}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
              Pincode:- {card_detail.pincode}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-left">
              Contact No:- {card_detail.owner.mobileNo}
            </p>
          </div>
        </div>
      </Card>
    </animated.div>
  );
};

export default FoodCard;