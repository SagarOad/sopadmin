export const checkUserRole = (
  userRole: number,
  allowedRoles: number[]
): boolean => {
  return allowedRoles.includes(userRole);
};
