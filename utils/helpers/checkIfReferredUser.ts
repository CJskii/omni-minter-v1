export const checkIfReferredUser = () => {
  const refLink = localStorage.getItem("referralCode");
  return refLink === null
    ? { isReferred: false, refLink: null }
    : { isReferred: true, refLink };
};
