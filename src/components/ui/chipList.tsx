import { ChipListProps } from "../../types/chip";
import Chip from "./chip";

export default function ChipList({ items }: ChipListProps) {
    const temp=[...items]
    temp.sort((a,b)=> a.length-b.length)
  return (
    <div className="flex flex-wrap gap-2">
      {temp.map((item, index) => (
        <Chip key={index} text={item} ></Chip>
      ))}
    </div>
  );
}
