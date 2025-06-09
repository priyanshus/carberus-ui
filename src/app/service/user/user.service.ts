import {User} from "./user.model";

export function isCurrentUserHasAdminRole(user: User): boolean {
    return user.role.toLowerCase() == 'admin';
}

