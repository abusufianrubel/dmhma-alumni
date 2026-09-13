import { Quote } from 'lucide-react';
import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';

export type TestimonialItem = {
    quote: string;
    name: string;
    batch: string;
    avatarPath: string;
};

type TestimonialsMarqueeProps = {
    testimonials: readonly TestimonialItem[];
    direction?: 'left' | 'right';
    /** Seconds required for one complete loop. */
    speed?: number;
    /** Space between cards in pixels. */
    gap?: number;
    className?: string;
};

type MarqueeStyle = CSSProperties & {
    '--testimonial-marquee-duration': string;
    '--testimonial-marquee-gap': string;
};

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.figure
            initial={false}
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : {
                          scale: 1.05,
                          x: 6,
                          transition: {
                              duration: 0.24,
                              ease: [0.22, 1, 0.36, 1],
                          },
                      }
            }
            transition={
                shouldReduceMotion
                    ? { duration: 0 }
                    : {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                      }
            }
            className="group relative flex min-h-64 w-[min(82vw,22rem)] shrink-0 flex-col justify-between rounded-2xl border border-brand-border/80 bg-card p-6 shadow-[0_12px_35px_rgba(15,23,42,0.07)] transition-[box-shadow,border-color] duration-300 ease-out hover:z-10 hover:border-brand-primary/60 hover:shadow-[0_22px_50px_rgba(14,165,233,0.14)] motion-reduce:transition-none sm:w-[22rem] sm:p-7 lg:w-[24rem]"
        >
            <div>
                <Quote
                    className="size-6 fill-brand-primary/20 text-brand-accent transition duration-300 ease-out group-hover:fill-brand-primary/30 group-hover:text-brand-accent-strong motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6 motion-reduce:transition-none"
                    aria-hidden="true"
                />
                <blockquote className="mt-4 text-sm leading-7 font-medium text-brand-text sm:text-[0.95rem]">
                    {testimonial.quote}
                </blockquote>
            </div>
            <figcaption className="mt-7 flex items-center gap-3">
                <span className="size-11 shrink-0 overflow-hidden rounded-full bg-brand-surface-soft ring-4 ring-brand-surface-soft transition duration-300 group-hover:ring-brand-accent/20 motion-reduce:transition-none">
                    <img
                        src={testimonial.avatarPath}
                        alt={`Portrait of ${testimonial.name}`}
                        width="44"
                        height="44"
                        loading="lazy"
                        decoding="async"
                        className="size-full rounded-full object-cover transition duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                    />
                </span>
                <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-extrabold text-brand-primary-strong">
                        <span
                            className="h-px w-4 bg-brand-accent"
                            aria-hidden="true"
                        />
                        {testimonial.name}
                    </span>
                    <span className="mt-1 block text-xs text-brand-text-muted">
                        {testimonial.batch}
                    </span>
                </span>
            </figcaption>
        </m.figure>
    );
}

export default function TestimonialsMarquee({
    testimonials,
    direction = 'left',
    speed = 36,
    gap = 20,
    className = '',
}: TestimonialsMarqueeProps) {
    if (testimonials.length === 0) {
        return null;
    }

    const marqueeStyle: MarqueeStyle = {
        '--testimonial-marquee-duration': `${Math.max(speed, 8)}s`,
        '--testimonial-marquee-gap': `${Math.max(gap, 0)}px`,
    };

    return (
        <LazyMotion features={domAnimation}>
            <div
                role="region"
                aria-label="Alumni testimonials. Animation pauses while focused."
                tabIndex={0}
                data-direction={direction}
                style={marqueeStyle}
                className={`testimonials-marquee testimonial-marquee-viewport py-3 focus-visible:ring-3 focus-visible:ring-brand-accent focus-visible:ring-offset-3 focus-visible:outline-none ${className}`}
            >
                <div className="testimonials-marquee-track flex w-max">
                    {[false, true].map((isDuplicate) => (
                        <div
                            key={isDuplicate ? 'duplicate' : 'original'}
                            aria-hidden={isDuplicate}
                            className={`flex shrink-0 items-stretch gap-[var(--testimonial-marquee-gap)] pr-[var(--testimonial-marquee-gap)] ${isDuplicate ? 'testimonials-marquee-copy' : ''}`}
                        >
                            {testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={`${isDuplicate ? 'duplicate' : 'original'}-${testimonial.name}`}
                                    testimonial={testimonial}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </LazyMotion>
    );
}
