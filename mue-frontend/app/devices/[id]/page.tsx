import { IDevice } from "@/types/types";

export default function Device(props: { device: IDevice }) {
  const { device } = props;

  return (
    <div
      className="device"
    >
      <h3>{device.alias}</h3>
      <p>{device.id}</p>
    </div>
  );
}
