export const secondsToDate = (seconds: number) => {
  const date = new Date(seconds);

  const pad = (num: number) => num.toString().padStart(2, "0");
  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
  };
};

export const formattedSeconds = (milliseconds: number) => {
  if (milliseconds < 0) return;
  let seconds = milliseconds / 1000;
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
  return (
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`
  );
};

export const loadingResultTime = (timeStamp: number, duration: number) => {
  const now = new Date().getTime();
  const loadingTime = duration - now + timeStamp;
  if (loadingTime < 0) return;
  return formattedSeconds(loadingTime);
};

export const formattedTimeFromSeconds = (seconds: number, isShort: boolean = false) => {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  if (days > 0) return `${days}${isShort ? "d" : "day"}${!isShort && days > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours}${isShort ? "h" : "hour"}${!isShort && hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `${minutes}${isShort ? "m" : "min"}${!isShort && minutes > 1 ? "s" : ""}`;
  return `${seconds}s`;
};

export function convertToLocalTime(utcString) {
  const date = new Date(utcString);

  const localMonth = String(date.getMonth() + 1).padStart(2, "0");
  const localDay = String(date.getDate()).padStart(2, "0");
  const localHours = String(date.getHours()).padStart(2, "0");
  const localMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${localMonth}-${localDay}T${localHours}:${localMinutes}`;
}
