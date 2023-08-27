export const checkIfReferredUser = () => {
  const refLink = localStorage.getItem("referralCode");
  console.log(refLink, "refLink");
  return refLink === null
    ? { isReferred: false, refLink: null }
    : { isReferred: true, refLink };
};
