export function TimeAgo(date: string): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();

  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInSecs < 60) {
    return `${Math.floor(diffInSecs)}s`;
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}min`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `${Math.floor(diffInDays)}days`;
  }
}
