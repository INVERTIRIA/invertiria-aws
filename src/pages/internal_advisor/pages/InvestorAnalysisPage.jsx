// Hooks
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { supabase } from "../../../supabase";

const InvestorAnalysisPage = () => {
  /* HOOKS
  ___________________________________________ */
  const { id } = useParams();
  const [record, setRecord] = useState([]);
  const navigate = useNavigate();
  const effectRan = useRef(false);

  /* FUNCIONES
  ___________________________________________ */
  const fetchRecord = async () => {
    const { error, data } = await supabase
      .from("asesorados")
      .select("id, usuario:usuario_id(*)")
      .eq("usuario_id", id);

    if (error) {
      toast.error(error.message);
      navigate(-1);
      return;
    }

    setRecord(data);
  };

  useEffect(() => {
    if (!effectRan.current) {
      fetchRecord();
      effectRan.current = true;
    }
  }, []);

  return <div>InvestorAnalysisPage</div>;
};

export default InvestorAnalysisPage;
