import { ElementType } from "react";
import { FaListUl, FaRegStickyNote } from "react-icons/fa";
import { MdCloudDownload, MdDashboard, MdLink, MdSchool, MdWork } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { BsChat, BsGear } from "react-icons/bs";
import { AiFillAlert } from "react-icons/ai";

export function iconSelector(icon: ElementType | string) {

  switch(icon){

    case "MdSchool":
      return MdSchool;

    case "MdDashboard":
      return MdDashboard;

    case "MdWork":
      return MdWork;
    
    case "AiFillAlert":
      return AiFillAlert;

    case "FaListUl":
      return FaListUl;

    case "FaRegStickyNote":
      return FaRegStickyNote;

    case "LuClipboardEdit":
      return LuClipboardEdit;

    case "MdCloudDownload":
      return MdCloudDownload;

    case "BsGear":
      return BsGear; 

    case "BsChat":
      return BsChat;

    default: 
      return MdLink;
  }
}