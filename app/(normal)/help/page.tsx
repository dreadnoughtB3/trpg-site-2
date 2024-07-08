"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const HelpPage = () => {
  return ( 
    <div>
      <Header />
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/background.png')"}}>
        <div className="flex pt-16 justify-center w-full">
          <p className="bg-gray-600/30 p-4 rounded-xl text-white border border-gray-700">Contact: mayonaka4355</p>
        </div>
      </div>
      <Footer />
    </div>
    );
}
 
export default HelpPage;