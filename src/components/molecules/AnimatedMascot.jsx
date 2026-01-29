import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MascotIcon from "../atoms/MascotIcon";

const AnimatedMascot = () => {
  const [mascots, setMascots] = useState([]);

  useEffect(() => {
    const updateMascots = () => {
      // Tìm tất cả các section-title
      const sectionTitles = document.querySelectorAll(".section-title");
      const newMascots = [];

      sectionTitles.forEach((title) => {
        // Tìm section cha chứa title này
        const section = title.closest("section");
        if (!section) return;

        const titleRect = title.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        // Tính toán vị trí relative với section
        const relativeTop = titleRect.top - sectionRect.top - 60; // 60px phía trên
        const relativeLeft = titleRect.right - sectionRect.left + 20; // 20px bên phải

        // Lấy section id để làm key
        const sectionId = section.id || `section-${Math.random()}`;

        newMascots.push({
          id: sectionId,
          top: relativeTop,
          left: relativeLeft,
          sectionElement: section,
        });
      });

      setMascots(newMascots);
    };

    // Initial update
    const timer = setTimeout(() => {
      updateMascots();
    }, 500);

    // Update on scroll và resize
    const handleScroll = () => {
      updateMascots();
    };

    const handleResize = () => {
      updateMascots();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {mascots.map((mascot) => {
        if (mascot.top <= 0 || !mascot.sectionElement) return null;

        return createPortal(
          <div
            key={mascot.id}
            className="absolute z-50 pointer-events-none"
            style={{
              top: `${mascot.top}px`,
              left: `${mascot.left}px`,
              transform: "translateY(-50%)",
            }}>
            <MascotIcon size={200} variant={mascot.id} />
          </div>,
          mascot.sectionElement
        );
      })}
    </>
  );
};

export default AnimatedMascot;
