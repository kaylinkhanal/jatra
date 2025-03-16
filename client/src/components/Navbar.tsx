'use client'
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems: string[] = [ "About", "Event", "Features","Contact"];

const NavBar: React.FC = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (navContainerRef.current) {
      if (currentScrollY === 0) {
        // Topmost position: show navbar without floating-nav
        setIsNavVisible(true);
        navContainerRef.current.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar and apply floating-nav
        setIsNavVisible(false);
        navContainerRef.current.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: show navbar with floating-nav
        setIsNavVisible(true);
        navContainerRef.current.classList.add("floating-nav");
      }

      setLastScrollY(currentScrollY);
    }
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/logojatra.png" alt="logo" className="w-10  2xl:w-15 rounded-xl" />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full gap-2 items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-btn  2xl:text-2xl"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center cursor-pointer space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
