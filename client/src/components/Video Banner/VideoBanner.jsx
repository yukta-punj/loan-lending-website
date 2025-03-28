import React from "react";


const VideoBanner = () => {
  return (
    <div className="bg-primary">
      <div className="container py-8 md:py-16">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4 md:gap-x-8">
          {/* Video Section */}
          <div>
            <iframe
              src="https://www.youtube.com/embed/SNdFPSgqSa8?si=5WoWoRMxxVJc8vjC"
              title="YouTube video about loan lending process"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="aspect-video w-full"
            ></iframe>
          </div>
          {/* Text Section */}
          <div className="space-y-4 text-center md:text-left text-white">
            <h1 className="text-4xl font-bold">Watch Our Video</h1>
            <p>Loan lending process needs to be authenticated</p>
            <button className="btn-primary bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
