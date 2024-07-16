export interface TwoData {
  Two_ProcessData: TwoProcessData;
  Two_OptionData: TwoOptionData;
  Two_ProjectData: TwoProjectData;
  Two_LineData: TwoLineData;
}

export interface TwoProcessData {
  Two_LiquidFlowRate: string;
  Two_VaporFlowRate: string;
  Two_LiquidDensity: string;
  Two_VaporDensity: string;
  Two_LiquidViscosity: string;
  Two_VaporViscosity: string;
  Two_SurfaceTension: string;
  Two_Roughness: string;
  Two_Slope: string;
  Two_SafeFactor: string;
}

export interface TwoOptionData {
  Two_lowPres: string;
  Two_highPres: string;
  Two_lowID: string;
  Two_highID: string;
  Two_OptValue: string;
}

export interface TwoProjectData {
  Two_projNo: string;
  Two_projName: string;
  Two_projDesc: string;
}

export interface TwoLineData {
  Two_lineNo: string;
  Two_lineFrom: string;
  Two_lineTo: string;
  Two_note: string;
}

export type VUResult = {
  // process data
  WL: number; // liquid mass flow rate [kg/hr]
  WG: number; // Vapor mass flow rate [kg/hr]
  LoL: number; // liquid density [kg/m^3]
  LoG: number; // vapor density [kg/m^3]
  muL: number; // liquid viscosity [cP]
  muG: number; // vapor viscosity [cP]
  ST: number; // surface tension [dyne/cm]
  rough: number; // roughness [mm]
  SF: number; // safety factor
  ID: number; // inner diameter [mm]
  degree: number; // slope [degree]
  flow_regime: string; // flow regime
  Head: number; // 1.0 Velocity Head [Kgf/cm^2]
  Pfric: number; // frictional pressure drop [Kgf/cm^2/100m]
  Pgrav: number; // Elevation Head Loss [Kgf/cm^2/100m]
  Ef: number; //Erosion Factor [-]
  LoLS: number; // Liquid Slug Unit Density [Kg/m^3]
  LoSU: number; // Two-Phase Slug Unit Density [Kg/m^3]
  ULLS: number; // Liquid Slug Velocity [m/s]
  LLS: number; // Liquid Slug Length [m]
  Lu: number; // Slug Unit Length [m]
  Le: number; // Stabilizers to Slug Flow in x m [m]
  Loip: number; // Two-Phase Density [Kg/cm^3]
  RL: number; // Liquid Volum Fraction [-]
  UTP: number; // Two-Phase Velocity [m/s]
  LoNS: number; // Two-Phase Density [Kg/cm^3]
  Landa: number; // Liquid Volume Fraction [-]
};

export type HORIResult = {
  // process data
  WL: number; // liquid mass flow rate [kg/hr]
  WG: number; // Vapor mass flow rate [kg/hr]
  LoL: number; // liquid density [kg/m^3]
  LoG: number; // vapor density [kg/m^3]
  muL: number; // liquid viscosity [cP]
  muG: number; // vapor viscosity [cP]
  ST: number; // surface tension [dyne/cm]
  rough: number; // roughness [mm]
  SF: number; // safety factor
  ID: number; // inner diameter [mm]
  degree: number; // slope [degree]
  flow_regime: string; // flow regime
  Head: number; // 1.0 Velocity Head (Kgf/cm^2)
  Pfric: number; // frictional pressure drop [Kgf/cm^2/100m]
  Ef: number; //Erosion Factor [-]
  Loip: number; // Two-Phase Density [Kg/cm^3]
  RL: number; // Liquid Volum Fraction [-]
  UTP: number; // Two-Phase Velocity [m/s]
};
