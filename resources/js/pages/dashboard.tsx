import { Head, Link, usePage } from '@inertiajs/react';
import {
    CalendarDays,
    Check,
    ChevronRight,
    CircleUserRound,
    Clock3,
    CreditCard,
    Download,
    Droplets,
    GraduationCap,
    HandHeart,
    Heart,
    LogIn,
    MapPin,
    QrCode,
    RefreshCw,
    ShieldCheck,
    UserRound,
    UsersRound,
    WalletCards,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import BatchSelectionModal from '@/components/batch-selection-modal';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { dashboard } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';

type Tone = 'accent' | 'error' | 'primary' | 'purple' | 'success' | 'warning';

const toneClasses: Record<Tone, string> = {
    accent: 'bg-brand-accent/10 text-brand-accent',
    error: 'bg-brand-error/10 text-brand-error',
    primary: 'bg-brand-primary/15 text-brand-accent',
    purple: 'bg-brand-purple/10 text-brand-purple',
    success: 'bg-brand-success/10 text-brand-success',
    warning: 'bg-brand-warning/10 text-brand-warning',
};

const toneTextClasses: Record<Tone, string> = {
    accent: 'text-brand-accent',
    error: 'text-brand-error',
    primary: 'text-brand-accent',
    purple: 'text-brand-purple',
    success: 'text-brand-success',
    warning: 'text-brand-warning',
};

const quickActions: Array<{
    icon: LucideIcon;
    label: string;
    tone: Tone;
    href?: ReturnType<typeof profileEdit>;
}> = [
    {
        icon: UserRound,
        label: 'Update Profile',
        tone: 'primary',
        href: profileEdit(),
    },
    { icon: CalendarDays, label: 'Events', tone: 'purple' },
    { icon: CreditCard, label: 'Payments', tone: 'success' },
    { icon: Heart, label: 'Donations', tone: 'error' },
    { icon: UsersRound, label: 'Directory', tone: 'primary' },
    { icon: GraduationCap, label: 'Scholarship', tone: 'purple' },
    { icon: Droplets, label: 'Blood Donation', tone: 'error' },
];

const events = [
    {
        title: 'Annual Reunion 2025',
        date: '20 June 2025, Friday',
        time: '6:00 PM – 10:00 PM',
        location: 'DMHMA School Ground',
        image: '/storage/events/events%20(1).jpg',
    },
    {
        title: 'Eid Reunion & Dinner',
        date: '12 July 2025, Saturday',
        time: '7:00 PM – 11:00 PM',
        location: 'City Convention Hall',
        image: '/storage/events/events%20(2).jpg',
    },
];

const notices = [
    ['Annual Reunion 2025 – Registration Open', '10 May 2025'],
    ['Scholarship Program 2025 – Apply Now', '08 May 2025'],
    ['New Job Circular: IT Officer', '05 May 2025'],
];

const activities = [
    {
        icon: LogIn,
        label: 'Logged in to the system',
        time: 'Today, 09:15 AM',
        tone: 'success' as Tone,
    },
    {
        icon: UserRound,
        label: 'Updated your profile',
        time: 'Yesterday, 11:40 AM',
        tone: 'warning' as Tone,
    },
    {
        icon: CalendarDays,
        label: 'Registered for Annual Reunion 2025',
        time: '10 May 2025, 08:30 PM',
        tone: 'warning' as Tone,
    },
];

function Panel({
    title,
    action,
    children,
    className = '',
}: {
    title: string;
    action?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}
        >
            <header className="flex h-14 items-center justify-between gap-4 border-b border-border px-5">
                <h2 className="text-sm font-bold text-card-foreground">
                    {title}
                </h2>
                {action && (
                    <button
                        type="button"
                        className="text-xs font-semibold text-brand-accent transition-colors hover:text-brand-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        {action}
                    </button>
                )}
            </header>
            {children}
        </section>
    );
}

function SummaryCard({
    title,
    value,
    detail,
    icon: Icon,
    tone,
    badge,
}: {
    title: string;
    value: string;
    detail: string;
    icon: LucideIcon;
    tone: Tone;
    badge?: string;
}) {
    return (
        <article className="flex min-h-32 items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="min-w-0 self-stretch">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-card-foreground">
                        {title}
                    </h2>
                    {badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-success/10 px-2 py-1 text-xs font-semibold text-brand-success">
                            <Check className="size-3" aria-hidden="true" />
                            {badge}
                        </span>
                    )}
                </div>
                <p
                    className={`mt-5 truncate text-lg leading-none font-bold ${toneTextClasses[tone]}`}
                >
                    {value}
                </p>
                <p className="mt-3 truncate text-xs text-muted-foreground">
                    {detail}
                </p>
            </div>
            <span
                className={`grid size-14 shrink-0 place-items-center rounded-full ${toneClasses[tone]}`}
            >
                <Icon className="size-7" aria-hidden="true" />
            </span>
        </article>
    );
}

function MemberIdentityCard({
    name,
    avatarSource,
    memberId,
}: {
    name: string;
    avatarSource: string;
    memberId: string;
}) {
    return (
        <div className="flex min-h-64 flex-col items-center rounded-xl border border-border bg-card px-4 py-3 text-center shadow-sm">
            <div className="flex w-full items-center gap-2 text-left">
                <img
                    src="/images/dmhma-alumni-logo.png"
                    alt=""
                    className="size-8 object-contain"
                />
                <span className="text-xs font-bold text-brand-accent">
                    DMHMA Alumni Association
                </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-muted-foreground">
                MEMBER CARD
            </p>
            <Avatar className="mt-3 size-16 border-4 border-muted bg-card">
                <AvatarImage
                    src={avatarSource}
                    alt={name}
                    className="object-cover"
                />
            </Avatar>
            <p className="mt-3 max-w-full truncate text-xs font-bold text-card-foreground">
                {name}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{memberId}</p>
            <QrCode
                className="mt-3 size-10 text-card-foreground"
                aria-hidden="true"
            />
        </div>
    );
}

function MembershipOverview({
    name,
    avatarSource,
    memberId,
    memberSince,
    validUntil,
}: {
    name: string;
    avatarSource: string;
    memberId: string;
    memberSince: string;
    validUntil: string;
}) {
    return (
        <Panel title="Membership Overview" className="h-full">
            <div className="p-5 pb-4">
                <div className="grid gap-4 rounded-lg border border-brand-success/30 bg-brand-success/5 p-4 sm:grid-cols-2">
                    <div className="flex min-h-64 flex-col">
                        <div className="flex items-center gap-3 text-brand-success">
                            <ShieldCheck
                                className="size-6"
                                aria-hidden="true"
                            />
                            <h3 className="text-base font-bold">
                                General Member
                            </h3>
                        </div>
                        <dl className="mt-5 divide-y divide-border text-xs">
                            <div className="pb-3">
                                <dt className="text-muted-foreground">
                                    Membership Fee
                                </dt>
                                <dd className="mt-1 font-bold text-card-foreground">
                                    ৳ 500 / Year
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3 py-3">
                                <dt>Status</dt>
                                <dd className="font-semibold text-brand-success">
                                    Active
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-3 py-3">
                                <dt>Valid From</dt>
                                <dd className="font-medium">{memberSince}</dd>
                            </div>
                            <div className="flex items-center justify-between gap-3 py-3">
                                <dt>Valid Until</dt>
                                <dd className="font-medium">{validUntil}</dd>
                            </div>
                        </dl>
                        <button
                            type="button"
                            className="mt-auto flex h-10 items-center justify-center gap-2 rounded-md bg-brand-success px-4 text-xs font-bold text-brand-success-foreground shadow-sm transition-colors hover:bg-brand-success/90 focus-visible:ring-2 focus-visible:ring-brand-success focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            <RefreshCw className="size-4" aria-hidden="true" />
                            Renew Membership
                        </button>
                    </div>
                    <MemberIdentityCard
                        name={name}
                        avatarSource={avatarSource}
                        memberId={memberId}
                    />
                </div>
                <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-semibold text-brand-accent transition-colors hover:text-brand-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                    <Download className="size-4" aria-hidden="true" />
                    Download Digital Member Card
                </button>
            </div>
        </Panel>
    );
}

function UpcomingEvents() {
    return (
        <Panel title="Upcoming Events" action="View All" className="h-full">
            <div className="divide-y divide-border px-5">
                {events.map((event) => (
                    <article
                        key={event.title}
                        className="flex items-center gap-4 py-4"
                    >
                        <img
                            src={event.image}
                            alt=""
                            className="size-24 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-bold text-card-foreground">
                                {event.title}
                            </h3>
                            <div className="mt-2 grid gap-1.5 text-xs text-muted-foreground">
                                <p className="flex items-center gap-2">
                                    <CalendarDays className="size-3.5 shrink-0" />
                                    <span className="truncate">
                                        {event.date}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock3 className="size-3.5 shrink-0" />
                                    <span className="truncate">
                                        {event.time}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="size-3.5 shrink-0" />
                                    <span className="truncate">
                                        {event.location}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <span className="hidden items-center gap-2 sm:flex">
                            <span className="rounded-full bg-brand-success/10 px-3 py-1.5 text-xs font-semibold text-brand-success">
                                Registered
                            </span>
                            <button
                                type="button"
                                aria-label={`View ${event.title}`}
                                className="grid size-8 place-items-center rounded-full bg-muted text-brand-accent transition-colors hover:bg-brand-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </span>
                    </article>
                ))}
            </div>
        </Panel>
    );
}

function PaymentSummary() {
    return (
        <Panel title="Payment Summary" action="View All">
            <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Total Paid
                        </p>
                        <p className="mt-2 text-2xl font-bold text-brand-success">
                            ৳ 500
                        </p>
                    </div>
                    <span className="grid size-14 place-items-center rounded-full bg-brand-success/10 text-brand-success">
                        <WalletCards className="size-7" aria-hidden="true" />
                    </span>
                </div>
                <dl className="mt-4 divide-y divide-border border-t border-border text-xs">
                    {[
                        ['Membership Fee', '৳ 500'],
                        ['Event Payments', '৳ 0'],
                        ['Pending Payments', '৳ 0'],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="flex items-center justify-between gap-4 py-3"
                        >
                            <dt>{label}</dt>
                            <dd className="font-medium">{value}</dd>
                        </div>
                    ))}
                </dl>
                <button
                    type="button"
                    className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    <CreditCard className="size-4" aria-hidden="true" />
                    Make a Payment
                </button>
            </div>
        </Panel>
    );
}

function Notifications() {
    const notifications = [
        {
            icon: Check,
            text: 'Your membership payment has been confirmed.',
            time: '2 days ago',
            tone: 'success' as Tone,
        },
        {
            icon: CalendarDays,
            text: 'You have successfully registered for Annual Reunion 2025.',
            time: '3 days ago',
            tone: 'primary' as Tone,
        },
        {
            icon: GraduationCap,
            text: 'New scholarship notice has been published.',
            time: '5 days ago',
            tone: 'warning' as Tone,
        },
    ];

    return (
        <Panel title="Latest Notifications" action="View All">
            <div className="px-5">
                <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                        <article
                            key={notification.text}
                            className="flex gap-3 py-4"
                        >
                            <span
                                className={`grid size-10 shrink-0 place-items-center rounded-lg ${toneClasses[notification.tone]}`}
                            >
                                <notification.icon className="size-5" />
                            </span>
                            <div className="min-w-0 text-xs">
                                <p className="leading-5 text-card-foreground">
                                    {notification.text}
                                </p>
                                <p className="mt-1 text-muted-foreground">
                                    {notification.time}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border py-4 text-xs">
                    <p className="text-muted-foreground">
                        You have 5 unread notifications.
                    </p>
                    <button
                        type="button"
                        className="shrink-0 font-semibold text-brand-accent hover:text-brand-accent-strong"
                    >
                        View All
                    </button>
                </div>
            </div>
        </Panel>
    );
}

function QuickActions() {
    return (
        <nav
            aria-label="Dashboard quick actions"
            className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-4 lg:grid-cols-7"
        >
            {quickActions.map((action) => {
                const content = (
                    <>
                        <span
                            className={`grid size-12 place-items-center rounded-xl transition-transform group-hover:-translate-y-0.5 ${toneClasses[action.tone]}`}
                        >
                            <action.icon
                                className="size-6"
                                aria-hidden="true"
                            />
                        </span>
                        <span className="text-xs font-medium text-card-foreground">
                            {action.label}
                        </span>
                    </>
                );
                const className =
                    'group flex min-w-0 flex-col items-center gap-2 rounded-lg py-1 text-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none';

                return action.href ? (
                    <Link
                        key={action.label}
                        href={action.href}
                        prefetch
                        className={className}
                    >
                        {content}
                    </Link>
                ) : (
                    <button
                        key={action.label}
                        type="button"
                        className={className}
                    >
                        {content}
                    </button>
                );
            })}
        </nav>
    );
}

function NewsAndNotices() {
    return (
        <Panel title="News & Notices" action="View All">
            <div className="divide-y divide-border px-5">
                {notices.map(([notice, date]) => (
                    <div
                        key={notice}
                        className="flex items-center justify-between gap-4 py-3 text-xs"
                    >
                        <p className="flex min-w-0 items-center gap-3">
                            <span className="size-2 shrink-0 rounded-full bg-brand-accent ring-4 ring-brand-accent/10" />
                            <span className="truncate text-card-foreground">
                                {notice}
                            </span>
                        </p>
                        <time className="shrink-0 text-muted-foreground">
                            {date}
                        </time>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

function RecentActivities() {
    return (
        <Panel title="My Recent Activities">
            <div className="divide-y divide-border px-5">
                {activities.map((activity) => (
                    <div
                        key={activity.label}
                        className="flex items-center justify-between gap-4 py-3 text-xs"
                    >
                        <p className="flex min-w-0 items-center gap-3">
                            <span
                                className={`grid size-5 shrink-0 place-items-center rounded-full ${toneClasses[activity.tone]}`}
                            >
                                <activity.icon className="size-3" />
                            </span>
                            <span className="truncate text-card-foreground">
                                {activity.label}
                            </span>
                        </p>
                        <time className="shrink-0 text-muted-foreground">
                            {activity.time}
                        </time>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export default function Dashboard({ batchYears }: { batchYears: number[] }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const avatarSource = user.avatar ?? '/storage/avatars/avatar%20(4).jpg';
    const createdAt = new Date(user.created_at);
    const validUntilDate = new Date(createdAt);
    validUntilDate.setFullYear(validUntilDate.getFullYear() + 1);
    const memberId = user.profile?.member_id ?? 'Pending';

    return (
        <>
            <Head title="Dashboard" />
            {!user.profile?.batch_year && (
                <BatchSelectionModal batchYears={batchYears} />
            )}
            <main className="flex min-h-full flex-1 flex-col bg-background">
                <div className="flex-1 p-4 sm:p-5 xl:p-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <SummaryCard
                            title="Membership Status"
                            value="General Member"
                            detail={`Expires on ${formatDate(validUntilDate)}`}
                            icon={ShieldCheck}
                            tone="success"
                            badge="Active"
                        />
                        <SummaryCard
                            title="Member ID"
                            value={memberId}
                            detail={`Since ${formatDate(createdAt)}`}
                            icon={CircleUserRound}
                            tone="primary"
                        />
                        <SummaryCard
                            title="Upcoming Events"
                            value="2"
                            detail="You have registered"
                            icon={CalendarDays}
                            tone="purple"
                        />
                        <SummaryCard
                            title="Total Donations"
                            value="৳ 2,500"
                            detail="Thank you for your support"
                            icon={HandHeart}
                            tone="error"
                        />
                    </div>

                    <div className="mt-4 grid items-start gap-4 xl:grid-cols-12">
                        <div className="grid min-w-0 gap-4 xl:col-span-8">
                            <div className="grid items-stretch gap-4 lg:grid-cols-2">
                                <MembershipOverview
                                    name={user.name}
                                    avatarSource={avatarSource}
                                    memberId={memberId}
                                    memberSince={formatDate(createdAt)}
                                    validUntil={formatDate(validUntilDate)}
                                />
                                <UpcomingEvents />
                            </div>
                            <QuickActions />
                            <div className="grid gap-4 lg:grid-cols-2">
                                <NewsAndNotices />
                                <RecentActivities />
                            </div>
                        </div>

                        <aside className="grid min-w-0 gap-4 sm:grid-cols-2 xl:col-span-4 xl:grid-cols-1">
                            <PaymentSummary />
                            <Notifications />
                        </aside>
                    </div>
                </div>

                <footer className="flex flex-col items-center justify-between gap-2 border-t border-border bg-card px-5 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:text-left xl:px-6">
                    <p>© 2025 DMHMA Alumni Association. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with
                        <Heart
                            className="size-4 fill-brand-error text-brand-error"
                            aria-hidden="true"
                        />
                        for DMHMA Family
                    </p>
                </footer>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
