import { Badge3D } from "@/components/Badge3D";

export default function BadgeDemoPage() {
  return (
    <Badge3D
      size={95}
      speed={0.002}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#1a1a1a",
      }}
    />
  );
}
