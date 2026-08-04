import {ChipProps} from "../../types/chip";

export default function Chip({ text }: ChipProps) {
  return <span className="self-start px-3 py-0.5 text-center rounded-full font-md border border-red-500 bg-red-500/30 ">{text}</span>;
}
