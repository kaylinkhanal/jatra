import About from "@/components/About";
import NavBar from "@/components/Navbar";
import { Calendar, Clock, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TiTick } from "react-icons/ti";

const Home = () => {
  return (
    <div className="min-h-screen relatice bg-white">
      <NavBar/>
      <section className="bg-orange-50 text-white bg-[url('/lakhey.jpg')] bg-center min-h-screen">
        <div className="w-full h-screen absolute">
          <div className="container mx-auto px-4 flex items-center relative top-50">
            <div className="md:w-1/2 mb-8 md:mb-0 p-3 rounded-">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-800">
                Book Events with Ease
              </h1>
              <p className="text-lg md:text-xl mb-6 text-orange-400">
                Jatra simplifies event booking with a seamless experience for
                organizers and attendees alike.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href={"/login"}
                  className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  href={"/register"}
                  className="bg-transparent border border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-lg hover:text-orange-800 transition"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Adjusted for proper bottom-right positioning */}
          <div className="absolute bottom-10 right-15 text-2xl font-semibold italic md:block">
            <p>
              {" "}
              "Where Your Next Adventure Begins!"
              <span className="block mt-1 text-sm text-right">- Jatra</span>
            </p>
          </div>
        </div>
      </section>
      <About/>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4 border-t border-orange-500 pt-2">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
            Why Choose Jatra?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-xl shadow hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Calendar />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-800">
                Effortless Scheduling
              </h3>
              <p className="text-gray-700">
                Book events with a few taps. Our intuitive interface makes
                scheduling a breeze.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl shadow hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <Clock />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-800">
                Real-time Notifications
              </h3>
              <p className="text-gray-700">
                Stay informed with instant updates about your bookings and event
                changes.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl shadow hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <LockKeyhole />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-800">
                Secure Payments
              </h3>
              <p className="text-gray-700">
                Process payments securely within the app for a hassle-free
                booking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-orange-800">
                Experience Seamless Booking
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                Jatra transforms how you discover, book, and manage events. With
                our intuitive interface and powerful features, you'll never miss
                an opportunity again.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-1">
                  <div className="flex h-4 w-4 rounded-full bg-orange-500 justify-center items-center">
                    <TiTick size={12} className="text-white" />
                  </div>
                  <span>Browse thousands of events in your area</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="flex h-4 w-4 rounded-full bg-orange-500 justify-center items-center">
                    <TiTick size={12} className="text-white" />
                  </div>
                  <span>Book and pay in seconds, all in one place</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="flex h-4 w-4 rounded-full bg-orange-500 justify-center items-center">
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
      <footer className="bg-amber-700 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="w-full p-3">
            <div className="flex  justify-center items-center">
              <Image
                src={"/logojatra.png"}
                alt="Jatra Logo"
                width={100}
                height={100}
                className="w-14 h-14 rounded-lg"
              />
            </div>
          </div>
          <div className="border-t border-orange-500 text-center text-sm pt-2">
            <p>© {new Date().getFullYear()} Jatra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
