import desktopAnimation from "@/lottie/desktop.json";
import tabletAnimation from "@/lottie/tablet.json";
import mobVerAnimation from "@/lottie/mobile-vertical.json";
import mobHorAnimation from "@/lottie/mobile-horizontal.json";

export const cards = [
  {
    animationData: desktopAnimation,
    text: "Desktop",
    additionalText: "1920",
  },
  {
    animationData: tabletAnimation,
    text: "Tablet",
    additionalText: "768",
  },
  {
    animationData: mobHorAnimation,
    text: "Phone horizontal",
    additionalText: "812",
  },
  {
    animationData: mobVerAnimation,
    text: "Phone vertical",
    additionalText: "375",
  },
];
