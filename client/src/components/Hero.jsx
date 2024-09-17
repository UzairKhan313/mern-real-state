import React from "react";
import Searchbar from "./Searchbar";

const Hero = () => {
  return (
    <section className="h-4/5 h-full w-full absolute sm:top-2 top-14  left-0 bg-welcome-bg bg-center bg-cover">
      <div className="w-full h-full from-bgColor z-10 to-primary bg-gradient-to-t opacity-50" />
      <div className="w-full xl:w-2/3 md:w-4/5 md:left-[50%] md:transform md:translate-x-[-50%] md:py-4 md:px-0 md:p-8 p-4 h-full absolute top-0 left-0 z-30 flex flex-col justify-center items-center">
        <p className="mb-8 xl:text-3xl lg:text-2xl md:text-3xl sm:text-2xl text-xl text-center px-1 text-white">
          Find and Discover Your Dream <strong>UK</strong> Real State
        </p>
        <Searchbar onWelcome />
      </div>
    </section>
  );
};

export default Hero;
