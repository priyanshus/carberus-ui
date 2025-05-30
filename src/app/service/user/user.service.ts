import User from "./user.model";

export function isCurrentUserHasAdminRole(user: User): boolean {
    const isAdminRolePresent = user.roles.filter(role => role.toLowerCase() == 'admin');
    return isAdminRolePresent.length > 0 ? true : false;
}

