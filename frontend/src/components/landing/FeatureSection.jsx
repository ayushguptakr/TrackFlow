import { FEATURES } from './data';
import MotionReveal from './MotionReveal';
import SectionHeader from './SectionHeader';

const FeatureSection = () => (
  <section id="features" className="scroll-mt-24 border-t border-zinc-200/80 bg-zinc-50/50 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Features"
        title="Everything your team needs to stay on track"
        description="Purpose-built tools for ticketing, access control, analytics, and collaboration—without the clutter."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <MotionReveal key={feature.title} delay={index * 0.06}>
              <article className="group h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {feature.description}
                </p>
              </article>
            </MotionReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeatureSection;
