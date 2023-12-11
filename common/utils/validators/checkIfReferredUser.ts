export const checkIfReferredUser = () => {
  const refLink = localStorage.getItem("Mintly_referralCode");
  return refLink === null
    ? { isReferred: false, refLink: null }
    : { isReferred: true, refLink };
};
