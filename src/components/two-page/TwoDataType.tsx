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
  LoL: number; // liquid density [kg/m^3]
  LoG: number; // vapor density [kg/m^3]
  muL: number; // liquid viscosity [cP]
  muG: number; // vapor viscosity [cP]
  ST: number; // surface tension [dyne/cm]
  rough: number; // roughness [mm]
  SF: number; // safety factor
  ID: number; // inner diameter [mm]
  degree: number; // slope [degree]
};
