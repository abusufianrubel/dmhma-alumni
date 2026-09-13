import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const avatarSource = user.avatar ?? '/storage/avatars/avatar%20(4).jpg';

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full border border-border bg-card">
                <AvatarImage
                    src={avatarSource}
                    alt={user.name}
                    className="object-cover"
                />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
