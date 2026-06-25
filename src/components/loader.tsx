"use client";

import { motion, AnimatePresence } from "framer-motion";

type LoaderProps = {
  visible: boolean;
};

// Stroke draw transition factory
// Each path draws itself (pathLength 0→1), then the whole logo fades out
function drawTransition(delay: number, duration = 1.2) {
  return {
    pathLength: {
      duration,
      delay,
      ease: [0.4, 0, 0.2, 1] as const,
    },
    opacity: {
      duration: 0.01,
      delay,
    },
  };
}

export default function Loader({ visible }: LoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          {/*
            Single SVG canvas: 1180 x 388
            S at x=0, M at x=425, R at x=817
            Responsive: scales to fit viewport via viewBox + width="100%"
          */}
          
          <div className="w-full max-w-[600px] px-8 sm:px-12 md:px-16">
            <svg
              viewBox="0 0 1180 388"
              width="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ── S ── draws first */}
              <motion.path
                d="M107.707 0.5H383.207L323.207 66H107.707C107.707 66 103.384 67.0425 100.707 68C90.7637 71.5567 85.1362 75.0306 78.2071 83C70.8696 91.4391 67.7179 97.9196 66.2071 109C64.767 119.562 65.671 126.354 70.2071 136C74.2181 144.529 78.3222 148.643 85.7071 154.5C93.2333 160.469 107.707 165.5 107.707 165.5H274.207C274.207 165.5 306.273 168.244 323.207 178.5C339.276 188.232 345.816 197.85 356.207 213.5C365.049 226.816 369.964 234.96 373.707 250.5C378.006 268.344 377.482 279.538 373.707 297.5C370.127 314.537 366.157 324.215 356.207 338.5C346.101 353.009 338.416 360.481 323.207 369.5C306.043 379.679 274.207 384 274.207 384H1.20711L62.7071 322.5H274.207C274.207 322.5 284.429 319.479 290.207 316C296.376 312.286 299.666 309.589 304.207 304C312.234 294.12 315.923 286.228 315.707 273.5C315.5 261.319 312.044 253.828 304.207 244.5C295.545 234.19 274.207 227.5 274.207 227.5H107.707C107.707 227.5 78.7579 222.505 62.7071 213.5C47.9674 205.23 40.472 198.529 29.7071 185.5C17.5775 170.819 11.4632 160.94 6.70711 142.5C1.68419 123.025 2.54075 110.676 6.70711 91C10.1023 74.9663 13.3414 65.7842 22.2071 52C29.76 40.257 35.4012 34.3418 46.2071 25.5C55.3057 18.0551 60.9689 14.2856 71.7071 9.5C84.9437 3.601 107.707 0.5 107.707 0.5Z"
                stroke="#E20404"
                strokeWidth={3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={drawTransition(0, 1.4)}
              />

              {/* ── M white body ── draws second, offset x=425 */}
              <motion.path
                // Original path translated +425 on x axis
                d="M425.5 383.927V99.9271L607 228.927L776.5 101.427V383.427H713.5V225.427L607 313.927L491 224.427V383.927H425.5Z"
                stroke="white"
                strokeWidth={3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={drawTransition(0.5, 1.3)}
              />

              {/* ── M red chevron ── draws on top of M */}
              <motion.path
                // Original path translated +425 on x axis
                d="M425.5 80.4271V0.927124L608 120.927L776 4.42712V80.4271L607 205.427L425.5 80.4271Z"
                stroke="#E20404"
                strokeWidth={3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={drawTransition(0.9, 1.0)}
              />

              {/* ── R white body ── draws third, offset x=817 */}
              <motion.path
                // Original path translated +817 on x axis
                d="M821.713 62.5V0.5H1025.21C1025.21 0.5 1038.83 1.68329 1047.21 4C1061.27 7.88357 1068.83 12.0435 1080.71 20.5C1094.78 30.5108 1101.39 38.3014 1111.21 52.5C1122.1 68.2365 1128.35 78.1638 1131.71 97C1135.3 117.084 1132.38 129.401 1126.71 149C1122.56 163.361 1119.47 171.541 1111.21 184C1101.83 198.155 1094.7 205.365 1080.71 215C1065.07 225.78 1035.71 233.5 1035.71 233.5L1178.21 384H1091.21L888.213 169.5H1018.71C1018.71 169.5 1028.45 168.507 1034.71 166C1042.36 162.936 1046.51 159.447 1052.21 153.5C1058.06 147.403 1060.16 143.879 1063.21 136C1065.93 128.988 1066.74 122.406 1066.71 115.5C1066.69 110.588 1066.65 105.512 1064.71 100C1060.81 88.91 1056.25 83.0255 1047.21 75.5C1037.81 67.6704 1018.71 62.5 1018.71 62.5H821.713Z"
                stroke="white"
                strokeWidth={3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={drawTransition(1.2, 1.3)}
              />

              {/* ── R red accent slash ── draws last */}
              <motion.path
                // Original path translated +817 on x axis
                d="M904.213 232H818.213L974.213 387H1060.21L904.213 232Z"
                stroke="#E20404"
                strokeWidth={3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={drawTransition(1.6, 0.8)}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
