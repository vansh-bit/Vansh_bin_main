import { Container } from "postcss";
import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
// import "./Timeline.css"


const Timeliness = () => {
  return (
    <div>
      <h1 className=" text-blue-900 font-serif text-4xl md:text-6xl mb-5 font-bold leading-normal text-center mt-32"
      style={{ color: "#4285F4" }}>
        How to Reach Us
      </h1>
      <div className="container">
        <VerticalTimeline lineColor="#d3d3d3">
          <VerticalTimelineElement
            className="text-center"
            iconStyle={{ background: "#DB4437", color: "#fff" }}
            icon={<LoginIcon />}
          >
            <img src="" alt="" />
            <h2 className="text-xl font-bold mb-2">Login / SignUp</h2>
            <p className="text-md">
              Explore our user-friendly login and signup process to access
              exclusive features and stay connected with our platform providing
              your Details
            </p>
          </VerticalTimelineElement >
          <VerticalTimelineElement
            className="text-center"
            iconStyle={{ background: "#F2B50F", color: "#fff" }}
            icon={<FmdGoodRoundedIcon />}
          >
            <h2 className="text-xl font-bold mb-2">Enter the Location</h2>
            <p className="">
              Enter your location to get the list of all the food available
              nearby with defined distance and map.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="text-center"
            iconStyle={{ background: "#34A853", color: "#fff" }}
            icon={<FoodBankIcon />}
          >
            <h2 className="text-xl font-bold mb-2">
              Get or Post details of Food Nearby
            </h2>
            <p className="text-md">
              Discover nearby food options or share details about local food
              sources. Whether you're looking to explore or contribute, we're
              here to connect you with delicious dining opportunities in your
              area.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="text-center"
            iconStyle={{ background: "#4285F4", color: "#fff" }}
            icon={<DoneAllRoundedIcon />}
          >
            <h2 className="text-xl font-bold mb-2">Enjoy your food</h2>
            <p className="text-md">
              Discover delightful dining experiences with us. From savory meals
              to sweet treats, savor every bite and indulge in culinary delights
              that bring joy to your taste buds. Bon appétit!
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            iconStyle={{ background: "#DB4437", color: "#fff" }}
            icon={<PublicRoundedIcon />}
          />
        </VerticalTimeline>
      </div>
    </div>
  );
};
export default Timeliness;
