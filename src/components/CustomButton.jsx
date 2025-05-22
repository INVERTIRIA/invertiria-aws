import clsx from "clsx";
import { Link } from "react-router";

const CustomButton = ({ href, className, tittle, children }) => {
  const renderLink = () => <Link className={clsx(className)} to={href}></Link>;

  return <div>CustomButton</div>;
};

export default CustomButton;
