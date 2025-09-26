import { IconType } from 'react-icons';

import {
   HiChevronUp,
   HiChevronDown,
   HiChevronRight,
   HiChevronLeft,
   HiArrowUpRight,
   HiOutlineArrowPath,
   HiCheck,
   HiMiniQuestionMarkCircle,
   HiMiniXMark,
   HiOutlineLink,
   HiExclamationTriangle,
   HiInformationCircle,
   HiExclamationCircle,
   HiCheckCircle,
   HiMiniGlobeAsiaAustralia,
   HiEnvelope,
   HiCalendarDays,
   HiClipboard,
} from "react-icons/hi2";

// Добавляем новый импорт для AiOutlineDollar
import { AiOutlineDollar } from "react-icons/ai";

import {
   PiHouseDuotone,
   PiUserCircleDuotone,
   PiGridFourDuotone,
   PiBookBookmarkDuotone,
   PiImageDuotone
} from "react-icons/pi";

import {
   FaDiscord,
   FaGithub,
   FaLinkedin,
   FaXTwitter,
   FaInstagram,
   FaWhatsapp
} from "react-icons/fa6";

/**
 * @name iconLibrary
 * @description
 * A comprehensive library of icons used throughout the application. It maps a
 * string-based key (e.g., 'chevronUp') to an actual icon component from various
 * `react-icons` libraries. This allows for easy and consistent use of icons
 * by referencing their string name.
 * @type {Record<string, IconType>}
 */
export const iconLibrary: Record<string, IconType> = {
   chevronUp: HiChevronUp,
   chevronDown: HiChevronDown,
   chevronRight: HiChevronRight,
   chevronLeft: HiChevronLeft,
   refresh: HiOutlineArrowPath,
   arrowUpRight: HiArrowUpRight,
   check: HiCheck,
   helpCircle: HiMiniQuestionMarkCircle,
   infoCircle: HiInformationCircle,
   warningTriangle: HiExclamationTriangle,
   errorCircle: HiExclamationCircle,
   checkCircle: HiCheckCircle,
   email: HiEnvelope,
   globe: HiMiniGlobeAsiaAustralia,
   person: PiUserCircleDuotone,
   grid: PiGridFourDuotone,
   book: PiBookBookmarkDuotone,
   close: HiMiniXMark,
   openLink: HiOutlineLink,
   calendar: HiCalendarDays,
   home: PiHouseDuotone,
   gallery: PiImageDuotone,
   discord: FaDiscord,
   github: FaGithub,
   linkedin: FaLinkedin,
   x: FaXTwitter,
   instagram: FaInstagram,
   whatsapp: FaWhatsapp, 
   clipboard: HiClipboard,
   'dollar-sign': AiOutlineDollar
};
