import { AiFillPhone, AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { MdKeyboard, MdMic, MdStorefront, MdTv, MdWatch } from "react-icons/md";
import { ImCamera, ImHeadphones } from "react-icons/im";
import { FaStore } from "react-icons/fa";
export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Phone",
    icon: AiFillPhone,
  },
  {
    label: "Laptop",
    icon: AiOutlineLaptop,
  },
  {
    label: "Desktop",
    icon: AiOutlineDesktop,
  },
  {
    label: "Watch",
    icon: MdWatch,
  },
  {
    label: "Mic",
    icon: MdMic,
  },
  {
    label: "TV",
    icon: MdTv,
  },
  {
    label: "Camera",
    icon: ImCamera,
  },
  {
    label: "Accessories",
    icon: MdKeyboard,
  },
  {
    label: "Others",
    icon: FaStore,
  },
];
