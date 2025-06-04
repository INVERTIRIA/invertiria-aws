export class BaseModel {
  constructor(data = {}, setErrorToast) {
    this.data = data;
    this.setErrorToast = setErrorToast;
  }

  async handleSupabaseFunctionResponse(res) {
    const { data, error } = res;

    if (error && !data) {
      const res = await error.context.json();
      this.setErrorToast(res.error);

      return res;
    }

    return {
      status: true,
      data,
    };
  }
}
