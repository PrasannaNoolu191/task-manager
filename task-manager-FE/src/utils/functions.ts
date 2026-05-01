export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
export const getAvatarUrl = (avatar: string | undefined | null) => {
  if (!avatar) return null;
  // If already absolute URL, return as is
  if (/^https?:\/\//.test(avatar)) return avatar;
  // Otherwise, prefix with backend URL
  return `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${avatar}`;
};
