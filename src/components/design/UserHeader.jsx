import { Button } from "../ui/button";
import { Mail } from "lucide-react";

const UserHeader = ({ userInfo }) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        className="self-stretch h-40 sm:h-60 relative rounded-xl"
        src="/assets/images/user-header.jpg"
      />
      <div className="-mt-14 sm:-mt-10 lg:px-10 flex flex-col sm:flex-row gap-6 items-center">
        <div
          data-placeholder="False"
          data-size="lg"
          data-text="False"
          data-verified="true"
          className="w-40 h-40 relative rounded-[200px]"
        >
          <div className="w-40 h-40 p-1.5 left-0 top-0 absolute bg-white rounded-full outline-2 outline-black/10 inline-flex justify-center items-center">
            <img
              className="flex-1 self-stretch relative rounded-[200px] shadow-[0px_24px_48px_-12px_rgba(10,13,18,0.18)] border border-black/10 size-full object-cover"
              src={userInfo.img_perfil || "/assets/svg/logo-2.svg"}
            />
          </div>
          {userInfo.is_verified && (
            <div
              data-size="4xl"
              className="w-9 h-9 left-[120px] top-[120px] absolute overflow-hidden"
            >
              <img
                src="/assets/svg/verified.svg"
                alt="User Verified"
                className="object-cover size-full"
              />
            </div>
          )}
        </div>
        <div className="flex-grow flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              {userInfo.nombre
                ? `${userInfo.nombre} ${userInfo.apellidos}`
                : "Invertiria"}
            </h1>
            <p className="text-sm leading-6 text-gray-600">
              {userInfo.email || "soytodero@soytodero.com"}
            </p>
          </div>
          <Button variant={"theme"} className={"sm:ml-auto"}>
            <Mail className="size-5" /> Cambiar email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
