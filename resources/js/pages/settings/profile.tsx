import { Form, Head, Link, usePage } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    CalendarDays,
    Check,
    ChevronRight,
    Circle,
    Eye,
    FileText,
    GraduationCap,
    IdCard,
    LockKeyhole,
    Mail,
    Pencil,
    Phone,
    RefreshCw,
    Save,
    Search,
    Settings,
    ShieldCheck,
    UserRound,
    UsersRound,
} from 'lucide-react';
import { useRef } from 'react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit as appearanceEdit } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as securityEdit } from '@/routes/security';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type AlumniProfile = {
    batch_year: number | null;
    member_id: string | null;
    student_id: string | null;
    nickname: string | null;
    father_name: string | null;
    mother_name: string | null;
    blood_group: string | null;
    phone: string | null;
    date_of_birth: string | null;
    gender: string | null;
    tshirt_size: string | null;
    occupation: string | null;
    company: string | null;
    bio: string | null;
};

type PageProps = { auth: Auth };
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const panelClass =
    'rounded-xl border border-border bg-card text-card-foreground shadow-sm';
const compactInputClass =
    'h-9 rounded-md border border-input bg-card px-3 text-xs text-foreground outline-none focus-visible:border-ring';

function formatDate(value: string | null | undefined): string {
    if (!value) {
        return 'Not provided';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function membershipExpiry(createdAt: string): string {
    const date = new Date(createdAt);
    date.setFullYear(date.getFullYear() + 1);

    return formatDate(date.toISOString());
}

function Panel({
    title,
    children,
    className = '',
}: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={`${panelClass} ${className}`}>
            <div className="px-4 pt-4 pb-3">
                <h2 className="text-sm font-semibold">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function SummaryDetail({
    icon: DetailIcon,
    label,
    value,
}: {
    icon: Icon;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 py-2 text-xs">
            <DetailIcon className="size-4 shrink-0 text-accent" />
            <span className="min-w-0 flex-1 text-muted-foreground">
                {label}
            </span>
            <span className="max-w-3/5 truncate text-right font-semibold text-foreground">
                {value}
            </span>
        </div>
    );
}

function StatusRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-border py-3 text-xs last:border-0">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium text-foreground">
                {value}
            </span>
        </div>
    );
}

function QuickAction({
    icon: ActionIcon,
    label,
    href,
}: {
    icon: Icon;
    label: string;
    href: string | ReturnType<typeof edit>;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-md px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
        >
            <ActionIcon className="size-4 text-muted-foreground" />
            {label}
        </Link>
    );
}

function PrivacyRow({ label }: { label: string }) {
    return (
        <div className="flex items-center justify-between gap-3 py-2 text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="ml-auto text-foreground">Visible to Members</span>
            <Eye className="size-4 text-brand-success" />
        </div>
    );
}

function Statistic({
    icon: StatisticIcon,
    label,
    value,
    tone,
}: {
    icon: Icon;
    label: string;
    value: string;
    tone: string;
}) {
    return (
        <div className="flex min-w-0 flex-col items-center rounded-lg border border-border px-1.5 py-3 text-center">
            <span
                className={`grid size-9 place-items-center rounded-full ${tone}`}
            >
                <StatisticIcon className="size-4" />
            </span>
            <span className="mt-2 min-h-7 text-xs leading-tight font-medium text-muted-foreground">
                {label}
            </span>
            <span className="mt-1 text-lg font-semibold text-foreground">
                {value}
            </span>
        </div>
    );
}

export default function Profile({
    mustVerifyEmail,
    profile,
    status,
}: {
    mustVerifyEmail: boolean;
    profile: AlumniProfile | null;
    status?: string;
}) {
    const { user } = usePage<PageProps>().props.auth;
    const dateOfBirthInputRef = useRef<HTMLInputElement>(null);
    const avatarSource = user.avatar ?? '/storage/avatars/avatar%20(4).jpg';
    const memberId = profile?.member_id ?? 'Pending';
    const memberSince = formatDate(user.created_at);
    const completionItems = [
        { label: 'Basic Information', complete: Boolean(user.name) },
        { label: 'Contact Information', complete: Boolean(profile?.phone) },
        {
            label: 'Education Information',
            complete: Boolean(profile?.batch_year),
        },
        {
            label: 'Professional Information',
            complete: Boolean(profile?.occupation),
        },
        { label: 'Profile Photo', complete: Boolean(user.avatar) },
    ];
    const completedItems = completionItems.filter(
        (item) => item.complete,
    ).length;
    const completion = Math.round(
        (completedItems / completionItems.length) * 100,
    );
    const completionWidthClass =
        ['w-0', 'w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'][completedItems] ??
        'w-0';

    return (
        <>
            <Head title="My Profile" />

            <main className="min-h-full bg-background px-4 py-5 text-foreground sm:px-6 lg:px-7">
                <div className="container mx-auto">
                    <header className="mb-4">
                        <h1 className="text-xl font-semibold tracking-tight">
                            My Profile
                        </h1>
                        <nav
                            aria-label="Breadcrumb"
                            className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"
                        >
                            <span>Dashboard</span>
                            <ChevronRight className="size-3.5" />
                            <span>Profile</span>
                        </nav>
                    </header>

                    <div className="grid items-start gap-4 xl:grid-cols-12">
                        <aside className="grid gap-4 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
                            <section
                                className={`${panelClass} overflow-hidden`}
                            >
                                <div className="relative h-22 overflow-hidden bg-linear-to-br from-brand-accent to-brand-primary">
                                    <div className="absolute -top-16 -left-6 size-40 rotate-45 bg-card/10" />
                                    <div className="absolute -right-12 -bottom-20 size-44 rotate-45 bg-secondary/25" />
                                </div>
                                <div className="relative px-4 pb-4 text-center">
                                    <div className="relative mx-auto -mt-11 size-24">
                                        <img
                                            src={avatarSource}
                                            alt={`${user.name} profile`}
                                            className="size-full rounded-full border-4 border-card bg-card object-cover shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Edit profile photo"
                                            className="absolute right-0 bottom-1 grid size-7 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                                        >
                                            <Pencil className="size-3.5" />
                                        </button>
                                    </div>
                                    <h2 className="mt-2 text-lg font-semibold">
                                        {user.name}
                                    </h2>
                                    <span className="mt-1 inline-flex rounded-full bg-brand-success/10 px-3 py-1 text-xs font-medium text-brand-success">
                                        Active Member
                                    </span>
                                    <div className="mt-4 divide-y divide-border text-left">
                                        <SummaryDetail
                                            icon={IdCard}
                                            label="Member ID"
                                            value={memberId}
                                        />
                                        <SummaryDetail
                                            icon={Mail}
                                            label="Email"
                                            value={user.email}
                                        />
                                        <SummaryDetail
                                            icon={GraduationCap}
                                            label="Batch"
                                            value={
                                                profile?.batch_year
                                                    ? `SSC ${profile.batch_year}`
                                                    : 'Not provided'
                                            }
                                        />
                                        <SummaryDetail
                                            icon={UsersRound}
                                            label="Membership Type"
                                            value="General Member"
                                        />
                                        <SummaryDetail
                                            icon={CalendarDays}
                                            label="Member Since"
                                            value={memberSince}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mt-4 w-full border-accent text-xs font-semibold text-accent shadow-none hover:bg-muted hover:text-accent"
                                    >
                                        <IdCard />
                                        View Member Card
                                    </Button>
                                </div>
                            </section>

                            <Panel title="Profile Completion">
                                <div className="px-4 pb-4">
                                    <div className="-mt-8 flex justify-end text-xs text-muted-foreground">
                                        {completion}% Complete
                                    </div>
                                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className={`h-full rounded-full bg-brand-success ${completionWidthClass}`}
                                        />
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                        {completionItems.map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-2.5 text-xs text-muted-foreground"
                                            >
                                                {item.complete ? (
                                                    <span className="grid size-4 place-items-center rounded-full border border-brand-success text-brand-success">
                                                        <Check className="size-2.5" />
                                                    </span>
                                                ) : (
                                                    <Circle className="size-4 text-muted-foreground" />
                                                )}
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Panel>
                        </aside>

                        <div className="grid min-w-0 gap-4 xl:col-span-6">
                            <section
                                className={`${panelClass} overflow-hidden`}
                            >
                                <div className="grid grid-cols-2 border-b border-border sm:grid-cols-5">
                                    {[
                                        [UserRound, 'Personal Information'],
                                        [IdCard, 'Contact Information'],
                                        [GraduationCap, 'Education'],
                                        [BriefcaseBusiness, 'Professional'],
                                        [FileText, 'Other Information'],
                                    ].map(([TabIcon, label], index) => {
                                        const TabIconComponent =
                                            TabIcon as Icon;

                                        return (
                                            <button
                                                key={label as string}
                                                type="button"
                                                className={`relative flex min-h-16 flex-col items-center justify-center gap-1.5 px-2 text-xs font-medium transition-colors ${
                                                    index === 0
                                                        ? 'text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent'
                                                        : 'text-foreground hover:bg-muted hover:text-primary'
                                                }`}
                                            >
                                                <TabIconComponent className="size-5" />
                                                <span>{label as string}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <Form
                                    {...ProfileController.update.form()}
                                    options={{ preserveScroll: true }}
                                >
                                    {({
                                        processing,
                                        errors,
                                        recentlySuccessful,
                                    }) => (
                                        <>
                                            <div className="px-5 py-5">
                                                <h2 className="text-sm font-semibold">
                                                    Basic Information
                                                </h2>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    Update your basic personal
                                                    information.
                                                </p>
                                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="name"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Full Name{' '}
                                                            <span className="text-destructive">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            required
                                                            autoComplete="name"
                                                            defaultValue={
                                                                user.name
                                                            }
                                                            className={
                                                                compactInputClass
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.name
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="nickname"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Nickname
                                                        </Label>
                                                        <Input
                                                            id="nickname"
                                                            name="nickname"
                                                            type="text"
                                                            defaultValue={
                                                                profile?.nickname ??
                                                                ''
                                                            }
                                                            className={
                                                                compactInputClass
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.nickname
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5 sm:col-span-2">
                                                        <Label
                                                            htmlFor="email"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={user.email}
                                                            readOnly
                                                            autoComplete="email"
                                                            className={`${compactInputClass} cursor-not-allowed bg-muted/30 text-muted-foreground`}
                                                        />
                                                        {mustVerifyEmail &&
                                                            user.email_verified_at ===
                                                                null && (
                                                                <div className="text-xs text-muted-foreground">
                                                                    Your email
                                                                    address is
                                                                    unverified.{' '}
                                                                    <Link
                                                                        href={send()}
                                                                        as="button"
                                                                        className="font-semibold text-foreground underline underline-offset-2"
                                                                    >
                                                                        Re-send
                                                                        the
                                                                        verification
                                                                        email.
                                                                    </Link>
                                                                    {status ===
                                                                        'verification-link-sent' && (
                                                                        <span className="mt-1 block font-medium text-brand-success">
                                                                            A
                                                                            new
                                                                            verification
                                                                            link
                                                                            has
                                                                            been
                                                                            sent.
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="father-name"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Father's Name
                                                        </Label>
                                                        <Input
                                                            id="father-name"
                                                            name="father_name"
                                                            type="text"
                                                            defaultValue={
                                                                profile?.father_name ??
                                                                ''
                                                            }
                                                            className={
                                                                compactInputClass
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.father_name
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="mother-name"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Mother's Name
                                                        </Label>
                                                        <Input
                                                            id="mother-name"
                                                            name="mother_name"
                                                            type="text"
                                                            defaultValue={
                                                                profile?.mother_name ??
                                                                ''
                                                            }
                                                            className={
                                                                compactInputClass
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.mother_name
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="date-of-birth"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Date of Birth
                                                        </Label>
                                                        <div className="relative">
                                                            <Input
                                                                ref={
                                                                    dateOfBirthInputRef
                                                                }
                                                                id="date-of-birth"
                                                                name="date_of_birth"
                                                                type="date"
                                                                autoComplete="bday"
                                                                defaultValue={
                                                                    profile?.date_of_birth?.slice(
                                                                        0,
                                                                        10,
                                                                    ) ?? ''
                                                                }
                                                                className={`${compactInputClass} date-input pr-10`}
                                                            />
                                                            <button
                                                                type="button"
                                                                aria-label="Open date of birth picker"
                                                                aria-controls="date-of-birth"
                                                                onClick={() => {
                                                                    const input =
                                                                        dateOfBirthInputRef.current;

                                                                    if (
                                                                        !input
                                                                    ) {
                                                                        return;
                                                                    }

                                                                    input.focus();

                                                                    if (
                                                                        typeof input.showPicker ===
                                                                        'function'
                                                                    ) {
                                                                        input.showPicker();
                                                                    } else {
                                                                        input.click();
                                                                    }
                                                                }}
                                                                className="absolute inset-y-px right-px flex w-9 cursor-pointer items-center justify-center rounded-r-md bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none forced-colors:hidden"
                                                            >
                                                                <CalendarDays
                                                                    className="size-4"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.date_of_birth
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="gender"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Gender
                                                        </Label>
                                                        <select
                                                            id="gender"
                                                            name="gender"
                                                            autoComplete="sex"
                                                            defaultValue={
                                                                profile?.gender ??
                                                                ''
                                                            }
                                                            className={`${compactInputClass} w-full`}
                                                        >
                                                            <option value="">
                                                                Select gender
                                                            </option>
                                                            <option value="male">
                                                                Male
                                                            </option>
                                                            <option value="female">
                                                                Female
                                                            </option>
                                                            <option value="other">
                                                                Other
                                                            </option>
                                                            <option value="prefer_not_to_say">
                                                                Prefer not to
                                                                say
                                                            </option>
                                                        </select>
                                                        <InputError
                                                            message={
                                                                errors.gender
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="tshirt-size"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            T-shirt Size
                                                        </Label>
                                                        <select
                                                            id="tshirt-size"
                                                            name="tshirt_size"
                                                            defaultValue={
                                                                profile?.tshirt_size ??
                                                                ''
                                                            }
                                                            className={`${compactInputClass} w-full`}
                                                        >
                                                            <option value="">
                                                                Select size
                                                            </option>
                                                            <option value="S">
                                                                S — Chest: 36",
                                                                Length: 26"
                                                            </option>
                                                            <option value="M">
                                                                M — Chest: 38",
                                                                Length: 27"
                                                            </option>
                                                            <option value="L">
                                                                L — Chest: 40",
                                                                Length: 28"
                                                            </option>
                                                            <option value="XL">
                                                                XL — Chest: 42",
                                                                Length: 29"
                                                            </option>
                                                            <option value="XXL">
                                                                XXL — Chest:
                                                                44", Length: 30"
                                                            </option>
                                                            <option value="3XL">
                                                                3XL — Chest:
                                                                46", Length: 31"
                                                            </option>
                                                        </select>
                                                        <InputError
                                                            message={
                                                                errors.tshirt_size
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-1.5">
                                                        <Label
                                                            htmlFor="blood-group"
                                                            className="text-xs font-medium text-foreground"
                                                        >
                                                            Blood Group
                                                        </Label>
                                                        <select
                                                            id="blood-group"
                                                            name="blood_group"
                                                            defaultValue={
                                                                profile?.blood_group ??
                                                                ''
                                                            }
                                                            className={`${compactInputClass} w-full`}
                                                        >
                                                            <option value="">
                                                                Select blood
                                                                group
                                                            </option>
                                                            {[
                                                                'A+',
                                                                'A-',
                                                                'B+',
                                                                'B-',
                                                                'AB+',
                                                                'AB-',
                                                                'O+',
                                                                'O-',
                                                            ].map(
                                                                (
                                                                    bloodGroup,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            bloodGroup
                                                                        }
                                                                        value={
                                                                            bloodGroup
                                                                        }
                                                                    >
                                                                        {
                                                                            bloodGroup
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                        <InputError
                                                            message={
                                                                errors.blood_group
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex min-h-14 items-center justify-center gap-3 border-t border-border bg-muted/30 px-5 py-3">
                                                <Button
                                                    disabled={processing}
                                                    data-test="update-profile-button"
                                                    className="px-5 text-xs shadow-md hover:bg-brand-primary-strong"
                                                >
                                                    <Save />
                                                    {processing
                                                        ? 'Saving...'
                                                        : 'Save Changes'}
                                                </Button>
                                                {recentlySuccessful && (
                                                    <span className="text-xs font-medium text-brand-success">
                                                        Saved
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </section>

                            <Panel title="About Me">
                                <div className="px-4 pb-4">
                                    <p className="-mt-2 mb-2 text-xs text-muted-foreground">
                                        Tell us something about yourself.
                                    </p>
                                    <textarea
                                        value={
                                            profile?.bio ??
                                            'Share your education, community involvement, and professional journey with fellow alumni.'
                                        }
                                        readOnly
                                        aria-readonly="true"
                                        className="min-h-20 w-full resize-none rounded-md border border-input bg-muted/30 px-3 py-2 text-xs leading-relaxed text-foreground outline-none"
                                    />
                                </div>
                            </Panel>
                        </div>

                        <aside className="grid gap-4 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
                            <Panel title="Membership Status">
                                <div className="-mt-11 flex justify-end px-4">
                                    <span className="grid size-10 place-items-center rounded-full bg-brand-success/10 text-brand-success">
                                        <ShieldCheck className="size-6" />
                                    </span>
                                </div>
                                <div className="mt-2 px-4 pb-4">
                                    <StatusRow label="Status" value="Active" />
                                    <StatusRow
                                        label="Membership Type"
                                        value="General Member"
                                    />
                                    <StatusRow
                                        label="Valid From"
                                        value={memberSince}
                                    />
                                    <StatusRow
                                        label="Valid Until"
                                        value={membershipExpiry(
                                            user.created_at,
                                        )}
                                    />
                                    <button
                                        type="button"
                                        className="mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-brand-success/30 bg-brand-success/10 text-xs font-medium text-brand-success transition-colors hover:bg-brand-success/20 focus-visible:ring-2 focus-visible:ring-brand-success/20 focus-visible:outline-none"
                                    >
                                        <RefreshCw className="size-3.5" />
                                        Renew Membership
                                    </button>
                                </div>
                            </Panel>

                            <Panel title="Quick Actions">
                                <div className="px-1 pb-3">
                                    <QuickAction
                                        icon={LockKeyhole}
                                        label="Change Password"
                                        href={securityEdit()}
                                    />
                                    <QuickAction
                                        icon={Mail}
                                        label="Update Email"
                                        href={`${edit().url}#email`}
                                    />
                                    <QuickAction
                                        icon={Phone}
                                        label="Update Mobile Number"
                                        href={edit()}
                                    />
                                    <QuickAction
                                        icon={Settings}
                                        label="Privacy Settings"
                                        href={appearanceEdit()}
                                    />
                                </div>
                            </Panel>

                            <Panel title="Privacy Overview">
                                <div className="divide-y divide-border px-4 pb-3">
                                    <PrivacyRow label="Phone Number" />
                                    <PrivacyRow label="Email Address" />
                                    <PrivacyRow label="Home Address" />
                                    <PrivacyRow label="Profession" />
                                    <PrivacyRow label="Company" />
                                </div>
                            </Panel>

                            <Panel title="Profile Statistics">
                                <div className="grid grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
                                    <Statistic
                                        icon={UserRound}
                                        label="Profile Views"
                                        value="125"
                                        tone="bg-chart-1/10 text-chart-1"
                                    />
                                    <Statistic
                                        icon={Search}
                                        label="Search Appearances"
                                        value="48"
                                        tone="bg-chart-2/10 text-chart-2"
                                    />
                                    <Statistic
                                        icon={UsersRound}
                                        label="Connections"
                                        value="32"
                                        tone="bg-chart-3/10 text-chart-3"
                                    />
                                    <Statistic
                                        icon={CalendarDays}
                                        label="Events Joined"
                                        value="7"
                                        tone="bg-chart-4/10 text-chart-4"
                                    />
                                </div>
                            </Panel>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [{ title: 'My Profile', href: edit() }],
};
