// ============================================================
// QOVRE — Animation System
// Framer Motion variants. Import and use across all components.
// Usage: <motion.div variants={fadeUp} initial="hidden" animate="visible">
// ============================================================

// ── Fade up — primary entrance animation ─────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any },
  },
};

// ── Fade in — for elements that don't need vertical movement ──
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any },
  },
};

// ── Stagger container — wraps a list of items ─────────────────
// Usage: apply staggerContainer to parent, fadeUp to each child
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.1,
    },
  },
};

// ── Stagger container (slow) — for hero sections ──────────────
export const staggerContainerSlow = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.2,
    },
  },
};

// ── Line reveal — hero headline text, word by word ────────────
// Split your h1 into spans, apply this to each span
export const lineReveal = {
  hidden:  { opacity: 0, y: "110%", rotateX: 12 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
  },
};

// ── Slide in from left ────────────────────────────────────────
export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any },
  },
};

// ── Slide in from right ───────────────────────────────────────
export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any },
  },
};

// ── Scale up — for cards and service blocks ───────────────────
export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any },
  },
};

// ── Card hover — for service cards, process items ────────────
export const cardHover = {
  rest:  { backgroundColor: "rgba(13, 13, 24, 1)" },
  hover: {
    backgroundColor: "rgba(17, 17, 34, 1)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// ── Arrow hover — subtle x translate on card arrows ──────────
export const arrowHover = {
  rest:  { x: 0,  opacity: 0.2 },
  hover: { x: 5, opacity: 0.7, transition: { duration: 0.2 } },
};

// ── Counter animation — for proof numbers ────────────────────
// Use with useMotionValue + useTransform + useEffect
// Example usage in a component:
//
// import { useMotionValue, useTransform, animate } from "framer-motion";
// const count = useMotionValue(0);
// const rounded = useTransform(count, Math.round);
// useEffect(() => {
//   animate(count, targetValue, { duration: 1.5, ease: "easeOut" });
// }, []);
// <motion.span>{rounded}</motion.span>

// ── Viewport defaults — use with whileInView ──────────────────
// Apply to every scroll-triggered element:
// <motion.div
//   variants={fadeUp}
//   initial="hidden"
//   whileInView="visible"
//   viewport={viewportOnce}
// >
export const viewportOnce = {
  once:   true,
  margin: "-80px",
};

// ── Nav animate presence ──────────────────────────────────────
export const navItem = {
  hidden:  { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// ── Page transition — wrap page content ──────────────────────
export const pageTransition = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: "easeIn" as any },
  },
};

// ── FAQ accordion ─────────────────────────────────────────────
// Use with AnimatePresence on the answer div
export const faqAnswer = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as any },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export const faqIcon = {
  closed: { rotate: 0 },
  open:   { rotate: 45, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

// ── Marquee pause on hover ────────────────────────────────────
// Add to .marquee-track wrapper:
// <motion.div
//   style={{ animationPlayState }}
//   onHoverStart={() => setAnimationPlayState("paused")}
//   onHoverEnd={() => setAnimationPlayState("running")}
// >

// ── Section divider line ──────────────────────────────────────
export const dividerLine = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
