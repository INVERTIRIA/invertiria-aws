import { roles } from "../constants";
import { supabase } from "../supabase";
import { BaseModel } from "./BaseModel";

export class Admin extends BaseModel {
  constructor(data = {}, setErrorToast) {
    super(data, setErrorToast);
  }

  /* Users
  ___________________________________________________ */
  async getUsers() {
    const { data, error } = await supabase.rpc("get_users");

    if (error) {
      this.setErrorToast(error.message);
    }

    return data ? data.map((item) => item.result) : [];
  }

  async getUsersBy(field, search, role) {
    const { data, error } = await supabase.rpc("get_users_by", {
      field,
      search,
      role,
    });

    if (error) {
      this.setErrorToast(error.message);
    }

    return data ? data.map((item) => item.result.usuario) : [];
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

  async updateAdvisor(data) {
    const res = await supabase.functions.invoke("updateAdvisor", {
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

  async createCompany(data) {
    const res = await supabase.functions.invoke("createCompany", {
      body: JSON.stringify(data),
    });

    return this.handleSupabaseFunctionResponse(res);
  }
}
