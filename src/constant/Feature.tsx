import { Camera, Film, MessagesSquare } from "lucide-react";

export interface IFeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: JSX.Element;
}

export const FeatureItem: Array<IFeatureItem> = [
  {
    id: "transcript",
    title: "Language Transcript",
    description:
      "Eager to learn sign language or require in-depth translations for study or personal use? Simply upload your video, and our servers will take care of everything, converting the content into accurate and detailed translations into the app.",
    image: "/images/mockup1.png",
    icon: <Film className="h-10 w-10 stroke-white md:h-14 md:w-14" />,
  },
  {
    id: "message",
    title: "Message Conversation",
    description:
      "Looking to engage in daily conversations or expand your social circle? Our conversational mode enables seamless, bidirectional communication, making interactions smooth and intuitive for hearing and non-hearing users alike.",
    image: "/images/mockup2.png",
    icon: <MessagesSquare className="h-10 w-10 stroke-white md:h-14 md:w-14" />,
  },
  {
    id: "realtime",
    title: "Realtime Communication",
    description:
      "Don't let language barriers hinder your participation at live events. With our real-time translation feature, you can attend conferences, lectures, and presentations without any worries. Instantly see sign language translated into text, ensuring you don't miss a single moment.",
    image: "/images/mockup3.png",
    icon: <Camera className="h-10 w-10 stroke-white md:h-14 md:w-14" />,
  },
];
