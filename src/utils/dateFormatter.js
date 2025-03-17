export function formatDate(dateString) {
  if (!dateString) return "Unknown date";

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    // Format: "Mar 15, 2023"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date error";
  }
}

export function timeAgo(dateString) {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    const now = new Date();

    if (isNaN(date.getTime()) || isNaN(now.getTime())) {
      throw new Error("Invalid date");
    }
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsAgo < 60) {
      return "just now";
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    }

    // If more than a week, use the standard date format
    return formatDate(dateString);
  } catch (error) {
    console.error("Error calculating time ago:", error);
    return "";
  }
}
