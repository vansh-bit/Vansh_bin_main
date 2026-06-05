"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../components/ui/images-slider";
import { Link } from "react-router-dom";
import { donation12, donation2, donation5 } from "../assets";

function Hero() {
  const images = [
    donation12,
    donation2,
    donation5,
  ];
  return (
    <div  className="overflow-hidden h-[100vh]">
    <ImagesSlider className="h-[100vh] overflow-hidden" images={images} >
      <motion.div
        initial={{
          opacity: 0,
          y: 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.1,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        Bridging Plates Breaking Chains
        </motion.p>
        <div className="flex">
        <button className="mr-8  px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link to={'/DFood'}><span>Donate Food→</span></Link>
          
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
        <Link to={'/GetFood'}><span>Get Food→</span></Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
        </div>
      </motion.div>
    </ImagesSlider>
    </div>
  );
}

export default Hero
