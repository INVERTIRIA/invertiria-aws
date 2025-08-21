import { roles } from "../constants";
import { supabase } from "../supabase";
import { BaseModel } from "./BaseModel";

export class User extends BaseModel {
  constructor(data = {}, setErrorToast) {
    super(data, setErrorToast);
  }

  async create(captchaToken) {
    const toInsert = this.data;

    return await supabase.auth.signUp({
      email: toInsert.email,
      password: toInsert.password,
      options: {
        data: {
          first_name: toInsert.first_name,
          last_name: toInsert.last_name,
          role: roles[toInsert.role] || "user", // Asegúrate de usar un valor válido: 'admin', 'user' y 'advisor
        },
        captchaToken,
      },
    });
  }

  async login(withPassword = true, captchaToken) {
    if (!withPassword)
      return await supabase.auth.signInWithOtp({
        email: this.data.email,
        options: {
          captchaToken: captchaToken,
          emailRedirectTo: `${location.origin}/access-link`,
        },
      });

    return await supabase.auth.signInWithPassword({
      email: this.data.email,
      password: this.data.password,
      options: { captchaToken: captchaToken },
    });
  }

  async getCities(countryId = false) {
    if (!countryId) {
      const res = await supabase.from("ciudades").select("*");
      return res.data;
    }

    const res = await supabase
      .from("ciudades")
      .select("*")
      .eq("pais_id", countryId);

    return res.data;
  }

  async update(toUpdate) {
    const { first_name, last_name, ...rest } = toUpdate;

    const { error } = await supabase.auth.updateUser({
      data: {
        first_name,
        last_name,
      },
    });

    if (error) {
      this.setErrorToast(error.message);
      return;
    }

    const res = await supabase
      .from("usuarios")
      .update({ ...rest })
      .eq("usuario_id", this.data.usuario_id)
      .select()
      .single();

    if (res.error) {
      this.setErrorToast(res.error.message);
      return;
    }

    return res.data;
  }

  async shareAnalysis(email, modelacionId) {
    const res = await supabase.functions.invoke("shareAnalysis", {
      body: {
        email,
        modelacionId,
      },
    });

    return this.handleSupabaseFunctionResponse(res);
  }
}
