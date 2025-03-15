"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen mt-30 w-screen">
      <div className="relative mb-8 mt-0 flex flex-col items-center gap-6">
        <p className="font-general text-sm uppercase md:text-[15px]">
          Welcome to JATRA
        </p>
        <h1 className="mt-2 text-black font-bold text-5xl text-center">
          Plan your next <br /> greate vent with JATRA
        </h1>
        <div className="about-subtext">
          <p>Experience the Joy of Seamless Event with JATRA</p>
          <p className="text-gray-500">
            JATRA brings organizers, attendees, and service providers together
            on one platform, transforming events into unforgettable experiences.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="auth-1.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
