export interface SingleData {
  Single_ProcessData: SingleProcessData;
  Single_OptionData: SingleOptionData;
  Single_ProjectData: SingleProjectData;
  Single_LineData: SingleLineData;
}

export interface SingleProcessData {
  Single_FluidType: string;
  Single_MassFlowRate: string;
  Single_Density: string;
  Single_Viscosity: string;
  Single_Roughness: string;
  Single_SafeFactor: string;
}

export interface SingleOptionData {
  Single_lowPres: string;
  Single_highPres: string;
  Single_lowID: string;
  Single_highID: string;
  Single_OptValue: string;
}

export interface SingleProjectData {
  Single_projNo: string;
  Single_projName: string;
  Single_projDesc: string;
}

export interface SingleLineData {
  Single_lineNo: string;
  Single_lineFrom: string;
  Single_lineTo: string;
  Single_note: string;
}

export type Result = {
  w: number; // fluid flow rate [kg/hr]
  rho: number; // fluid density [kg/m^3]
  mu: number; // fluid viscosity [N-sec/m^2] = [Kg/m3/sec]
  id: number; // pipe inside diameter [m]
  e: number; // pipe roughness [m]
  sf: number; // safety factor [-]
  // output fields
  v: number; // fluid flow velocity [m/s]
  nre: number; // Reynold number [-]
  fdarcy: number; // Darcy Friction Factor [-]
  dp100: number; // pressure drop per 100m
  vh: number; // velocity head vh = rho * v^2
};
