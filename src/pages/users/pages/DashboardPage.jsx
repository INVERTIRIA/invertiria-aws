import PageTitle from "@/components/design/PageTitle";
import UserForm from "@/components/forms/UserForm";
import { useOutletContext } from "react-router";
import UserHeader from "../../../components/design/UserHeader";
import { useState } from "react";
const DashboardPage = () => {
  const { userInfo } = useOutletContext();
  const [data, setData] = useState(userInfo);

  return (
    <>
      <PageTitle title="Dashboard" />
      <UserHeader userInfo={data} />
      <UserForm userInfo={userInfo} setUserInfo={setData} />
    </>
  );
};

export default DashboardPage;
