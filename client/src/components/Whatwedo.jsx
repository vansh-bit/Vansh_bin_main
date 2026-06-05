const Whatwedo = () => {
  return (
    <div className="container">
      <div className="container mt-14 h-screen ">
        <h1 className=" text-4xl md:text-6xl mb-5 font-bold leading-normal text-center text-blue-900 font-serif"
        style={{ color: "#4285F4" }}>
          What We Do!
        </h1>
        <img
          className="max-w-full max-h-full"
          src="pics2.png"
          alt="alt"
        />
        <div className="container">
          <p className="text-lg font-normal text-gray-700 text-center dark:text-gray-400 mb-4 mt-2">
            At our platform, we serve as a vital link between those with surplus
            food and individuals facing hunger. Through our user-friendly
            interface, donors can easily contribute excess food, while those in
            need can access nutritious meals. By harnessing technology, we
            streamline the process of food redistribution, ensuring that no
            edible food goes to waste. Our mission is simple yet impactful: to
            alleviate hunger, reduce food waste, and foster a sense of community
            care. Join us in making a difference one meal at a time, as we work
            towards a world where everyone has access to wholesome food.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Whatwedo;
