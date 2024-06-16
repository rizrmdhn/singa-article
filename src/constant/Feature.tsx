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
      "Transcribe ASL into text and vice versa with our cutting-edge technology. Our app provides accurate, real-time transcription of sign language into written text, making it easier for deaf and hearing individuals to understand each other. Perfect for educational purposes, work, and everyday conversations, our app supports smooth, clear, and effective communication.",
    image: "/mockup1.png",
    icon: <Film className="h-10 w-10 stroke-white md:h-14 md:w-14" />,
  },
  {
    id: "message",
    title: "Message Conversation",
    description:
      "Enjoy seamless text messaging with our ASL app. Our advanced features include video snippets of signs for better understanding, making texting more accessible for the deaf community. Keep your conversations private, secure, and intuitive, with options to save and revisit important messages. Our app ensures you never miss out on any vital communication.",
    image: "/mockup2.png",
    icon: <MessagesSquare className="h-10 w-10 stroke-white md:h-14 md:w-14" />,
  },
  {
    id: "realtime",
    title: "Realtime Communication",
    description:
      "Our ASL app facilitates real-time communication through video calls, enabling seamless conversations between deaf and hearing individuals. Experience crystal-clear video quality and intuitive controls, making communication effortless. Whether it's a quick chat or an important discussion, our app bridges the communication gap, ensuring everyone stays connected.",
    image: "/mockup3.png",
    icon: <Camera className="h-10 w-10 stroke-white md:h-14 md:w-14" />,
  },
];
