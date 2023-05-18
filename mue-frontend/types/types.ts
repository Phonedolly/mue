interface IDeviceState {
  isConnected: boolean;
  isConnecting: boolean;
  isOn: boolean;
  brightness: number;
  color: { red: number; green: number; blue: number };
  ip: string;
  latency?: number;
}

export interface IDevice {
  id: string;
  alias: string;
  type: "strip" | "bulb" | "play";
  status: IDeviceState;
}
