"use client";
import About from "@/components/About";
import Events from "@/components/Event";
import FeatureSection from "@/components/Feature";
import ImageSlider from "@/components/ImageSlider";
import NavBar from "@/components/Navbar";
import { Calendar, Clock, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";

const PreLoader = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50 `}
    >
      <div className="flex flex-col items-center gap-4 text-white">
        <div className="pre-load">JATRA</div>
      </div>
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <PreLoader />}
      {!loading && (
        <div className="min-h-screen max-w-full relatice bg-black bg-gra-50">
          <NavBar />
          <section
            className="bg-orange-50 overflow-hidden text-white bg-[url('/lakhey.jpg')] bg-center h-screen"
            style={{
              filter: "brightness(0.9) contrast(1.3)",
            }}
          >
            <div className="w-full h-screen absolute">
              <div className="container mx-auto px-4 flex items-center relative top-1/2">
                <div className="md:w-1/2 2xl:w-[60%] mb-8 md:mb-0 p-3 rounded-">
                  <h1 className="text-4xl 2xl:text-7xl md:text-5xl font-bold mb-4 text-orange-400">
                    Book Events with Ease
                  </h1>
                  <p className=" 2xl:text-5xl text-lg md:text-xl mb-6 text-white">
                    Jatra simplifies event booking with a seamless experience
                    for organizers and attendees alike.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      href={"/login"}
                      className="bg-orange-500 2xl:text-3xl text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-400 transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={"/register"}
                      className="bg-transparent  2xl:text-3xl border bg-wh border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-lg hover:text-white transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <About />
          <Events />
          <ImageSlider />
          <FeatureSection/>

          <section id="contact" className="bg-black pb-15">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-[60%] mb-8 md:mb-0">
                  <h2 className="text-5xl font-bold mb-4 text-[#fe6807]">
                    Experience Seamless Booking
                  </h2>
                  <p className="text-2xl mb-6 italic px-10 text-gray-700">
                    Jatra transforms how you discover, book, and manage events.
                    With our intuitive interface and powerful features, you'll
                    never miss an opportunity again.
                  </p>
                  <ul className="space-y-3 text-2xl text-white">
                    <li className="flex items-center gap-1">
                      <div className="flex h-4 w-4 rounded-full bg-[#fe6807] justify-center items-center">
                        <TiTick size={12} className="text-white" />
                      </div>
                      <span>Browse thousands of events in your area</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <div className="flex h-4 w-4 rounded-full bg-[#fe6807] justify-center items-center">
                        <TiTick size={12} className="text-white" />
                      </div>
                      <span>Book and pay in seconds, all in one place</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <div className="flex h-4 w-4 rounded-full bg-[#fe6807] justify-center items-center">
                        <TiTick size={12} className="text-white" />
                      </div>
                      <span>Manage your bookings with ease</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#fe6807] text-white">
            <div className="container mx-auto px-4 py-4">
              {/* <div className="w-full p-3">
                <div className="flex  justify-center items-center">
                  <Image
                    src={"/logojatra.png"}
                    alt="Jatra Logo"
                    width={100}
                    height={100}
                    className="w-14 h-14 rounded-lg"
                  />
                </div>
              </div> */}
              <div className="border-t border-orange-500 text-center text-sm pt-2">
                <p>© {new Date().getFullYear()} Jatra. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;
