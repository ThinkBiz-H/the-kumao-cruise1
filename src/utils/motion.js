/** Shared Framer Motion variants — one easing curve across the site. */
export const EASE = [0.22, 1, 0.36, 1];

export const viewportOnce = { once: true, amount: 0.2 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const slideFrom = (direction = 'left', distance = 40) => ({
  hidden: { opacity: 0, x: direction === 'left' ? -distance : distance },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const buttonMotion = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 26 },
};
