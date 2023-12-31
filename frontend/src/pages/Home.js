import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../images/imgHome2.PNG"
import img2 from "../images/imgHome.PNG"
import img3 from "../images/imgHome3.PNG"
import { Link } from "react-router-dom";
import Itemcard from "./Itemcard";
import data from "./data";
function Home() {
  return (
    <>
    <div className="flex flex-col">
        
        <div className="flex  space-x-6 ">
        <Carousel className="rounded-xl">

    </Carousel>
    </div>
        <div className="w-full ">
          <h1>Categories</h1>
          <div className="flex flex-row  mt-5">
          <Link>Vetements d homme</Link>
          <Link>Vetements du femme</Link>
          <Link>Vetements des enfants</Link>
          </div>

        </div>

            
    <div>
        <h1 class="text-center mt-10 bg-[#3187c4] font-extrabold ">All Items</h1>
        <section class="py-4 mx-auto">
            <div class="flex flex-wrap justify-center">
                {data.productData.map((item,index)=>{
                    return(
                        <Itemcard title={item.title} 
                        desc={item.desc} 
                        img={item.img}
                        price={item.price}
                        item={item}
                        key={index}/>
                    )
                })}
                
            </div>
        </section>
    </div>
    </div>
    </>
  );
}

export default Home;
