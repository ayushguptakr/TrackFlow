import { WORKFLOW_STEPS } from './data';
import MotionReveal from './MotionReveal';
import SectionHeader from './SectionHeader';

const HowItWorksSection = () => (
  <section id="how-it-works" className="scroll-mt-24 border-t border-zinc-200/80 bg-white py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Workflow"
        title="From ticket to resolution in three steps"
        description="A simple flow that scales from startup support teams to enterprise operations."
      />

      <div className="relative mt-14">
        <div
          className="absolute left-0 right-0 top-12 hidden h-px bg-zinc-200 lg:block"
          aria-hidden
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => (
            <MotionReveal key={step.step} delay={index * 0.08}>
              <article className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
