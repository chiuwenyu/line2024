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

export enum Regime {
  // Vertical Up Flow Regime
  VerticalUpAnnularFlow,
  VerticalUpBubbleFlow,
  VerticalUpSlugAndChurnFlow,
  VerticalUpFinelyDispersedBubbleFlow,
  // Horizontal Flow Regime
  HorizontalStratifiedSmoothFlow,
  HorizontalStratifiedWavyFlow,
  HorizontalAnnularDispersedFlow,
  HorizontalElongatedBubbleFlow,
  HorizontalIntermittentSlugFlow,
  HorizontalDispersedBubbleFlow,
  // Vertical Down Flow Regime
  VerticalDownAnnularFlow,
  VerticalDownSlugFlow,
  VerticalDownDispersedBubbleFlow,
  // Others
  NONE,
}

export type VUResult = {
  // process data
  WL: number; // liquid mass flow rate [kg/hr]
  WG: number; // Vapor mass flow rate [kg/hr]
  LoL: number; // Liquid density [kg/m^3]
  LoG: number; // Vapor density [kg/m^3]
  muL: number; // Liquid viscosity [cP] -> [kg/m-s]
  muG: number; // Vapor viscosity [cP] -> [kg/m-s]
  ST: number; // Liquid surface tension [dyne/cm] -> [kg/s^2]
  rough: number; // pipe absolute roughness [mm] -> [m]
  SF: number; // Safety factor [-]
  ID: number; // pipe inside diameter [in] -> [m]
  degree: number; // degree,  Horizontal = 0, -Up / +Down

  // result
  regime_enum: Regime; // identify the flow regime(enum)
  flow_regime: string; // identify the flow regime(String)

  // for Similarity Analysis Model
  Loip: number; // two phase density [kg/m^3]
  RL: number; // Liquid Volume Fraction [-]
  UTP: number; // Two-Phase Velocity [m/sec]
  Head: number; // 1.0 Velocity Head [kgf/cm^2]
  Pfric: number; // Frictional Pressure Loss [kgf/cm^2/100m]
  Pgrav: number; // Elevation Head Loss [kgf/cm^2/100m]
  Ef: number; // Errosion Factor [-]

  // for Bubble Model
  LoNS: number; // two phase density [kg/m^3]
  Landa: number; // Liquid Volume Fraction [-]
  // UTP, Head, Pfric, Pgrav, Ef same as Similarity

  // for Slug Model
  LoLS: number; // Liquid Slug Density [kg/m^3]
  LoSU: number; // Two phase slug unit density [kg/m^3]
  ULLS: number; // Liquid Slug Velocity [m/sec]
  LLS: number; // Liquid Slug Length [m]
  Lu: number; // Slug unit length [m]
  Le: number; // Stabilizes to Slug flow in x m
  // Head, Pfric, Pgrav, Ef same as Similarity

  // state variable
  is_unit_change: boolean; // is call the unit_transfer and transfer to unit
};
