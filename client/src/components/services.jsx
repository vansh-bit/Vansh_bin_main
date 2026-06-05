import Cards from "@/components/cards";
const Services = () => {
  const data = [
    {
      url: "https://www.henryford.com/-/media/project/hfhs/henryford/henry-ford-blog/images/mobile-interior-banner-images/2020/06/food-bank-what-to-give.jpg?h=600&iar=0&w=640&rev=4eef8c0563754a7bb81c39c35b6867f7&hash=DBAA3EA1546CBC38CC79A3FC6B8AF87F",
      text: "Help combat hunger by donating surplus food. Your contribution can make a significant impact in providing meals to those who need it most by donating food.",
      heading: "Donate Food",
      btn: "Donate Food",
      link:"/DFood"
    },
    {
      url: "https://www.eatthis.com/wp-content/uploads/sites/4/2020/04/takeout-food.jpg?quality=82&strip=1",
      text: "Access nutritious meals through our platform, connecting you with donated food. Whether facing food insecurity or seeking assistance, we're here to support you in times of need.",
      heading: "Take Food",
      btn: "Get Food",
      link: "/GetFood"
    },
  ];
  return (
    <div className="mt-14 ">
      <h1 className=" text-4xl md:text-6xl mb-5 font-bold leading-normal text-center text-blue-900 font-serif"
      style={{ color: "#4285F4" }}>
        Our Services
      </h1>
      <div className="flex justify-center items-center gap-20 mt-10 text-center">
        {data.map((datas) => {
          return <Cards card_detail={datas} key={datas.url} />;
        })}
      </div>
    </div>
  );
};
export default Services;
