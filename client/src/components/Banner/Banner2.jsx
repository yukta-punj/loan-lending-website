import React from 'react';
import Image3 from "../../components/Banner/Blog4.png"; // Ensure this path is correct

const Banner2 = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 dark:text-white">
      <div className="container md:h-[500px] flex items-center justify-center py-10">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          {/* text container */}
          <div className="lg:max-w-[400px] space-y-6">
            <h1 className="text-2xl font-semibold md:text-4xl mb-4">How it Works ???</h1>
            <ul className="flex list-inside list-disc flex-col gap-2 md:gap-4">
              <li className="font-medium">
                Apply Online - Fill a quick form in 2 minutes.
              </li>
              <li className="font-medium">
                Upload Documents – Securely submit your KYC & income proof.
              </li>
              <li className="font-medium">
                Get Approved – Instant approval after verification.
              </li>
              <li className="font-medium">
                Receive Funds – Money credited to your account within 24 hours!
              </li>
            </ul>
            {/*<button className="btn-primary">Get Started</button>*/}
          </div>
          {/* image container */}
          <div className="flex justify-center">
            <img src={Image3} alt="Helping people" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;