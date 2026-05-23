import MotionReveal from './MotionReveal';

const SectionHeader = ({ badge, title, description, align = 'center' }) => {
  const alignClass =
    align === 'center'
      ? 'mx-auto max-w-2xl text-center'
      : 'max-w-2xl text-left';

  return (
    <MotionReveal className={alignClass}>
      {badge && (
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
          {badge}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">
          {description}
        </p>
      )}
    </MotionReveal>
  );
};

export default SectionHeader;
