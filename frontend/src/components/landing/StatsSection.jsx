import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { STATS } from './data';
import MotionReveal from './MotionReveal';

const AnimatedStat = ({ end, suffix, label, decimals = 0, duration = 1.8 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
        {display}
        <span className="text-indigo-600">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-zinc-500">{label}</p>
    </div>
  );
};

const StatsSection = () => (
  <section className="border-y border-zinc-200/80 bg-zinc-50 py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <MotionReveal>
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Trusted at scale
        </p>
      </MotionReveal>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <MotionReveal key={stat.key} delay={index * 0.05}>
            <AnimatedStat
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              decimals={stat.decimals ?? 0}
            />
          </MotionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
