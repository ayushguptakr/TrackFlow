import { HiOutlineStar } from 'react-icons/hi2';
import { TESTIMONIALS } from './data';
import MotionReveal from './MotionReveal';
import SectionHeader from './SectionHeader';

const TestimonialSection = () => (
  <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Testimonials"
        title="Loved by teams who ship fast"
        description="See why operations and engineering leaders choose TrackFlow for their daily workflow."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item, index) => (
          <MotionReveal key={item.name} delay={index * 0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiOutlineStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-700">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-zinc-100 pt-4">
                <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
                <p className="text-xs text-zinc-500">
                  {item.role} · {item.company}
                </p>
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
