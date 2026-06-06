import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Card } from "flowbite-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FoodCard = ({ card_detail, onClaimSuccess }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isHovered
      ? "translateY(0px) scale(1.05)"
      : "translateY(-10px) scale(1)",
    config: { tension: 300, friction: 20 },
  });

  const handleClaim = async () => {
    try {
      const response = await axios.delete(`/api/food/takefood/${card_detail._id}`, {
        withCredentials: true
      });
      console.log(response.data);
      toast.success("Food claimed successfully!");
      if (onClaimSuccess) {
        onClaimSuccess();
      }
    } catch (error) {
      console.error("Error claiming food:", error);
      toast.error(error.response?.data?.message || "Failed to claim food. Please login/try again.");
    }
  };

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
            <Button
              variant="contained"
              color="success"
              onClick={handleClaim}
              sx={{ mt: 2, borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
              fullWidth
            >
              Take Food
            </Button>
          </div>
        </div>
      </Card>
    </animated.div>
  );
};

export default FoodCard;