import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
}

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.2 },
    },
  };

  const leftImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -8, x: -150, y: 10,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
    hover: {
      rotate: 1, x: -160, y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  const middleImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: 6, x: 0, y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
    hover: {
      rotate: 0, x: 0, y: -10,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  const rightImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -6, x: 200, y: 20,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
    hover: {
      rotate: 3, x: 200, y: 10,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  return (
    <motion.div
      className="relative flex items-center justify-center w-64 h-64 my-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute w-48 h-48 origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-lynx-dark-card"
        variants={leftImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 30 }}
      >
        <img src={leftImage} alt="Left" className="object-contain p-3 rounded-xl w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute w-48 h-48 origin-bottom-left overflow-hidden rounded-xl shadow-lg bg-lynx-dark-card"
        variants={middleImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 20 }}
      >
        <img src={middleImage} alt="Middle" className="object-contain p-3 rounded-2xl w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute w-48 h-48 origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-lynx-dark-card"
        variants={rightImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 10 }}
      >
        <img src={rightImage} alt="Right" className="object-contain p-3 rounded-2xl w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
