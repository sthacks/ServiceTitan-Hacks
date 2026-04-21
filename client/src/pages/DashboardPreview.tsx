import dashboardImage from "@assets/Untitled_design_(50)_1776779554535.png";

export default function DashboardPreview() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <img
        src={dashboardImage}
        alt="Technician Performance Dashboard"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
