import { roles } from "../constants";
import { supabase } from "../supabase";
import { BaseModel } from "./BaseModel";

export class Admin extends BaseModel {
  constructor(data = {}, setErrorToast) {
    super(data, setErrorToast);
  }

  /* Advisors
  ___________________________________________________ */
  async getAdvisors(role) {
    const additionalQuery =
      role === roles.company ? "" : ", empresa:empresas(name)";

    return await supabase
      .from("asesores")
      .select(
        `*, usuarios(nombre, apellidos, email, ciudad, fecha_de_nacimiento) ${additionalQuery}`
      )
      .then((res) => res.data);
  }

  async createAdvisor(data) {
    const res = await supabase.functions.invoke("createAdvisor", {
      body: JSON.stringify(data),
    });

    return this.handleSupabaseFunctionResponse(res);
  }

  /* Companies
  ___________________________________________________ */
  async getCompanies() {
    return await supabase
      .from("empresas")
      .select(
        "*, usuarios(nombre, apellidos, email, ciudad, fecha_de_nacimiento)"
      )
      .then((res) => res.data);
  }
}
