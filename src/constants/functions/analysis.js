import {
  Engorde,
  Flipping,
  RentaCorta,
  RentaTradicional,
} from "../../components/design/Icons";
import {
  titularidad as titularidadConst,
  tipoInmueble as tipoInmuebleConst,
  modeloNegocio as modeloNegocioConst,
  stepsQuestions,
} from "../../constants/index";
import { supabase } from "../../supabase";

class Analysis {
  constructor(form, tipoInmueble, estadoInmueble, titularidad) {
    this.form = form;
    this.tipoInmueble = tipoInmueble;
    this.estadoInmueble = estadoInmueble;
    this.titularidad = titularidad;
    this.modeling = null;
    this.projectInformation = null;
    this.projectInformationModel = null;
    this.models = [];
  }

  /* Private functions */
  #validateFinancialGrowth() {
    if (this.tipoInmueble === tipoInmuebleConst.lote) {
      this.models.push({
        id: "engorde",
        value: modeloNegocioConst.engorde,
        icon: Engorde,
      });
    }
  }

  #validateFlipping() {
    const toInsert = {
      id: "flipping",
      value: modeloNegocioConst.flipping,
      icon: Flipping,
    };

    if (
      this.tipoInmueble === tipoInmuebleConst.hotel ||
      this.tipoInmueble === tipoInmuebleConst.coliving ||
      this.estadoInmueble !== "Usado"
    )
      return;

    // Validar titularidad
    if (!this.titularidad || this.tipoInmueble === tipoInmuebleConst.oficina) {
      this.models.push(toInsert);
    }

    // Validar tipo de inmueble
    if (
      this.titularidad === titularidadConst.matriculaInmobiliaria &&
      [tipoInmuebleConst.local, tipoInmuebleConst.consultorio].includes(
        this.tipoInmueble
      )
    ) {
      this.models.push(toInsert);
    }
  }

  #validateShortTermRental() {
    if (
      [
        tipoInmuebleConst.apartamento,
        tipoInmuebleConst.casa,
        tipoInmuebleConst.hotel,
      ].includes(this.tipoInmueble)
    ) {
      this.models.push({
        id: "renta-corta",
        value: modeloNegocioConst.rentaCorta,
        icon: RentaCorta,
      });
    }
  }

  #validateTraditionalRental() {
    const toInsert = {
      id: "renta-tradicional",
      value: modeloNegocioConst.rentaTradicional,
      icon: RentaTradicional,
    };

    if (
      this.tipoInmueble === tipoInmuebleConst.lote ||
      this.tipoInmueble === tipoInmuebleConst.hotel
    )
      return;

    if (
      ![tipoInmuebleConst.oficina, tipoInmuebleConst.consultorio].includes(
        this.tipoInmueble
      )
    ) {
      this.models.push(toInsert);
      return;
    }

    // Validar cuando es consultorio
    if (
      this.tipoInmueble === tipoInmuebleConst.consultorio &&
      this.titularidad === titularidadConst.participacionFiduciaria
    )
      return;

    // Validar cuando es oficina
    if (
      this.tipoInmueble === tipoInmuebleConst.oficina &&
      this.estadoInmueble === "Usado" &&
      this.titularidad === titularidadConst.matriculaInmobiliaria
    )
      return;

    this.models.push(toInsert);
    return;
  }

  #validateModels() {
    this.models = [];

    if (!this.tipoInmueble || !this.estadoInmueble) return;

    this.#validateFinancialGrowth(); // Engorde
    this.#validateFlipping();
    this.#validateShortTermRental();
    this.#validateTraditionalRental();
  }

  /* Setters */
  setTipoInmueble(tipoInmueble) {
    this.tipoInmueble = tipoInmueble;
    return this;
  }

  setTitularidad(titularidad) {
    this.titularidad = titularidad;
    return this;
  }

  setEstadoInmueble(estadoInmueble) {
    this.estadoInmueble = estadoInmueble;
    return this;
  }

  setModeling(modeling) {
    this.modeling = modeling;
    return this;
  }

  setProjectInformation(projectInformation) {
    this.projectInformation = projectInformation;
    return this;
  }
  setProjectInformationModel(projectInformation) {
    this.projectInformationModel = projectInformation;
    return this;
  }

  /* Public functions */
  getBusinessModels() {
    this.#validateModels();
    return this.models;
  }

  async getDataModeling(businessModel) {
    const { data, error } = await supabase
      .from("modelaciones")
      .select("*")
      .eq("modelo_de_negocio", businessModel)
      .is("modelacion_plantilla", true)
      .limit(1)
      .single();

    if (error) return null;

    return data;
  }

  async getProjectInformation(projectName) {
    const { data, error } = await supabase
      .from("proyectos_inmobiliarios")
      .select("*, ciudad:ciudad_id(nombre)")
      .eq("nombre", projectName)
      .limit(1)
      .single();

    if (error) return null;

    return data;
  }

  skipStep(step) {
    // Agregar informacion del proyecto para marcar en el mapa
    if (step === 7 || step === 6) {
      this.setProjectInformation(this.projectInformationModel);
    }

    const { questions } = stepsQuestions.find((q) => q.step == step);

    for (const question of questions) {
      const value = this.modeling?.[question];
      this.form.setValue(question, value);
    }
  }
}

export default Analysis;
