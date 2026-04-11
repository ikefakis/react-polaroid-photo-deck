import { createRoot } from "react-dom/client";
import { Deck } from "../src";
import "./demo.css";

const photos = [
  {
    url: "https://picsum.photos/id/1036/800/1100",
    date: "15/01/2025",
    caption: "Quiet morning mist",
  },
  {
    url: "https://picsum.photos/id/1011/1200/800",
    date: "22/07/2024",
    caption: "Drifting in silence",
  },
  {
    url: "https://picsum.photos/id/1003/820/1180",
    date: "05/05/2024",
    caption: "Stumbled upon magic",
  },
  {
    url: "https://picsum.photos/id/1039/1280/860",
    date: "11/10/2024",
    caption: "Nature’s secret spot",
  },
  {
    url: "https://picsum.photos/id/1062/840/1200",
    date: "30/08/2024",
    caption: "Racing the wind",
  },
];

const rootElement = document.getElementById("photo-deck");

if (!rootElement) {
  throw new Error("Photo deck root element not found");
}

createRoot(rootElement).render(<Deck cards={photos} />);
