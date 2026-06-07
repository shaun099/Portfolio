"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type LoaderProps = {
  visible: boolean;
};

// Natural aspect ratios of each letter
const S_RATIO = 385 / 385; // 1
const M_RATIO = 352 / 286; // ~1.23
const R_RATIO = 359 / 385; // ~0.93
const GAP_RATIO = 0.1; // gap as fraction of height

function useLogoSize() {
  const [height, setHeight] = useState(160);

  useEffect(() => {
    function calculate() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Total width needed at a given height H:
      // S_W + GAP + M_W + GAP + R_W = H*(S_RATIO + M_RATIO + R_RATIO) + 2*H*GAP_RATIO
      const widthMultiplier = S_RATIO + M_RATIO + R_RATIO + 2 * GAP_RATIO;

      // Fit within 88% of viewport width and 50% of viewport height
      const maxH_fromWidth = (vw * 0.88) / widthMultiplier;
      const maxH_fromHeight = vh * 0.5;

      const h = Math.min(maxH_fromWidth, maxH_fromHeight, 200); // cap at 200px
      setHeight(Math.max(h, 60)); // floor at 60px
    }

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  return {
    height,
    sW: Math.round(S_RATIO * height),
    mW: Math.round(M_RATIO * height),
    rW: Math.round(R_RATIO * height),
    gap: Math.round(GAP_RATIO * height),
  };
}

export default function Loader({ visible }: LoaderProps) {
  const { height, sW, mW, rW, gap } = useLogoSize();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex items-center" style={{ gap }}>
            {/* S */}
            <motion.div
              className="relative flex-shrink-0"
              style={{ width: sW, height }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0, ease: "easeOut" }}
            >
              <Image
                src="/logo/s.svg"
                alt="S"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            {/* M */}
            <motion.div
              className="relative flex-shrink-0"
              style={{ width: mW, height }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src="/logo/m.svg"
                alt="M"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>

            {/* R */}
            <motion.div
              className="relative flex-shrink-0"
              style={{ width: rW, height }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
            >
              <Image
                src="/logo/r.svg"
                alt="R"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}