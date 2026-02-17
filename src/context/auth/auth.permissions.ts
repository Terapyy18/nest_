export const Permissions = {
    // User Management
    READ_USER: 1n << 0n,   // 1
    UPDATE_USER: 1n << 1n, // 2
    DELETE_USER: 1n << 2n, // 4

    // Material Management
    READ_MATERIAL: 1n << 8n,   // 256
    MANAGE_MATERIAL: 1n << 9n, // 512

    // Printer Management
    READ_PRINTER: 1n << 10n,   // 1024
    MANAGE_PRINTER: 1n << 11n, // 2048

    // Admin Management
    MANAGE_ROLES: 1n << 6n, // 64
    ADMIN: 1n << 7n,        // 128
};

export const PermissionMasks = {

    // Default permissions for a standard logged-in user
    STANDARD_USER: Permissions.READ_MATERIAL | Permissions.READ_PRINTER,

    USER_MANAGEMENT: Permissions.READ_USER | Permissions.UPDATE_USER | Permissions.DELETE_USER,

    MATERIAL_MANAGEMENT: Permissions.READ_MATERIAL | Permissions.MANAGE_MATERIAL,

    PRINTER_MANAGEMENT: Permissions.READ_PRINTER | Permissions.MANAGE_PRINTER,

    ALL: (1n << 12n) - 1n,
};


export class PermissionHelper {
    static has(userPermissions: string | bigint, requiredPermission: bigint): boolean {
        const permissions = BigInt(userPermissions);
        return (permissions & requiredPermission) === requiredPermission;
    }

    static add(userPermissions: string | bigint, permissionToAdd: bigint): bigint {
        return BigInt(userPermissions) | permissionToAdd;
    }

    static remove(userPermissions: string | bigint, permissionToRemove: bigint): bigint {
        return BigInt(userPermissions) & ~permissionToRemove;
    }

    static hasAny(userPermissions: string | bigint, requiredPermissions: bigint[]): boolean {
        const permissions = BigInt(userPermissions);
        for (const permission of requiredPermissions) {
            if ((permissions & permission) === permission) {
                return true;
            }
        }
        return false;
    }
}
