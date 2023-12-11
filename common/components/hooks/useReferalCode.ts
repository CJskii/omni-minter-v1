import { useEffect } from "react";
import { NextRouter } from "next/router";
const useReferalCode = (router: NextRouter) => {
  useEffect(() => {
    const referralCode = router.query.invite;
    if (referralCode) {
      try {
        localStorage.setItem("Mintly_referralCode", referralCode as string);
      } catch (e) {
        console.error("Could not set referral code:", e);
      }
      if (router.pathname !== "/") {
        router.push("/");
      }
    }
  }, [router]);
};

export default useReferalCode;
