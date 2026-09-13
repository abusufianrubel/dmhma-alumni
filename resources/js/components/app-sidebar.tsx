import { Link } from '@inertiajs/react';
import {
    Bell,
    CalendarDays,
    ChevronRight,
    CircleHelp,
    ContactRound,
    CreditCard,
    Droplets,
    FileCheck2,
    GraduationCap,
    HandCoins,
    House,
    Newspaper,
    CalendarClock,
    Settings,
    UserRound,
    UsersRound,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import type { SidebarNavItem } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar';
import { dashboard, directory, membership } from '@/routes';
import { edit as appearanceEdit } from '@/routes/appearance';
import { edit as profileEdit } from '@/routes/profile';

const mainNavItems: SidebarNavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: House },
    { title: 'Profile', href: profileEdit(), icon: UserRound },
    {
        title: 'Membership',
        href: membership(),
        icon: UsersRound,
        trailingIcon: ChevronRight,
    },
    { title: 'Events', icon: CalendarDays },
    { title: 'Payments', icon: CreditCard },
    { title: 'Donations', icon: HandCoins },
    { title: 'Directory', href: directory(), icon: ContactRound },
    { title: 'Scholarship', icon: GraduationCap },
    { title: 'Blood Donation', icon: Droplets },
    { title: 'News & Notices', icon: Newspaper },
    { title: 'My Applications', icon: FileCheck2 },
    { title: 'Notifications', icon: Bell, badge: '5' },
    { title: 'Settings', href: appearanceEdit(), icon: Settings },
    { title: 'Help & Support', icon: CircleHelp },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-0">
            <div className="flex h-full min-h-0 flex-col bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)] text-slate-100">
                <SidebarHeader className="h-[88px] shrink-0 justify-center px-4 py-3 group-data-[collapsible=icon]:px-2">
                    <Link
                        href={dashboard()}
                        prefetch
                        aria-label="DMHMA Alumni Association dashboard"
                        className="flex items-center gap-3 overflow-hidden rounded-lg outline-none group-data-[collapsible=icon]:justify-center focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        <img
                            src="/images/dmhma-alumni-logo.png"
                            alt=""
                            className="size-11 shrink-0 rounded-full bg-white object-contain p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.28)] group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0.5"
                        />
                        <span className="min-w-0 leading-tight group-data-[collapsible=icon]:hidden">
                            <span className="block text-[20px] font-bold tracking-[0.01em] whitespace-nowrap">
                                DMHMA
                            </span>
                            <span className="mt-0.5 block text-xs font-medium whitespace-nowrap text-slate-300">
                                Alumni Association
                            </span>
                        </span>
                    </Link>
                </SidebarHeader>

                <SidebarContent className="[scrollbar-width:none] px-2 py-2 group-data-[collapsible=icon]:px-1.5 [&::-webkit-scrollbar]:hidden">
                    <NavMain items={mainNavItems} />
                </SidebarContent>

                <SidebarFooter className="shrink-0 p-3 pt-2 group-data-[collapsible=icon]:hidden">
                    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
                        <p className="text-sm font-semibold text-white">
                            Annual Reunion 2025
                        </p>
                        <p className="mt-2 text-xs text-slate-300">
                            Join us on 20 June 2025
                        </p>
                        <div className="mt-4 flex items-end justify-between gap-3">
                            <button
                                type="button"
                                className="h-9 rounded-md bg-sky-500 px-4 text-xs font-semibold text-slate-950 shadow-sm transition-colors hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:outline-none"
                            >
                                Register Now
                            </button>
                            <CalendarClock
                                aria-hidden="true"
                                className="size-6 text-sky-400"
                            />
                        </div>
                    </div>
                </SidebarFooter>
            </div>
        </Sidebar>
    );
}
