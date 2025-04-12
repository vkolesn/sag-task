import { CPUType } from "../components/cpuselect/CPUSelectTypes";

export enum ServerType {
  TowerServer = "Tower Server",
  RackServer = "4U Rack Server",
  Mainframe = "Mainframe",
  HighDensity = "High Density Server",
}

const towerServerAvailable = (
  cpu: CPUType,
  memorySize: number,
  useGPU: boolean
): boolean => {
  if (useGPU) {
    return false;
  }
  if (memorySize < 2048) {
    return false;
  }
  if (cpu !== CPUType.Power && cpu !== CPUType.X86) {
    return false;
  }
  return true;
};

const rackServerAvailable = (
  cpu: CPUType,
  memorySize: number,
  useGPU: boolean
): boolean => {
  if (useGPU) {
    return false;
  }
  if (memorySize < 131072) {
    return false;
  }
  if (cpu !== CPUType.Power && cpu !== CPUType.X86) {
    return false;
  }
  return true;
};

const mainframeServerAvailable = (
  cpu: CPUType,
  memorySize: number,
  useGPU: boolean
): boolean => {
  if (useGPU) {
    return false;
  }
  if (memorySize < 2048) {
    return false;
  }
  if (cpu !== CPUType.Power) {
    return false;
  }
  return true;
};

const highDensityServerAvailable = (
  cpu: CPUType,
  memorySize: number,
  _useGPU: boolean
): boolean => {
  if (memorySize < 524288) {
    return false;
  }
  if (cpu !== CPUType.ARM) {
    return false;
  }
  return true;
};

export type AvailabilityFunc = (
  cpu: CPUType,
  memorySize: number,
  useGPU: boolean
) => boolean;

// map enum to an availability check function
export const ServerAvailability: Record<ServerType, AvailabilityFunc> = {
  [ServerType.TowerServer]: towerServerAvailable,
  [ServerType.RackServer]: rackServerAvailable,
  [ServerType.Mainframe]: mainframeServerAvailable,
  [ServerType.HighDensity]: highDensityServerAvailable,
};
