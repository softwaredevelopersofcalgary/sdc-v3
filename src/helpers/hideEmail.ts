// function that partially hides email
export const hideEmail = (email: string) => {
  const [first, last] = email.split("@");
  const firstPart = first?.slice(0, 3);
  const lastPart = last?.slice(0, 3);
  return `${firstPart}...@${lastPart}`;
};

export function hideEmailBetter(email: string | undefined | null) {
  return email?.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
    for (let i = 0; i < gp3.length; i++) {
      gp2 += "*";
    }
    return gp2;
  });
}
