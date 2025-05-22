import clsx from "clsx";

const Container = ({ classNameParent, className, children }) => {
  return (
    <div className={clsx(classNameParent, "px-4 sm:px-6 lg:px-8")}>
      <div className={clsx(className, "mx-auto max-w-4xl lg:max-w-[1580px]")}>
        {children}
      </div>
    </div>
  );
};

export { Container };
