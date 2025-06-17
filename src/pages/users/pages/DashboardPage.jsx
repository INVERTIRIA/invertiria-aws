import PageTitle from "@/components/design/PageTitle";
import UserForm from "@/components/forms/UserForm";
import { useOutletContext } from "react-router";
import UserHeader from "../../../components/design/UserHeader";
const DashboardPage = () => {
  const { userInfo, setUserInfo } = useOutletContext();

  return (
    <>
      <PageTitle title="Dashboard" />
      <UserHeader userInfo={userInfo} />
      <UserForm userInfo={userInfo} setUserInfo={setUserInfo} />
    </>
  );
};

export default DashboardPage;
