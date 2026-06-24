import { Badge3D } from "@/components/Badge3D";

export default function BadgeDemoPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Badge3D
        size={95}
        speed={0.002}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}
