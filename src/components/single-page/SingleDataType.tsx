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
