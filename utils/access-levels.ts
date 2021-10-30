import { UserRole } from "enums/userRole.enum";

export const accessLevels = {
  [UserRole.ADMIN]: "Admin",
  [UserRole.SUPER_ADMIN]: "Super Admin",
};

export const serializedAccessLevels = Object.keys(accessLevels).map(
  (level) => ({
    id: level,
    text: accessLevels[level],
  })
);
