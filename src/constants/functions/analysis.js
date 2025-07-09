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
} from "../../constants/index";

class Analysis {
  constructor(tipoInmueble, estadoInmueble, titularidad) {
    this.tipoInmueble = tipoInmueble;
    this.estadoInmueble = estadoInmueble;
    this.titularidad = titularidad;
    this.models = [];
  }

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

  getBusinessModels() {
    this.#validateFinancialGrowth(); // Engorde
    this.#validateFlipping();
    this.#validateShortTermRental();
    this.#validateTraditionalRental();

    return this.models;
  }
}

export default Analysis;
