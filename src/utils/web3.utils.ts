export const isValidSolanaAddress = (address: string) => {
  const base58Chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  if (address.length < 42 || address.length > 44) return false;

  for (let i = 0; i < address.length; i++) {
    if (!base58Chars.includes(address[i])) {
      return false;
    }
  }
  return true;
};

export const shortenAddress = (address?: string) => {
  if (!address) return "";
  if (address.length < 8) return address;
  return address.slice(0, 4) + "..." + address.slice(-4);
};
