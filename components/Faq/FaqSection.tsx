import QnA from "./QuestionComponent";
import { Questions } from "../../common/modules/data/faq";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

const FaqSection = () => {
  return (
    <section className="py-10 bg-base-200 sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            FAQ
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">
            Explore the common questions and answers about Mintly
          </p>
        </div>

        <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
          {Questions.map((qna, index) => (
            <QnA key={index} question={qna.question} answer={qna.answer} />
          ))}
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default FaqSection;
