import { motion } from 'framer-motion';

const MotionReveal = ({
  children,
  className = '',
  delay = 0,
  y = 24,
  once = true,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.2 }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default MotionReveal;
