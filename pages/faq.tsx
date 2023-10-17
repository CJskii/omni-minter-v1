import dynamic from "next/dynamic";
import HeadComponent from "../components/HeadComponent";

const FaqSection = dynamic(() => import("../components/Faq/FaqSection"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

const FAQ = () => {
  return (
    <>
      <HeadComponent
        title="Mintly Frequently Asked Questions"
        description="Explore the common questions and answers about Mintly."
      />
      <FaqSection />
    </>
  );
};

export default FAQ;
