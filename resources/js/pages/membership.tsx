import { Head, usePage } from '@inertiajs/react';
import {
    BellRing,
    BriefcaseBusiness,
    CalendarDays,
    Check,
    CircleCheck,
    Clock3,
    ContactRound,
    CreditCard,
    Download,
    Eye,
    FileDown,
    Gift,
    GraduationCap,
    HandHeart,
    Headphones,
    Megaphone,
    Network,
    QrCode,
    RefreshCw,
    ShieldCheck,
    UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { dashboard, membership } from '@/routes';

const membershipBreadcrumbs = [
    { title: 'Dashboard', href: dashboard() },
    { title: 'Membership', href: membership() },
];

const benefits: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
}> = [
    {
        title: 'Event Participation',
        description: 'Access exclusive alumni events and reunions.',
        icon: CalendarDays,
    },
    {
        title: 'Career Support',
        description: 'Get career guidance and job opportunities.',
        icon: BriefcaseBusiness,
    },
    {
        title: 'Networking',
        description: 'Connect and network with fellow alumni.',
        icon: Network,
    },
    {
        title: 'Learning Opportunities',
        description: 'Access webinars, workshops, and seminars.',
        icon: GraduationCap,
    },
    {
        title: 'Resource Access',
        description: 'Browse the alumni directory and resources.',
        icon: ContactRound,
    },
    {
        title: 'Community Impact',
        description: 'Participate in initiatives and give back.',
        icon: HandHeart,
    },
    {
        title: 'Discounts & Offers',
        description: 'Enjoy special discounts on partner services.',
        icon: Gift,
    },
    {
        title: 'Exclusive Updates',
        description: 'Receive alumni news and announcements.',
        icon: Megaphone,
    },
];

const timeline = [
    {
        title: 'Application Submitted',
        description: 'Your membership application was submitted.',
        offset: 2,
    },
    {
        title: 'Approved',
        description: 'Your application was approved by admin.',
        offset: 1,
    },
    {
        title: 'Payment Completed',
        description: 'Membership payment has been completed.',
        offset: 0,
    },
    {
        title: 'Membership Active',
        description: 'Your membership is now active.',
        offset: 0,
    },
];

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);

    return result;
}

function subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);

    return result;
}

function membershipTenure(createdAt: Date): string {
    const elapsedMonths = Math.max(
        0,
        (new Date().getFullYear() - createdAt.getFullYear()) * 12 +
            new Date().getMonth() -
            createdAt.getMonth(),
    );
    const years = Math.floor(elapsedMonths / 12);
    const months = elapsedMonths % 12;

    return `${years} ${years === 1 ? 'Year' : 'Years'}, ${months} ${months === 1 ? 'Month' : 'Months'}`;
}

function Panel({
    title,
    description,
    children,
    className = '',
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-xl border border-border bg-card shadow-sm ${className}`}
        >
            <header className="px-4 pt-4 sm:px-5 sm:pt-5">
                <h2 className="text-sm font-bold text-card-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </header>
            {children}
        </section>
    );
}

function MembershipSeal() {
    return (
        <div className="relative grid size-28 shrink-0 place-items-center rounded-full border-4 border-brand-success bg-brand-success/10 text-brand-success shadow-sm">
            <div className="grid size-20 place-items-center rounded-full bg-brand-success text-brand-success-foreground">
                <UserRound className="size-10" aria-hidden="true" />
            </div>
            <span className="absolute -bottom-2 rounded-md bg-brand-success px-3 py-1 text-xs font-bold whitespace-nowrap text-brand-success-foreground shadow-sm">
                ACTIVE MEMBER
            </span>
        </div>
    );
}

function MembershipOverview({
    memberId,
    memberSince,
    validUntil,
    tenure,
}: {
    memberId: string;
    memberSince: string;
    validUntil: string;
    tenure: string;
}) {
    return (
        <Panel title="Membership Overview">
            <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex justify-center md:w-32">
                        <MembershipSeal />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="font-semibold text-card-foreground">
                                Membership Status
                            </span>
                            <span className="rounded-md bg-brand-success/10 px-2 py-1 font-semibold text-brand-success">
                                Active
                            </span>
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-card-foreground">
                            General Member
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            DMHMA Alumni Association
                        </p>
                        <dl className="mt-5 grid grid-cols-2 divide-x divide-border text-xs lg:grid-cols-4">
                            {[
                                ['Member ID', memberId],
                                ['Member Since', memberSince],
                                ['Valid Until', validUntil],
                                ['Total Tenure', tenure],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="min-w-0 px-3 first:pl-0"
                                >
                                    <dt className="font-semibold text-muted-foreground">
                                        {label}
                                    </dt>
                                    <dd className="mt-2 font-bold break-words text-card-foreground">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-4 rounded-lg border border-brand-success/30 bg-brand-success/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                        <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-success" />
                        <div>
                            <p className="text-sm font-semibold text-brand-success">
                                Your membership is active.
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Thank you for being a valued member of our
                                alumni family.
                            </p>
                        </div>
                    </div>
                    <Button
                        type="button"
                        className="shrink-0 bg-brand-success text-brand-success-foreground hover:bg-brand-success/90"
                    >
                        <RefreshCw />
                        Renew Membership
                    </Button>
                </div>
            </div>
        </Panel>
    );
}

function MembershipCard({
    name,
    memberId,
    memberSince,
    validUntil,
}: {
    name: string;
    memberId: string;
    memberSince: string;
    validUntil: string;
}) {
    return (
        <Panel title="Membership Card">
            <div className="p-4 sm:p-5">
                <div className="overflow-hidden rounded-xl bg-brand-primary-strong p-5 text-primary-foreground shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/dmhma-alumni-logo.png"
                            alt=""
                            className="size-10 rounded-full bg-card object-contain p-1"
                        />
                        <div>
                            <p className="text-lg font-bold">DMHMA</p>
                            <p className="text-xs opacity-80">
                                Alumni Association
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 items-end gap-3">
                        <div className="col-span-2 min-w-0">
                            <p className="text-sm font-bold">GENERAL MEMBER</p>
                            <p className="mt-2 truncate text-lg font-semibold">
                                {name}
                            </p>
                            <p className="mt-1 text-sm opacity-80">
                                {memberId}
                            </p>
                        </div>
                        <div className="grid size-20 place-items-center rounded-lg bg-card text-brand-primary-strong">
                            <QrCode
                                className="size-16"
                                aria-label="Member QR code"
                            />
                        </div>
                    </div>
                    <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-primary-foreground/20 pt-3 text-xs">
                        <div>
                            <dt className="opacity-70">Member Since</dt>
                            <dd className="mt-1 font-semibold">
                                {memberSince}
                            </dd>
                        </div>
                        <div>
                            <dt className="opacity-70">Valid Until</dt>
                            <dd className="mt-1 font-semibold">{validUntil}</dd>
                        </div>
                    </dl>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    className="mt-4 w-full border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-accent-foreground"
                    onClick={() => window.print()}
                >
                    <Download />
                    Download / Share Card
                </Button>
            </div>
        </Panel>
    );
}

function Benefits() {
    return (
        <Panel
            title="Membership Benefits"
            description="As a member, you enjoy the following benefits and privileges."
        >
            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
                {benefits.map((benefit) => (
                    <article
                        key={benefit.title}
                        className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-success/10 text-brand-success">
                            <benefit.icon
                                className="size-5"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="min-w-0">
                            <h3 className="text-xs font-semibold text-card-foreground">
                                {benefit.title}
                            </h3>
                            <p className="mt-1 text-xs leading-4 text-muted-foreground">
                                {benefit.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </Panel>
    );
}

function Timeline({ createdAt }: { createdAt: Date }) {
    return (
        <Panel title="Membership Timeline" className="h-full">
            <ol className="p-4 sm:p-5">
                {timeline.map((item, index) => (
                    <li
                        key={item.title}
                        className="relative flex gap-4 pb-5 last:pb-0"
                    >
                        {index < timeline.length - 1 && (
                            <span className="absolute top-5 bottom-0 left-2 w-px bg-brand-success/30" />
                        )}
                        <span
                            className={`relative z-10 mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${index === timeline.length - 1 ? 'bg-brand-accent text-accent-foreground ring-4 ring-brand-accent/10' : 'bg-brand-success text-brand-success-foreground'}`}
                        >
                            <Check className="size-3" aria-hidden="true" />
                        </span>
                        <div className="flex min-w-0 flex-1 items-start justify-between gap-4 text-xs">
                            <div>
                                <h3 className="font-semibold text-card-foreground">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                            <time className="shrink-0 text-muted-foreground">
                                {formatDate(
                                    subtractDays(createdAt, item.offset),
                                )}
                            </time>
                        </div>
                    </li>
                ))}
            </ol>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-accent-foreground"
                >
                    <Clock3 />
                    View Full History
                </Button>
            </div>
        </Panel>
    );
}

function Summary({
    memberSince,
    validUntil,
}: {
    memberSince: string;
    validUntil: string;
}) {
    const summaryRows: Array<[LucideIcon, string, React.ReactNode]> = [
        [CreditCard, 'Membership Type', 'General Member'],
        [
            ShieldCheck,
            'Membership Status',
            <span className="rounded-md bg-brand-success/10 px-2 py-1 font-semibold text-brand-success">
                Active
            </span>,
        ],
        [CalendarDays, 'Member Since', memberSince],
        [CalendarDays, 'Valid Until', validUntil],
        [
            Clock3,
            'Days Remaining',
            <span className="text-brand-success">365 Days</span>,
        ],
        [
            RefreshCw,
            'Auto Renewal',
            <span className="text-brand-success">Enabled</span>,
        ],
    ];

    return (
        <Panel title="Membership Summary">
            <dl className="divide-y divide-border px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
                {summaryRows.map(([Icon, label, value]) => (
                    <div
                        key={label}
                        className="flex items-center gap-3 py-3 text-xs"
                    >
                        <Icon
                            className="size-4 shrink-0 text-brand-primary"
                            aria-hidden="true"
                        />
                        <dt className="min-w-0 flex-1 text-muted-foreground">
                            {label}
                        </dt>
                        <dd className="text-right font-semibold text-card-foreground">
                            {value}
                        </dd>
                    </div>
                ))}
            </dl>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-accent-foreground"
                >
                    <Eye />
                    View Membership Plan
                </Button>
            </div>
        </Panel>
    );
}

function Renewal({ validUntil }: { validUntil: string }) {
    return (
        <Panel
            title="Upcoming Renewal"
            className="border-brand-warning/30 bg-brand-warning/5"
        >
            <div className="p-4 sm:p-5">
                <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-warning/10 text-brand-warning">
                        <BellRing className="size-6" />
                    </span>
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Your membership will expire on
                        </p>
                        <p className="mt-1 text-xl font-bold text-brand-warning">
                            {validUntil}
                        </p>
                    </div>
                </div>
                <p className="mt-5 text-xs leading-5 text-muted-foreground">
                    Renew your membership to continue enjoying all the benefits.
                </p>
                <Button
                    type="button"
                    className="mt-5 w-full bg-brand-warning text-primary-foreground hover:bg-brand-warning/90"
                >
                    <RefreshCw />
                    Renew Membership
                </Button>
            </div>
        </Panel>
    );
}

function Help() {
    return (
        <Panel title="Need Help?">
            <div className="p-4 pt-3 sm:p-5 sm:pt-3">
                <p className="text-xs leading-5 text-muted-foreground">
                    If you have any questions or need assistance regarding your
                    membership, we are here to help.
                </p>
                <Button
                    type="button"
                    variant="outline"
                    className="mt-5 w-full border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-accent-foreground"
                >
                    <Headphones />
                    Contact Support
                </Button>
            </div>
        </Panel>
    );
}

function PaymentHistory({
    memberId,
    memberSince,
}: {
    memberId: string;
    memberSince: string;
}) {
    const payments = [
        [memberId, memberSince, 'Annual membership fee', '৳1,000.00', 'bKash'],
        [
            `${memberId}-R`,
            memberSince,
            'Membership renewal fee',
            '৳1,000.00',
            'Nagad',
        ],
        [
            `${memberId}-A`,
            memberSince,
            'Membership application fee',
            '৳500.00',
            'Rocket',
        ],
    ];

    return (
        <Panel title="Payment History">
            <div className="overflow-x-auto p-4 pt-3 sm:p-5 sm:pt-3">
                <table className="w-full min-w-3xl text-left text-xs">
                    <thead className="text-muted-foreground">
                        <tr>
                            {[
                                'Invoice ID',
                                'Date',
                                'Description',
                                'Amount',
                                'Payment Method',
                                'Status',
                                'Invoice',
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-3 py-2 font-semibold first:pl-0"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {payments.map((payment) => (
                            <tr key={payment[0]}>
                                {payment.map((value, index) => (
                                    <td
                                        key={`${payment[0]}-${value}`}
                                        className="px-3 py-3 text-card-foreground first:pl-0"
                                    >
                                        {index === 5 ? null : value}
                                    </td>
                                ))}
                                <td className="px-3 py-3">
                                    <span className="rounded-md bg-brand-success/10 px-2 py-1 font-semibold text-brand-success">
                                        Paid
                                    </span>
                                </td>
                                <td className="px-3 py-3">
                                    <button
                                        type="button"
                                        aria-label={`Download invoice ${payment[0]}`}
                                        className="grid size-8 place-items-center rounded-md border border-border text-brand-accent hover:bg-muted"
                                    >
                                        <FileDown className="size-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <Button type="button">
                        <CreditCard />
                        View All Payments
                    </Button>
                </div>
            </div>
        </Panel>
    );
}

export default function Membership() {
    const { auth } = usePage().props;
    const user = auth.user;
    const createdAt = new Date(user.created_at);
    const validUntilDate = addYears(createdAt, 1);
    const memberSince = formatDate(createdAt);
    const validUntil = formatDate(validUntilDate);
    const memberId = user.profile?.member_id ?? 'Pending';

    return (
        <>
            <Head title="My Membership" />
            <main className="flex min-h-full flex-1 flex-col bg-background">
                <div className="container mx-auto w-full flex-1 p-4 sm:p-5 xl:p-6">
                    <div className="mb-5">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            My Membership
                        </h1>
                        <div className="mt-2 text-muted-foreground">
                            <Breadcrumbs breadcrumbs={membershipBreadcrumbs} />
                        </div>
                    </div>

                    <div className="grid items-start gap-4 xl:grid-cols-12">
                        <div className="grid min-w-0 gap-4 xl:col-span-9">
                            <div className="grid items-start gap-4 lg:grid-cols-5">
                                <div className="lg:col-span-3">
                                    <MembershipOverview
                                        memberId={memberId}
                                        memberSince={memberSince}
                                        validUntil={validUntil}
                                        tenure={membershipTenure(createdAt)}
                                    />
                                </div>
                                <div className="lg:col-span-2">
                                    <MembershipCard
                                        name={user.name}
                                        memberId={memberId}
                                        memberSince={memberSince}
                                        validUntil={validUntil}
                                    />
                                </div>
                            </div>
                            <div className="grid items-stretch gap-4 lg:grid-cols-5">
                                <div className="lg:col-span-3">
                                    <Benefits />
                                </div>
                                <div className="lg:col-span-2">
                                    <Timeline createdAt={createdAt} />
                                </div>
                            </div>
                            <PaymentHistory
                                memberId={memberId}
                                memberSince={memberSince}
                            />
                        </div>

                        <aside className="grid min-w-0 gap-4 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
                            <Summary
                                memberSince={memberSince}
                                validUntil={validUntil}
                            />
                            <Renewal validUntil={validUntil} />
                            <Help />
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}

Membership.layout = {
    breadcrumbs: membershipBreadcrumbs,
};
