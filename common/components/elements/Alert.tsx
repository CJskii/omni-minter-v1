import { FaRegThumbsUp } from "react-icons/fa";
import { useEffect, useState } from "react";
const Alert = (props: { title: string; link: string }) => {
  const { title, link } = props;

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alert = localStorage.getItem("Mintly-alert");
    if (!alert) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    return () => {};
  }, []);

  const handleClick = () => {
    setShowAlert(false);
    localStorage.setItem("Mintly-alert", "false");
  };

  return (
    <div
      role="alert"
      className={`alert alert-info rounded-none flex justify-center items-center bg-base-200 border-x-0 border-t-0 border-b-2 border-b-primary ${!showAlert ? "hidden" : ""}`}
    >
      <a
        href={link}
        // target="_blank"
        className="animated-gradient-text text-md font-bold"
      >
        {title}
      </a>
      <FaRegThumbsUp
        className="fill-white hover:fill-accent cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default Alert;
