import { Form, Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BellRing,
    CalendarDays,
    Check,
    ChevronRight,
    Clock3,
    Facebook,
    GraduationCap,
    HandCoins,
    Heart,
    HeartHandshake,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Phone,
    Quote,
    Send,
    ShieldCheck,
    Sparkles,
    UserRoundCheck,
    UsersRound,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    domAnimation,
    LazyMotion,
    m,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { useEffect, useState } from 'react';

import TestimonialsMarquee from '@/components/testimonials-marquee';
import type { TestimonialItem } from '@/components/testimonials-marquee';
import { dashboard, home, login, register } from '@/routes';
import { subscribe } from '@/routes/newsletter';

type WelcomeStats = {
    totalMembers: number;
    activeBatches: number;
    eventsOrganized: number;
};

type Notice = {
    id: number;
    title: string;
    category: string;
    created_at: string;
    slug: string;
};

type Event = {
    id: number;
    title: string;
    slug: string;
    event_date: string;
    location: string;
    ticket_price: string;
    banner_path: string | null;
};

type WelcomeProps = {
    stats: WelcomeStats;
    notices: Notice[];
    nextEvent: Event | null;
};

type Feature = {
    title: string;
    description: string;
    icon: LucideIcon;
};

type UpcomingEvent = {
    id: string;
    title: string;
    eventDate: string;
    location: string;
    imagePath: string;
    imageAlt?: string;
};

const grandAlumniReunionTitle = 'Grand Alumni Reunion 2026';
const grandAlumniReunionImagePath = '/storage/events/events%20(3).jpg';

const navigation = [
    { label: 'About', href: '#about' },
    { label: 'Platform', href: '#platform' },
    { label: 'Community', href: '#community' },
    { label: 'Events', href: '#events' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Donation', href: '#donate' },
];

const staticUpcomingEvents: UpcomingEvent[] = [
    {
        id: 'alumni-reunion-2026',
        title: 'Annual Alumni Reunion & Cultural Evening',
        eventDate: '2026-10-16T18:00:00',
        location: 'International Convention City Bashundhara, Dhaka',
        imagePath: '/storage/events/events%20(3).jpg',
    },
    {
        id: 'career-networking-2026',
        title: 'Career Guidance & Networking Summit',
        eventDate: '2026-11-21T15:00:00',
        location: 'Officers Club, Baily Road, Dhaka',
        imagePath: '/storage/events/events%20(2).jpg',
    },
    {
        id: 'young-alumni-welcome-2027',
        title: 'Young Alumni Welcome & Networking Day',
        eventDate: '2027-01-16T10:00:00',
        location: 'DMHMA Campus Grounds, Dhaka',
        imagePath: '/storage/events/events%20(1).jpg',
    },
];

const testimonials: TestimonialItem[] = [
    {
        quote: 'DMHMA shaped not just my career, but my character. The alumni network is truly a family.',
        name: 'Ahsan Habib',
        batch: 'Batch of 2008',
        avatarPath: '/storage/avatars/avatar%20(4).jpg',
    },
    {
        quote: 'Being part of this association keeps me connected to my roots and inspires me to give back.',
        name: 'Nusrat Jahan',
        batch: 'Batch of 2012',
        avatarPath: '/storage/avatars/avatar%20(1).jpg',
    },
    {
        quote: 'The support, opportunities, and bonds we share as alumni are priceless.',
        name: 'Faisal Ahmed',
        batch: 'Batch of 2005',
        avatarPath: '/storage/avatars/avatar%20(9).jpg',
    },
];

const features: Feature[] = [
    {
        title: 'Verified alumni network',
        description:
            'Create a trusted member profile and stay connected with alumni across batches and professions.',
        icon: UserRoundCheck,
    },
    {
        title: 'Events in one place',
        description:
            'Discover reunions, community programs, and association gatherings from one reliable calendar.',
        icon: CalendarDays,
    },
    {
        title: 'Notices that reach everyone',
        description:
            'Follow official announcements and important association updates without losing them in group chats.',
        icon: BellRing,
    },
    {
        title: 'Service with shared purpose',
        description:
            'Build stronger pathways for mentorship, mutual support, and meaningful service to the DMHMA community.',
        icon: HeartHandshake,
    },
];

const focusRing =
    'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-accent focus-visible:ring-offset-3';

type RevealDirection = 'left' | 'right' | 'up' | 'scale';

type RevealMotionProps = Pick<
    HTMLMotionProps<'section'>,
    'initial' | 'whileInView' | 'viewport' | 'transition'
>;

const revealOffsets = {
    left: { x: -32, y: 0, scale: 1 },
    right: { x: 32, y: 0, scale: 1 },
    up: { x: 0, y: 26, scale: 1 },
    scale: { x: 0, y: 0, scale: 0.985 },
} as const;

function revealMotion(
    direction: RevealDirection,
    shouldReduceMotion: boolean | null,
    delay = 0,
): RevealMotionProps {
    return {
        initial: shouldReduceMotion
            ? false
            : { opacity: 0, ...revealOffsets[direction] },
        whileInView: shouldReduceMotion
            ? undefined
            : { opacity: 1, x: 0, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.12, margin: '0px 0px -8% 0px' },
        transition: shouldReduceMotion
            ? { duration: 0 }
            : {
                  duration: 0.62,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
              },
    };
}

function useBackgroundVideo(): boolean {
    const [shouldPlay, setShouldPlay] = useState(false);

    useEffect(() => {
        const motionPreference = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        const updatePreference = () => setShouldPlay(!motionPreference.matches);

        updatePreference();
        motionPreference.addEventListener('change', updatePreference);

        return () =>
            motionPreference.removeEventListener('change', updatePreference);
    }, []);

    return shouldPlay;
}

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
}

function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-BD').format(value);
}

function formatEventDay(value: string): string {
    return new Intl.DateTimeFormat('en-BD', {
        day: '2-digit',
    }).format(new Date(value));
}

function formatEventMonth(value: string): string {
    return new Intl.DateTimeFormat('en-BD', {
        month: 'short',
    })
        .format(new Date(value))
        .toUpperCase();
}

function formatEventTime(value: string): string {
    return new Intl.DateTimeFormat('en-BD', {
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(value));
}

function storageUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
        return path;
    }

    return `/storage/${path.replace(/^\/+/, '')}`;
}

function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'center',
}: {
    eyebrow: string;
    title: string;
    description: string;
    align?: 'center' | 'left';
}) {
    return (
        <div
            className={
                align === 'center' ? 'mx-auto max-w-3xl text-center' : ''
            }
        >
            <p className="text-xs font-bold tracking-[0.22em] text-brand-accent uppercase">
                {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-brand-text sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            <p className="mt-5 text-base leading-7 text-brand-text-muted sm:text-lg">
                {description}
            </p>
        </div>
    );
}

function BrandMark({ light = false }: { light?: boolean }) {
    return (
        <span className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/8">
                <img
                    src="/images/dmhma-alumni-logo.png"
                    alt=""
                    width="44"
                    height="44"
                    decoding="async"
                    className="size-full object-contain"
                />
            </span>
            <span className="min-w-0">
                <span
                    className={`block text-sm font-extrabold tracking-[0.12em] uppercase ${light ? 'text-white' : 'text-brand-accent-strong'}`}
                >
                    DMHMA
                </span>
                <span
                    className={`block truncate text-xs ${light ? 'text-white/70' : 'text-brand-text-muted'}`}
                >
                    Alumni Association
                </span>
            </span>
        </span>
    );
}

export default function Welcome({ stats, notices, nextEvent }: WelcomeProps) {
    const { auth } = usePage().props;
    const shouldPlayVideo = useBackgroundVideo();
    const shouldReduceMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(() => scrollY.get() > 20);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const isPastHeroTop = latest > 20;

        setHasScrolled((current) =>
            current === isPastHeroTop ? current : isPastHeroTop,
        );
    });

    const liveStats = [
        {
            value: formatNumber(stats.totalMembers),
            label: 'Verified member accounts',
        },
        {
            value: formatNumber(stats.activeBatches),
            label: 'Batches represented',
        },
        {
            value: formatNumber(stats.eventsOrganized),
            label: 'Events completed',
        },
    ];

    const isGrandAlumniReunion = nextEvent?.title === grandAlumniReunionTitle;
    const nextEventImagePath = nextEvent?.banner_path
        ? storageUrl(nextEvent.banner_path)
        : isGrandAlumniReunion
          ? grandAlumniReunionImagePath
          : null;

    const upcomingEvents: UpcomingEvent[] = [
        ...(nextEvent
            ? [
                  {
                      id: `published-${nextEvent.id}`,
                      title: nextEvent.title,
                      eventDate: nextEvent.event_date,
                      location: nextEvent.location,
                      imagePath: nextEvent.banner_path
                          ? storageUrl(nextEvent.banner_path)
                          : grandAlumniReunionImagePath,
                      imageAlt: isGrandAlumniReunion
                          ? 'DMHMA alumni celebrating together at a reunion event'
                          : undefined,
                  },
              ]
            : []),
        ...staticUpcomingEvents,
    ].slice(0, 3);

    return (
        <>
            <Head>
                <title>DMHMA Alumni Association Management System</title>
                <meta
                    name="description"
                    content="The official digital home for DMHMA alumni profiles, association notices, events, leadership, mentorship, and community connection."
                />
            </Head>

            <LazyMotion features={domAnimation}>
                <div className="min-h-screen overflow-x-clip bg-brand-background text-brand-text antialiased">
                    <a
                        href="#main-content"
                        className={`${focusRing} sr-only z-50 rounded-lg bg-card px-4 py-3 text-sm font-bold text-brand-accent-strong shadow-xl focus:not-sr-only focus:fixed focus:top-4 focus:left-4`}
                    >
                        Skip to main content
                    </a>

                    <header
                        className={`sticky top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none ${hasScrolled ? 'border-b border-brand-border/70 bg-card/92 shadow-[0_8px_30px_rgba(15,23,42,0.10)] backdrop-blur-xl' : 'border-0 bg-transparent shadow-none'}`}
                    >
                        <nav
                            aria-label="Primary navigation"
                            className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
                        >
                            <Link
                                href={home()}
                                aria-label="DMHMA Alumni Association home"
                                className={`${focusRing} rounded-xl`}
                            >
                                <BrandMark light={!hasScrolled} />
                            </Link>

                            <div className="hidden items-center gap-4 lg:flex xl:gap-7">
                                {navigation.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className={`${focusRing} rounded text-sm font-semibold transition motion-reduce:transition-none ${hasScrolled ? 'text-brand-text-muted hover:text-brand-accent' : 'text-white/82 hover:text-white'}`}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className={`${focusRing} hidden min-h-10 items-center rounded-lg px-4 text-sm font-bold transition motion-reduce:transition-none sm:inline-flex ${hasScrolled ? 'text-brand-accent hover:bg-brand-surface-soft' : 'text-white hover:bg-white/12'}`}
                                >
                                    {auth.user ? 'Dashboard' : 'Log in'}
                                </Link>
                                {!auth.user && (
                                    <Link
                                        href={register()}
                                        className={`${focusRing} inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-sm font-bold shadow-sm transition motion-reduce:transition-none ${hasScrolled ? 'bg-primary text-primary-foreground hover:bg-sky-400' : 'bg-white text-sky-800 hover:bg-sky-50'}`}
                                    >
                                        Join the network
                                    </Link>
                                )}
                                <details className="group relative lg:hidden">
                                    <summary
                                        aria-label="Open navigation menu"
                                        className={`${focusRing} flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border [&::-webkit-details-marker]:hidden ${hasScrolled ? 'border-brand-border bg-card text-brand-accent' : 'border-white/25 bg-white/10 text-white backdrop-blur-md'}`}
                                    >
                                        <Menu
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </summary>
                                    <div className="absolute top-13 right-0 w-56 rounded-xl border border-brand-border bg-card p-2 shadow-2xl">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                className={`${focusRing} block rounded-lg px-4 py-3 text-sm font-semibold text-brand-text-muted hover:bg-brand-surface-soft hover:text-brand-accent`}
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                        <Link
                                            href={
                                                auth.user
                                                    ? dashboard()
                                                    : login()
                                            }
                                            className={`${focusRing} mt-1 block rounded-lg px-4 py-3 text-sm font-semibold text-brand-accent hover:bg-brand-surface-soft sm:hidden`}
                                        >
                                            {auth.user
                                                ? 'Open dashboard'
                                                : 'Log in'}
                                        </Link>
                                    </div>
                                </details>
                            </div>
                        </nav>
                    </header>

                    <main id="main-content" className="-mt-18">
                        <m.section
                            {...revealMotion('left', shouldReduceMotion)}
                            className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white"
                        >
                            <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.42),transparent_38%),linear-gradient(135deg,#020617,#0f172a_55%,#082f49)]" />
                            {shouldPlayVideo && (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    aria-hidden="true"
                                    className="absolute inset-0 -z-20 size-full object-cover"
                                >
                                    <source
                                        src="/storage/home/hero-bg%20(1).mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            )}
                            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.82)_48%,rgba(8,47,73,0.42)_100%)]" />
                            <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(2,6,23,0.88)_0%,transparent_48%)]" />

                            <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pt-32 pb-14 sm:px-6 sm:pt-36 sm:pb-18 lg:px-8 lg:pt-40 lg:pb-22">
                                <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:gap-10 xl:gap-16">
                                    <div className="max-w-4xl min-w-0">
                                        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.16em] text-sky-100 uppercase backdrop-blur-md">
                                            <Sparkles
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                            One community. Every generation.
                                        </p>
                                        <h1 className="mt-7 max-w-4xl text-4xl leading-[1.04] font-bold tracking-[-0.035em] text-balance sm:text-6xl lg:text-6xl xl:text-7xl">
                                            The digital home of the DMHMA alumni
                                            community.
                                        </h1>
                                        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                                            The DMHMA Alumni Association
                                            Management System brings verified
                                            profiles, official updates, events,
                                            and community opportunities together
                                            in one trusted place.
                                        </p>
                                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                            <Link
                                                href={
                                                    auth.user
                                                        ? dashboard()
                                                        : register()
                                                }
                                                className={`${focusRing} group inline-flex min-h-13 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-extrabold text-sky-800 shadow-xl transition hover:bg-sky-50 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none`}
                                            >
                                                {auth.user
                                                    ? 'Go to your dashboard'
                                                    : 'Create your alumni profile'}
                                                <ArrowRight
                                                    className="size-4 transition motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                            <a
                                                href="#platform"
                                                className={`${focusRing} inline-flex min-h-13 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/8 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15 motion-reduce:transition-none`}
                                            >
                                                Explore the platform
                                                <ChevronRight
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                    <figure className="group relative mx-auto w-full max-w-lg min-w-0 motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-right-6 sm:max-w-xl lg:mx-0 lg:max-w-md lg:justify-self-end xl:max-w-lg">
                                        <div
                                            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-white/18 bg-white/6 backdrop-blur-sm"
                                            aria-hidden="true"
                                        />
                                        <div className="relative aspect-[5612/4000] overflow-hidden rounded-[2rem] border border-white/25 bg-slate-900 shadow-[0_28px_70px_rgba(2,6,23,0.45)]">
                                            <img
                                                src="/storage/hero%20image.jpg"
                                                alt="Campus building surrounded by landscaped grounds"
                                                width="5612"
                                                height="4000"
                                                loading="eager"
                                                fetchPriority="high"
                                                decoding="async"
                                                className="size-full object-cover object-center transition duration-700 ease-out motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(2,6,23,0.86)_0%,transparent_48%)]" />
                                            <figcaption className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/18 bg-slate-950/85 p-3 text-white shadow-lg backdrop-blur-md sm:right-5 sm:bottom-5 sm:left-5 sm:p-3.5">
                                                <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
                                                    <img
                                                        src="/images/dmhma-alumni-logo.png"
                                                        alt=""
                                                        width="44"
                                                        height="44"
                                                        decoding="async"
                                                        className="size-full object-contain"
                                                    />
                                                </span>
                                                <span>
                                                    <span className="block text-sm font-extrabold">
                                                        DMHMA Alumni Association
                                                    </span>
                                                    <span className="mt-0.5 block text-xs text-white/68">
                                                        Connected for life
                                                    </span>
                                                </span>
                                            </figcaption>
                                        </div>
                                    </figure>
                                </div>

                                <dl className="mt-16 grid max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-white/16 bg-white/10 backdrop-blur-xl sm:grid-cols-3">
                                    {liveStats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="border-white/14 px-6 py-5 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
                                        >
                                            <dt className="text-xs font-semibold tracking-wide text-white/65">
                                                {stat.label}
                                            </dt>
                                            <dd className="mt-1 text-3xl font-bold text-white">
                                                {stat.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </m.section>

                        <m.section
                            {...revealMotion('right', shouldReduceMotion, 0.04)}
                            id="about"
                            aria-labelledby="about-heading"
                            className="relative scroll-mt-24 overflow-hidden bg-card px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div
                                className="pointer-events-none absolute top-0 right-0 -z-0 h-36 w-1/3 rounded-bl-[5rem] bg-brand-surface-soft/70"
                                aria-hidden="true"
                            />
                            <div className="relative mx-auto max-w-7xl">
                                <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
                                    <div className="motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
                                        <p className="inline-flex rounded-full bg-brand-accent/10 px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-brand-accent uppercase">
                                            About DMHMA Alumni Association
                                        </p>
                                        <h2
                                            id="about-heading"
                                            className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] font-bold tracking-tight text-brand-primary-strong sm:text-5xl"
                                        >
                                            A legacy of excellence. A future of{' '}
                                            <span className="text-brand-accent">
                                                impact.
                                            </span>
                                        </h2>
                                        <p className="mt-6 max-w-xl text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">
                                            The DMHMA Alumni Association brings
                                            graduates together in a trusted
                                            network where every batch can
                                            reconnect, share opportunities,
                                            support one another, and contribute
                                            to the community that shaped them.
                                        </p>
                                        <a
                                            href="#community"
                                            className={`${focusRing} group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-brand-primary/50 bg-card px-6 text-sm font-extrabold text-brand-accent shadow-sm transition hover:border-brand-primary hover:bg-brand-secondary motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none`}
                                        >
                                            Learn more about us
                                            <ArrowRight
                                                className="size-4 transition motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>

                                    <div className="relative min-h-[31rem] motion-safe:animate-in motion-safe:delay-150 motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-6 sm:min-h-[35rem]">
                                        <figure className="absolute top-0 left-0 h-56 w-[82%] overflow-hidden rounded-3xl border-4 border-card bg-brand-surface-soft shadow-[0_22px_55px_rgba(15,23,42,0.18)] sm:h-[58%] sm:w-[72%]">
                                            <img
                                                src="/storage/hero%20image.jpg"
                                                alt="Campus building surrounded by landscaped grounds"
                                                width="5612"
                                                height="4000"
                                                loading="lazy"
                                                decoding="async"
                                                className="size-full object-cover transition duration-500 motion-safe:hover:scale-[1.025] motion-reduce:transition-none"
                                            />
                                        </figure>

                                        <blockquote className="absolute top-40 right-0 z-10 flex h-56 w-[58%] flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.28)] sm:top-[14%] sm:h-[56%] sm:w-[42%] sm:p-7">
                                            <Quote
                                                className="size-9 fill-brand-accent/30 text-brand-accent"
                                                aria-hidden="true"
                                            />
                                            <p className="relative z-10 font-serif text-lg leading-snug font-bold sm:text-2xl">
                                                “Once a DMHMAN, always a
                                                DMHMAN.”
                                            </p>
                                            <img
                                                src="/images/dmhma-alumni-logo.png"
                                                alt=""
                                                width="112"
                                                height="112"
                                                loading="lazy"
                                                decoding="async"
                                                className="pointer-events-none absolute right-3 bottom-1 size-24 object-contain opacity-10 sm:size-28"
                                            />
                                        </blockquote>

                                        <figure className="absolute bottom-0 left-0 z-20 h-44 w-[54%] rotate-[-2deg] overflow-hidden rounded-2xl border-4 border-card bg-brand-surface-soft shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 motion-reduce:transition-none sm:left-[7%] sm:h-[38%] sm:w-[48%]">
                                            <img
                                                src="/storage/events/events%20(1).jpg"
                                                alt="Graduates sharing a celebratory moment"
                                                width="900"
                                                height="600"
                                                loading="lazy"
                                                decoding="async"
                                                className="size-full object-cover"
                                            />
                                        </figure>
                                    </div>
                                </div>

                                <dl className="mt-14 grid overflow-hidden rounded-2xl border border-brand-border bg-card shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:grid-cols-3 lg:mt-16">
                                    {[
                                        {
                                            value: formatNumber(
                                                stats.totalMembers,
                                            ),
                                            label: 'Verified alumni members',
                                            icon: UsersRound,
                                        },
                                        {
                                            value: formatNumber(
                                                stats.activeBatches,
                                            ),
                                            label: 'Batches represented',
                                            icon: GraduationCap,
                                        },
                                        {
                                            value: formatNumber(
                                                stats.eventsOrganized,
                                            ),
                                            label: 'Events completed',
                                            icon: CalendarDays,
                                        },
                                    ].map((statistic) => {
                                        const Icon = statistic.icon;

                                        return (
                                            <div
                                                key={statistic.label}
                                                className="group flex items-center gap-4 border-brand-border px-6 py-6 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0 lg:px-8"
                                            >
                                                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-surface-soft text-brand-accent transition group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                                                    <Icon
                                                        className="size-6"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <div className="flex flex-col">
                                                    <dt className="order-2 mt-1 text-xs font-semibold text-brand-text-muted sm:text-sm">
                                                        {statistic.label}
                                                    </dt>
                                                    <dd className="order-1 text-2xl font-extrabold text-brand-text sm:text-3xl">
                                                        {statistic.value}
                                                    </dd>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </dl>
                            </div>
                        </m.section>

                        <m.section
                            {...revealMotion('left', shouldReduceMotion, 0.05)}
                            id="platform"
                            className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div className="mx-auto max-w-7xl">
                                <SectionHeading
                                    eyebrow="Built for belonging"
                                    title="Everything the association needs to stay connected."
                                    description="A clear, dependable platform for managing alumni relationships and keeping every generation informed and involved."
                                />
                                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                                    {features.map((feature, index) => {
                                        const Icon = feature.icon;

                                        return (
                                            <article
                                                key={feature.title}
                                                className="group rounded-2xl border border-brand-border bg-card p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition hover:border-brand-primary/60 hover:shadow-[0_18px_45px_rgba(14,165,233,0.12)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-surface-soft text-brand-accent transition group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                                                        <Icon
                                                            className="size-6"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                    <span className="text-xs font-bold text-brand-border">
                                                        0{index + 1}
                                                    </span>
                                                </div>
                                                <h3 className="mt-6 text-xl font-bold text-brand-text">
                                                    {feature.title}
                                                </h3>
                                                <p className="mt-3 text-sm leading-6 text-brand-text-muted">
                                                    {feature.description}
                                                </p>
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </m.section>

                        <section
                            id="community"
                            className="scroll-mt-24 bg-card px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                                <m.div
                                    {...revealMotion(
                                        'up',
                                        shouldReduceMotion,
                                        0.04,
                                    )}
                                    className="relative isolate overflow-hidden rounded-3xl p-8 text-white shadow-2xl sm:p-10"
                                >
                                    <img
                                        src="/storage/alumni%20(5).jpg"
                                        alt=""
                                        width="3800"
                                        height="2138"
                                        loading="lazy"
                                        decoding="async"
                                        aria-hidden="true"
                                        className="absolute inset-0 -z-20 size-full object-cover object-center"
                                    />
                                    <div
                                        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,47,73,0.48)_0%,rgba(2,6,23,0.88)_100%)]"
                                        aria-hidden="true"
                                    />
                                    <div className="absolute top-0 right-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-accent/35 blur-3xl" />
                                    <img
                                        src="/images/dmhma-alumni-logo.png"
                                        alt="DMHMA Alumni Association emblem"
                                        width="176"
                                        height="176"
                                        loading="lazy"
                                        decoding="async"
                                        className="relative z-10 size-32 rounded-2xl bg-white object-contain p-3 shadow-xl sm:size-40"
                                    />
                                    <p className="relative z-10 mt-8 text-xs font-bold tracking-[0.2em] text-brand-secondary uppercase">
                                        Rooted in DMHMA
                                    </p>
                                    <p className="relative z-10 mt-3 max-w-md text-2xl leading-snug font-bold sm:text-3xl">
                                        A lifelong network built on shared
                                        memories, mutual respect, and service.
                                    </p>
                                </m.div>

                                <m.div
                                    {...revealMotion(
                                        'right',
                                        shouldReduceMotion,
                                        0.1,
                                    )}
                                >
                                    <SectionHeading
                                        eyebrow="More than a directory"
                                        title="Turn school connections into lifelong community."
                                        description="DMHMA shaped friendships and values that extend far beyond the classroom. The association gives those connections a trusted place to continue."
                                        align="left"
                                    />
                                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                                        {[
                                            'Reconnect across batches and locations',
                                            'Keep member information organized and current',
                                            'Discover official events and announcements',
                                            'Create pathways for mentorship and support',
                                        ].map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-sm font-semibold text-brand-text"
                                            >
                                                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-brand-accent-strong">
                                                    <Check
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <span className="leading-6">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </m.div>
                            </div>
                        </section>

                        <m.section
                            {...revealMotion('up', shouldReduceMotion, 0.04)}
                            id="events"
                            aria-labelledby="events-heading"
                            className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div className="mx-auto max-w-7xl">
                                <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="inline-flex rounded-full bg-brand-accent/10 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-brand-accent uppercase">
                                            Upcoming events
                                        </p>
                                        <h2
                                            id="events-heading"
                                            className="mt-4 font-serif text-3xl leading-tight font-bold tracking-tight text-brand-primary-strong sm:text-4xl lg:text-5xl"
                                        >
                                            Stay{' '}
                                            <span className="text-brand-accent">
                                                connected,
                                            </span>{' '}
                                            stay involved.
                                        </h2>
                                    </div>

                                    <a
                                        href="#updates"
                                        className={`${focusRing} group inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-full border border-brand-primary/50 bg-card px-6 text-sm font-extrabold text-brand-accent shadow-sm transition hover:border-brand-primary hover:bg-brand-secondary motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none`}
                                    >
                                        View all events
                                        <ArrowRight
                                            className="size-4 transition motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </div>

                                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {upcomingEvents.map((event) => (
                                        <article
                                            key={event.id}
                                            aria-labelledby={`event-${event.id}`}
                                            className="group flex overflow-hidden rounded-2xl border border-brand-border bg-card shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:border-brand-primary/50 hover:shadow-[0_20px_50px_rgba(14,165,233,0.13)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none md:flex-col"
                                        >
                                            <div className="relative w-32 shrink-0 overflow-hidden bg-brand-surface-soft sm:w-44 md:aspect-[16/9] md:w-full">
                                                <img
                                                    src={event.imagePath}
                                                    alt={event.imageAlt ?? ''}
                                                    width="720"
                                                    height="405"
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="size-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none"
                                                />
                                                <time
                                                    dateTime={event.eventDate}
                                                    aria-label={formatDate(
                                                        event.eventDate,
                                                    )}
                                                    className="absolute top-3 left-3 flex min-w-14 flex-col items-center rounded-xl border border-card/80 bg-card/95 px-2.5 py-2 text-center shadow-lg backdrop-blur-sm"
                                                >
                                                    <span className="font-serif text-2xl leading-none font-extrabold text-brand-primary-strong">
                                                        {formatEventDay(
                                                            event.eventDate,
                                                        )}
                                                    </span>
                                                    <span className="mt-1 text-[0.65rem] font-extrabold tracking-[0.14em] text-brand-accent">
                                                        {formatEventMonth(
                                                            event.eventDate,
                                                        )}
                                                    </span>
                                                </time>
                                            </div>

                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <div className="flex-1 p-5 sm:p-6">
                                                    <h3
                                                        id={`event-${event.id}`}
                                                        className="font-serif text-lg leading-snug font-bold text-brand-primary-strong sm:text-xl"
                                                    >
                                                        {event.title}
                                                    </h3>
                                                    <div className="mt-4 grid gap-3 text-sm text-brand-text-muted">
                                                        <p className="flex items-start gap-2">
                                                            <Clock3
                                                                className="mt-0.5 size-4 shrink-0 text-brand-accent"
                                                                aria-hidden="true"
                                                            />
                                                            <span>
                                                                <time
                                                                    dateTime={
                                                                        event.eventDate
                                                                    }
                                                                >
                                                                    {formatDate(
                                                                        event.eventDate,
                                                                    )}
                                                                </time>{' '}
                                                                <span aria-hidden="true">
                                                                    ·
                                                                </span>{' '}
                                                                {formatEventTime(
                                                                    event.eventDate,
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p className="flex items-start gap-2">
                                                            <MapPin
                                                                className="mt-0.5 size-4 shrink-0 text-brand-accent"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="leading-5">
                                                                {event.location}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <Link
                                                    href={
                                                        auth.user
                                                            ? dashboard()
                                                            : register()
                                                    }
                                                    aria-label={`Register for ${event.title}`}
                                                    className={`${focusRing} group/action flex min-h-13 items-center justify-between gap-3 border-t border-brand-border px-5 text-sm font-extrabold text-brand-accent transition hover:bg-brand-surface-soft motion-reduce:transition-none sm:px-6`}
                                                >
                                                    Register now
                                                    <ArrowRight
                                                        className="size-4 transition motion-safe:group-hover/action:translate-x-1 motion-reduce:transition-none"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </m.section>

                        <m.section
                            {...revealMotion('up', shouldReduceMotion, 0.08)}
                            id="updates"
                            className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div className="mx-auto max-w-7xl">
                                <SectionHeading
                                    eyebrow="From the association"
                                    title="Stay close to what is happening."
                                    description="See the next gathering and the latest official notices from the DMHMA Alumni Association."
                                />

                                <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                                    <article className="group relative min-h-[26rem] overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-10">
                                        {nextEventImagePath && (
                                            <img
                                                src={nextEventImagePath}
                                                alt={
                                                    isGrandAlumniReunion
                                                        ? 'DMHMA alumni celebrating together at a reunion event'
                                                        : ''
                                                }
                                                loading="lazy"
                                                decoding="async"
                                                className={`absolute inset-0 size-full object-cover ${isGrandAlumniReunion ? 'transition duration-700 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none' : ''}`}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,6,23,0.97),rgba(8,47,73,0.58))]" />
                                        <div className="relative flex h-full flex-col justify-between">
                                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.16em] uppercase backdrop-blur">
                                                <CalendarDays
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                                {nextEvent
                                                    ? 'Next event'
                                                    : 'Events'}
                                            </span>
                                            <div className="mt-16">
                                                <h3 className="max-w-2xl text-3xl leading-tight font-bold sm:text-4xl">
                                                    {nextEvent?.title ??
                                                        'The next alumni event will appear here.'}
                                                </h3>
                                                {nextEvent ? (
                                                    <div className="mt-6 flex flex-col gap-3 text-sm text-white/78 sm:flex-row sm:flex-wrap sm:gap-6">
                                                        <p className="flex items-center gap-2">
                                                            <CalendarDays
                                                                className="size-4"
                                                                aria-hidden="true"
                                                            />
                                                            {formatDate(
                                                                nextEvent.event_date,
                                                            )}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <MapPin
                                                                className="size-4"
                                                                aria-hidden="true"
                                                            />
                                                            {nextEvent.location}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
                                                        There is no published
                                                        upcoming event yet.
                                                        Registered members can
                                                        return here for official
                                                        schedules and details.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </article>

                                    <div className="rounded-3xl border border-brand-border bg-card p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-bold tracking-[0.18em] text-brand-accent uppercase">
                                                    Notice board
                                                </p>
                                                <h3 className="mt-2 text-2xl font-bold text-brand-text">
                                                    Latest updates
                                                </h3>
                                            </div>
                                            <BellRing
                                                className="size-7 text-brand-accent"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        {notices.length > 0 ? (
                                            <div className="mt-6 divide-y divide-brand-border">
                                                {notices.map((notice) => (
                                                    <article
                                                        key={notice.id}
                                                        className="py-5 first:pt-0 last:pb-0"
                                                    >
                                                        <div className="flex items-center gap-3 text-xs font-bold tracking-wide text-brand-text-muted uppercase">
                                                            <span className="text-brand-accent">
                                                                {
                                                                    notice.category
                                                                }
                                                            </span>
                                                            <span aria-hidden="true">
                                                                •
                                                            </span>
                                                            <time
                                                                dateTime={
                                                                    notice.created_at
                                                                }
                                                            >
                                                                {formatDate(
                                                                    notice.created_at,
                                                                )}
                                                            </time>
                                                        </div>
                                                        <h4 className="mt-2 text-base leading-6 font-bold text-brand-text">
                                                            {notice.title}
                                                        </h4>
                                                    </article>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="mt-8 rounded-2xl bg-brand-surface-soft p-6">
                                                <p className="font-bold text-brand-text">
                                                    No notices have been
                                                    published yet.
                                                </p>
                                                <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                                                    Official association
                                                    announcements will be listed
                                                    here as soon as they are
                                                    available.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </m.section>

                        <m.section
                            {...revealMotion('right', shouldReduceMotion, 0.04)}
                            id="testimonials"
                            className="scroll-mt-24 bg-card px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div className="mx-auto max-w-7xl">
                                <div>
                                    <div>
                                        <p className="inline-flex rounded-full bg-brand-success/10 px-3 py-1 text-[0.68rem] font-extrabold tracking-[0.14em] text-brand-success uppercase">
                                            Voices of our alumni
                                        </p>
                                        <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight font-bold tracking-tight text-brand-primary-strong sm:text-4xl lg:text-5xl">
                                            We Are{' '}
                                            <span className="text-brand-success">
                                                Proud
                                            </span>{' '}
                                            to Be DMHMA Alumni
                                        </h2>
                                    </div>
                                </div>

                                <TestimonialsMarquee
                                    testimonials={testimonials}
                                    direction="left"
                                    speed={36}
                                    gap={20}
                                    className="mt-7"
                                />
                            </div>
                        </m.section>

                        <m.section
                            {...revealMotion('up', shouldReduceMotion, 0.05)}
                            id="donate"
                            className="relative isolate scroll-mt-24 overflow-hidden bg-brand-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
                        >
                            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_16%,rgba(14,165,233,0.12),transparent_24%),radial-gradient(circle_at_92%_84%,rgba(15,23,42,0.08),transparent_25%)]" />
                            <div className="pointer-events-none absolute top-12 left-1/2 -z-10 h-32 w-[min(90%,72rem)] -translate-x-1/2 bg-[radial-gradient(circle,rgba(14,165,233,0.18)_1px,transparent_1px)] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] bg-[size:18px_18px] opacity-45" />

                            <div className="mx-auto max-w-7xl">
                                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                                    <div>
                                        <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-card px-3.5 py-2 text-[0.68rem] font-extrabold tracking-[0.16em] text-brand-accent uppercase shadow-sm">
                                            <Heart
                                                className="size-3.5 fill-brand-accent/15"
                                                aria-hidden="true"
                                            />
                                            A legacy of giving
                                        </p>
                                        <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight font-bold tracking-tight text-brand-text sm:text-4xl lg:text-5xl">
                                            Turn gratitude into{' '}
                                            <span className="text-brand-primary-strong">
                                                lasting opportunity.
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="lg:pb-1 lg:pl-8">
                                        <p className="max-w-2xl text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">
                                            Give back to the community that
                                            helped shape us. Every contribution
                                            can open doors, strengthen alumni
                                            initiatives, and help DMHMA care for
                                            its wider family.
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2.5">
                                            {[
                                                'Alumni-led priorities',
                                                'Purpose-based giving',
                                                'Direct confirmation',
                                            ].map((item) => (
                                                <span
                                                    key={item}
                                                    className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-card px-3 py-1.5 text-xs font-bold text-brand-text shadow-sm"
                                                >
                                                    <Check
                                                        className="size-3.5 text-brand-success"
                                                        strokeWidth={3}
                                                        aria-hidden="true"
                                                    />
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 overflow-hidden rounded-[2rem] border border-brand-primary/25 bg-card shadow-[0_28px_80px_rgba(15,23,42,0.13)] lg:grid lg:grid-cols-[1.16fr_0.84fr]">
                                    <div className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#020617_0%,#0f172a_52%,#0c4a6e_100%)] px-6 py-9 text-white sm:px-9 sm:py-11 lg:px-12 lg:py-14">
                                        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_88%_12%,rgba(56,189,248,0.32),transparent_25%),radial-gradient(circle_at_4%_100%,rgba(14,165,233,0.28),transparent_30%)]" />
                                        <div className="pointer-events-none absolute -right-14 -bottom-20 -z-10 size-72 rounded-full border-[44px] border-white/6" />

                                        <div className="flex size-13 items-center justify-center rounded-2xl border border-white/18 bg-white/12 shadow-lg backdrop-blur-sm">
                                            <HandCoins
                                                className="size-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p className="mt-7 text-xs font-extrabold tracking-[0.2em] text-white/65 uppercase">
                                            Your gift can support
                                        </p>

                                        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                            {[
                                                {
                                                    title: 'Student opportunity',
                                                    description:
                                                        'Help remove barriers for promising learners.',
                                                    icon: GraduationCap,
                                                },
                                                {
                                                    title: 'Community care',
                                                    description:
                                                        'Stand beside members when support matters most.',
                                                    icon: HeartHandshake,
                                                },
                                                {
                                                    title: 'Alumni initiatives',
                                                    description:
                                                        'Strengthen programs that keep generations connected.',
                                                    icon: UsersRound,
                                                },
                                            ].map((item) => {
                                                const ImpactIcon = item.icon;

                                                return (
                                                    <article
                                                        key={item.title}
                                                        className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm"
                                                    >
                                                        <ImpactIcon
                                                            className="size-5 text-sky-200"
                                                            aria-hidden="true"
                                                        />
                                                        <h3 className="mt-4 text-sm font-extrabold text-white">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-2 text-xs leading-5 text-white/68">
                                                            {item.description}
                                                        </p>
                                                    </article>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-7 flex items-start gap-3 border-t border-white/12 pt-6 text-sm leading-6 text-white/72">
                                            <ShieldCheck
                                                className="mt-0.5 size-5 shrink-0 text-sky-200"
                                                aria-hidden="true"
                                            />
                                            <p>
                                                An association representative
                                                will confirm the purpose and
                                                approved payment details with
                                                you directly before you
                                                contribute.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center px-6 py-9 sm:px-9 sm:py-11 lg:px-10 lg:py-14 xl:px-12">
                                        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-surface-soft text-brand-primary-strong ring-1 ring-brand-primary/10">
                                            <Heart
                                                className="size-5 fill-brand-primary/10"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <p className="mt-6 text-xs font-extrabold tracking-[0.18em] text-brand-accent uppercase">
                                            Give with confidence
                                        </p>
                                        <h3 className="mt-3 font-serif text-2xl leading-tight font-bold text-brand-text sm:text-3xl">
                                            Start with a conversation.
                                        </h3>
                                        <p className="mt-4 text-sm leading-6 text-brand-text-muted sm:text-base sm:leading-7">
                                            Tell us what you would like your
                                            gift to support. Our donation desk
                                            will guide you through the verified
                                            next steps.
                                        </p>

                                        <div className="mt-7 grid gap-3">
                                            <a
                                                href="mailto:admin@dmhma.edu.bd?subject=I%20would%20like%20to%20support%20DMHMA"
                                                className={`${focusRing} group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-primary px-6 text-sm font-extrabold text-primary-foreground shadow-[0_12px_30px_rgba(14,165,233,0.24)] transition hover:bg-sky-400 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none`}
                                            >
                                                Donate Now
                                                <ArrowRight
                                                    className="size-4 transition motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                            <a
                                                href="https://wa.me/8801712760903?text=Hello%20DMHMA%20Alumni%20Association%2C%20I%20would%20like%20to%20make%20a%20donation."
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="Contact the donation desk on WhatsApp at +880 1712-760903"
                                                className={`${focusRing} inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-border bg-card px-6 text-sm font-bold text-brand-text transition hover:border-brand-primary/60 hover:bg-brand-surface-soft motion-reduce:transition-none`}
                                            >
                                                <MessageCircle
                                                    className="size-4 text-brand-success"
                                                    aria-hidden="true"
                                                />
                                                WhatsApp +880 1712-760903
                                            </a>
                                        </div>

                                        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-5 text-brand-text-muted">
                                            <ShieldCheck
                                                className="size-3.5 shrink-0 text-brand-success"
                                                aria-hidden="true"
                                            />
                                            No payment is collected on this
                                            page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </m.section>

                        <m.section
                            {...revealMotion('scale', shouldReduceMotion, 0.08)}
                            aria-labelledby="final-cta-title"
                            className="bg-card px-4 py-10"
                        >
                            <div className="mx-auto max-w-7xl">
                                <m.div
                                    {...revealMotion(
                                        'scale',
                                        shouldReduceMotion,
                                        0.12,
                                    )}
                                    className="mt-10 overflow-hidden rounded-2xl bg-slate-950 text-white shadow-[0_22px_55px_rgba(15,23,42,0.28)]"
                                >
                                    <div className="relative isolate grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-11">
                                        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_35%,rgba(14,165,233,0.45),transparent_28%),linear-gradient(105deg,#020617_0%,#0f172a_62%,#0c4a6e_100%)]" />
                                        <img
                                            src="/images/dmhma-alumni-logo.png"
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="pointer-events-none absolute top-1/2 right-8 -z-10 hidden size-72 -translate-y-1/2 object-contain opacity-[0.09] md:block"
                                        />
                                        <div>
                                            <h2
                                                id="final-cta-title"
                                                className="font-serif text-3xl leading-tight font-bold sm:text-4xl"
                                            >
                                                Be a Part of Something Greater
                                            </h2>
                                            <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 sm:text-base">
                                                Join generations of DMHMA
                                                alumni, reconnect with your
                                                roots, and help build a
                                                community that moves forward
                                                together.
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                                            <Link
                                                href={
                                                    auth.user
                                                        ? dashboard()
                                                        : register()
                                                }
                                                className={`${focusRing} group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-7 text-sm font-extrabold text-primary-foreground shadow-lg transition hover:bg-sky-400 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none`}
                                            >
                                                {auth.user
                                                    ? 'Open Dashboard'
                                                    : 'Join Now'}
                                                <ArrowRight
                                                    className="size-4 transition motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                            <a
                                                href="#community"
                                                className={`${focusRing} inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-extrabold text-sky-800 shadow-lg transition hover:bg-sky-50 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none`}
                                            >
                                                Our Community
                                                <Heart
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </m.div>
                            </div>
                        </m.section>
                    </main>

                    <m.footer
                        {...revealMotion('scale', shouldReduceMotion, 0.04)}
                        className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(14,165,233,0.16),transparent_32%)]" />
                        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-x-12 xl:grid-cols-[1.15fr_0.75fr_0.75fr_1.05fr_1.1fr] xl:gap-0 xl:px-8 xl:py-18">
                            <section className="md:col-span-2 xl:col-span-1 xl:pr-9">
                                <Link
                                    href={home()}
                                    aria-label="DMHMA Alumni Association home"
                                    className={`${focusRing} inline-flex rounded-xl ring-offset-slate-950`}
                                >
                                    <BrandMark light />
                                </Link>
                                <p className="mt-5 max-w-xs text-sm leading-6 text-white/68">
                                    Connecting DMHMA alumni across generations
                                    and building a stronger, more supportive
                                    community together.
                                </p>
                                <div
                                    className="mt-6 flex items-center gap-2.5"
                                    role="group"
                                    aria-label="Find DMHMA Alumni Association on social media"
                                >
                                    {[
                                        {
                                            label: 'Facebook',
                                            href: 'https://www.facebook.com/search/top?q=DMHMA%20Alumni%20Association',
                                            icon: Facebook,
                                        },
                                        {
                                            label: 'LinkedIn',
                                            href: 'https://www.linkedin.com/search/results/all/?keywords=DMHMA%20Alumni%20Association',
                                            icon: Linkedin,
                                        },
                                        {
                                            label: 'YouTube',
                                            href: 'https://www.youtube.com/results?search_query=DMHMA+Alumni+Association',
                                            icon: Youtube,
                                        },
                                        {
                                            label: 'Instagram',
                                            href: 'https://www.instagram.com/explore/search/keyword/?q=dmhma%20alumni',
                                            icon: Instagram,
                                        },
                                    ].map((social) => {
                                        const SocialIcon = social.icon;

                                        return (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`Find DMHMA Alumni Association on ${social.label}`}
                                                className={`${focusRing} flex size-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-sky-400 hover:bg-sky-500 hover:text-slate-950 motion-reduce:transition-none`}
                                            >
                                                <SocialIcon
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        );
                                    })}
                                </div>
                            </section>

                            <section className="xl:border-l xl:border-white/10 xl:px-8">
                                <h2 className="text-sm font-bold text-white">
                                    Quick Links
                                </h2>
                                <nav
                                    aria-label="Footer quick links"
                                    className="mt-5 grid gap-3"
                                >
                                    {[
                                        { label: 'About Us', href: '#about' },
                                        {
                                            label: 'Platform',
                                            href: '#platform',
                                        },
                                        { label: 'Events', href: '#events' },
                                        {
                                            label: 'News & Notices',
                                            href: '#updates',
                                        },
                                        {
                                            label: 'Testimonials',
                                            href: '#testimonials',
                                        },
                                    ].map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className={`${focusRing} w-fit rounded text-sm text-white/68 transition hover:text-white motion-reduce:transition-none`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            </section>

                            <section className="xl:border-l xl:border-white/10 xl:px-8">
                                <h2 className="text-sm font-bold text-white">
                                    Resources
                                </h2>
                                <nav
                                    aria-label="Footer resources"
                                    className="mt-5 grid gap-3"
                                >
                                    <Link
                                        href={
                                            auth.user ? dashboard() : register()
                                        }
                                        className={`${focusRing} w-fit rounded text-sm text-white/68 transition hover:text-white motion-reduce:transition-none`}
                                    >
                                        Alumni profile
                                    </Link>
                                    <Link
                                        href={auth.user ? dashboard() : login()}
                                        className={`${focusRing} w-fit rounded text-sm text-white/68 transition hover:text-white motion-reduce:transition-none`}
                                    >
                                        {auth.user
                                            ? 'Member dashboard'
                                            : 'Member login'}
                                    </Link>
                                    {!auth.user && (
                                        <Link
                                            href={register()}
                                            className={`${focusRing} w-fit rounded text-sm text-white/68 transition hover:text-white motion-reduce:transition-none`}
                                        >
                                            Join the association
                                        </Link>
                                    )}
                                    <a
                                        href="mailto:admin@dmhma.edu.bd?subject=DMHMA%20Alumni%20Support"
                                        className={`${focusRing} w-fit rounded text-sm text-white/68 transition hover:text-white motion-reduce:transition-none`}
                                    >
                                        Help &amp; support
                                    </a>
                                </nav>
                            </section>

                            <section className="xl:border-l xl:border-white/10 xl:px-8">
                                <h2 className="text-sm font-bold text-white">
                                    Contact Us
                                </h2>
                                <address className="mt-5 grid gap-4 text-sm leading-6 text-white/68 not-italic">
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Dr.%20Makbul%20Hossain%20Memorial%20Academy%2C%20Malijhikanda%2C%20Jhenaigati%2C%20Sherpur%2C%20Bangladesh"
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`${focusRing} flex items-start gap-3 rounded transition hover:text-white motion-reduce:transition-none`}
                                    >
                                        <MapPin
                                            className="mt-0.5 size-4 shrink-0 text-brand-secondary"
                                            aria-hidden="true"
                                        />
                                        <span>
                                            Malijhikanda, Jhenaigati
                                            <br />
                                            Sherpur, Bangladesh
                                        </span>
                                    </a>
                                    <a
                                        href="tel:+8801712760903"
                                        className={`${focusRing} flex items-center gap-3 rounded transition hover:text-white motion-reduce:transition-none`}
                                    >
                                        <Phone
                                            className="size-4 shrink-0 text-brand-secondary"
                                            aria-hidden="true"
                                        />
                                        +880 1712-760903
                                    </a>
                                    <a
                                        href="mailto:admin@dmhma.edu.bd"
                                        className={`${focusRing} flex items-center gap-3 rounded transition hover:text-white motion-reduce:transition-none`}
                                    >
                                        <Mail
                                            className="size-4 shrink-0 text-brand-secondary"
                                            aria-hidden="true"
                                        />
                                        admin@dmhma.edu.bd
                                    </a>
                                </address>
                            </section>

                            <section className="md:col-span-2 xl:col-span-1 xl:border-l xl:border-white/10 xl:pl-8">
                                <h2 className="text-sm font-bold text-white">
                                    Newsletter
                                </h2>
                                <p className="mt-5 max-w-sm text-sm leading-6 text-white/68">
                                    Get association news, event announcements,
                                    and community updates in your inbox.
                                </p>
                                <Form
                                    action={subscribe()}
                                    resetOnSuccess
                                    className="mt-5"
                                >
                                    {({
                                        errors,
                                        processing,
                                        recentlySuccessful,
                                    }) => (
                                        <>
                                            <div className="flex gap-2">
                                                <label
                                                    htmlFor="newsletter-email"
                                                    className="sr-only"
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    id="newsletter-email"
                                                    name="email"
                                                    type="email"
                                                    inputMode="email"
                                                    autoComplete="email"
                                                    required
                                                    placeholder="Enter your email"
                                                    aria-invalid={
                                                        errors.email
                                                            ? true
                                                            : undefined
                                                    }
                                                    aria-describedby="newsletter-status"
                                                    className={`${focusRing} min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3.5 text-sm text-slate-950 ring-offset-slate-950 placeholder:text-slate-500`}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    aria-label="Subscribe to the DMHMA alumni newsletter"
                                                    className={`${focusRing} flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none`}
                                                >
                                                    <Send
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                            <p
                                                id="newsletter-status"
                                                aria-live="polite"
                                                className={`mt-2 min-h-5 text-xs ${errors.email ? 'text-red-200' : 'text-emerald-200'}`}
                                            >
                                                {errors.email ??
                                                    (recentlySuccessful
                                                        ? 'Thanks — you are subscribed.'
                                                        : '')}
                                            </p>
                                        </>
                                    )}
                                </Form>
                            </section>
                        </div>

                        <div className="relative border-t border-white/10">
                            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                                <p>
                                    © {new Date().getFullYear()} DMHMA Alumni
                                    Association. All rights reserved.
                                </p>
                                <p className="flex items-center gap-1.5">
                                    Designed &amp; developed with
                                    <Heart
                                        className="size-3.5 fill-red-500 text-red-500"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">care</span>
                                    for the DMHMA community
                                </p>
                            </div>
                        </div>
                    </m.footer>
                </div>
            </LazyMotion>
        </>
    );
}
