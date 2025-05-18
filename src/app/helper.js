export function getSimplifiedDateTime(isoString) {
  const date = new Date(isoString);

  // Get the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the output as YYYY-MM-DD HH:mm:ss
  const simpleDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return simpleDateTime;
}

export function getSimplifiedTime(isoString) {
  const date = new Date(isoString);

  // Get the time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the output as YYYY-MM-DD HH:mm:ss
  const simpleDateTime = `${hours}:${minutes}:${seconds}`;
  return simpleDateTime;
}

export function getSimplifiedAddress(address) {
  const shortenedHex = address.slice(0, 7) + "..." + address.slice(-5);
  return shortenedHex;
}

export function isValidChangeLoginPassword(
  oldPassword,
  newPassword,
  confirmPassword
) {
  if (!oldPassword || !newPassword || !confirmPassword) return false;
  else if (newPassword != confirmPassword) return false;
  else return true;
}

export function isValidEmailRegister(
  email,
  verifyCode,
  password,
  confirmPassword
) {
  if (!email || !verifyCode || !password || !confirmPassword) return false;
  else if (password != confirmPassword) return false;
  else return true;
}

export function isValidPassword(password, confirmPassword) {
  if (!password || !confirmPassword) return false;
  else if (password != confirmPassword) return false;
  else return true;
}

export function isValidDocument(
  country,
  documentType,
  frontImageUrl,
  backImageUrl,
  handHeldImageUrl
) {
  if (!country || !frontImageUrl || !handHeldImageUrl || documentType == -1)
    return false;
  else if (!documentType == 1 && !backImageUrl) return false;
  else return true;
}

export function getRemainingTime(expireAt) {
  const now = new Date();
  const expireDate = new Date(expireAt);
  let diff = Math.max(0, expireDate - now); // 确保不为负数

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff %= 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return `${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M ${String(seconds).padStart(2, "0")}S`;
}

export function getUID(userProfile) {
  if (!userProfile?._id) return "";
  return userProfile?._id.slice(-8).toUpperCase();
}

export function hexToFixedLengthNumberString(hexStr, length = 12) {
  if (!hexStr) return "";
  const bigIntValue = BigInt("0x" + hexStr);

  const base = BigInt("1" + "0".repeat(length));
  const numStr = (bigIntValue % base).toString();

  return numStr.padStart(length, "0");
}
