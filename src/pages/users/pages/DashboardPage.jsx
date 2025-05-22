import PageTitle from "@/components/design/PageTitle";
import UserForm from "@/components/forms/UserForm";
import { useOutletContext } from "react-router";
const DashboardPage = () => {
  const { userInfo } = useOutletContext();

  return (
    <>
      <PageTitle title="Dashboard" />
      <UserForm userInfo={userInfo} />
    </>
  );
};

export default DashboardPage;
