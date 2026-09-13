import { usePage } from '@inertiajs/react';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';

export function AppSidebarHeader() {
    const { auth } = usePage().props;
    const { toggleSidebar } = useSidebar();
    const user = auth.user;
    const avatarSource = user.avatar ?? '/storage/avatars/avatar%20(4).jpg';

    return (
        <header className="flex h-[82px] shrink-0 items-center border-b border-border bg-card px-4 md:px-[30px]">
            <div className="flex min-w-0 flex-1 items-center">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                    <Menu aria-hidden="true" className="size-6 stroke-[1.8]" />
                </button>

                <div className="ml-6 hidden min-w-0 sm:block">
                    <p className="truncate text-[20px] leading-6 font-bold tracking-[-0.012em] text-foreground">
                        Good Morning, {user.name}{' '}
                        <span aria-hidden="true">👋</span>
                    </p>
                    <p className="mt-1 truncate text-[13px] leading-4 text-muted-foreground">
                        Welcome back to DMHMA Alumni Association
                    </p>
                </div>

                <div className="ml-auto flex shrink-0 items-center">
                    <label className="relative hidden xl:block">
                        <span className="sr-only">Search</span>
                        <Search
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 left-3.5 size-[17px] -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            type="search"
                            placeholder="Search anything..."
                            className="h-[42px] w-[320px] rounded-[9px] border border-input bg-muted/70 pr-4 pl-10 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                        />
                    </label>

                    <div className="mx-4 hidden h-10 w-px bg-border xl:block" />

                    <button
                        type="button"
                        aria-label="Notifications, 6 unread"
                        className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        <Bell
                            aria-hidden="true"
                            className="size-[21px] stroke-[1.7]"
                        />
                        <span className="absolute top-0 right-0 flex size-[17px] items-center justify-center rounded-full border-2 border-card bg-destructive text-[9px] leading-none font-bold text-destructive-foreground">
                            6
                        </span>
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="ml-3 flex min-w-0 items-center gap-3 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            >
                                <Avatar className="size-10 border border-border bg-card shadow-sm">
                                    <AvatarImage
                                        src={avatarSource}
                                        alt={user.name}
                                        className="object-cover"
                                    />
                                </Avatar>
                                <span className="hidden min-w-0 leading-tight lg:block">
                                    <span className="block max-w-32 truncate text-xs font-bold text-foreground">
                                        {user.name}
                                    </span>
                                    <span className="mt-1 block text-[10px] text-muted-foreground">
                                        Alumni Member
                                    </span>
                                </span>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="hidden size-4 text-muted-foreground sm:block"
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            sideOffset={8}
                            className="w-60 rounded-lg"
                        >
                            <UserMenuContent user={user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
