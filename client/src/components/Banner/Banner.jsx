import React from 'react';
import Image2 from "../../components/Banner/Blog2.png"
import Image3 from "../../components/Banner/Blog4.png"

const Banner = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 dark:text-white">
        <div className="container md:h-[500px] flex items-center justify-center py-10">
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                {/* img container */}
                <div>
                    <img 
                        src={Image2}
                        alt=""
                        className="mx-auto w-full p-4 md:max-w-full h-[300px] md:h-[350px] object-cover rounded-3xl"
                    />
                </div>
                {/* text container */}
                <div className="lg:max-w-[400px]">
                    <h1 className="text-2xl font-semibold md:text-4xl mb-4">Customer Testimonials</h1>
                    <ul className="flex list-inside list-disc flex-col gap-2 md:gap-4">
                        <li className="font-medium">
                            "I got my loan approved in just 24 hours! The process was smooth and transparent." – Amit Sharma

                        </li>
                        <li className="font-medium">
                            "Best loan service with affordable interest rates and flexible repayment options." – Priya Mehta

                        </li>
                        <li className="font-medium">
                            “Best loan service ever! Low interest rates and no hidden charges.” – Rashi Marwah
                        </li>
                    </ul>
                    {/*<button className="btn-primary">Get Started</button>*/}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Banner;
