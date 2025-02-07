"use strict";
exports.__esModule = true;
exports.userHasRole = exports.userHasPermission = exports.parsePermissionString = exports.useUser = exports.useOptionalUser = void 0;
var react_1 = require("@remix-run/react");
function isUser(user) {
    return user && typeof user === 'object' && typeof user.id === 'string';
}
function useOptionalUser() {
    var data = (0, react_1.useRouteLoaderData)('root');
    if (!data || !isUser(data.user)) {
        return undefined;
    }
    return data.user;
}
exports.useOptionalUser = useOptionalUser;
function useUser() {
    var maybeUser = useOptionalUser();
    if (!maybeUser) {
        throw new Error('No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.');
    }
    return maybeUser;
}
exports.useUser = useUser;
function parsePermissionString(permissionString) {
    var _a = permissionString.split(':'), action = _a[0], entity = _a[1], access = _a[2];
    return {
        action: action,
        entity: entity,
        access: access ? access.split(',') : undefined
    };
}
exports.parsePermissionString = parsePermissionString;
function userHasPermission(user, permission) {
    if (!user)
        return false;
    var _a = parsePermissionString(permission), action = _a.action, entity = _a.entity, access = _a.access;
    return user.roles.some(function (role) {
        return role.permissions.some(function (permission) {
            return permission.entity === entity &&
                permission.action === action &&
                (!access || access.includes(permission.access));
        });
    });
}
exports.userHasPermission = userHasPermission;
function userHasRole(user, role) {
    if (!user)
        return false;
    return user.roles.some(function (r) { return r.name === role; });
}
exports.userHasRole = userHasRole;
