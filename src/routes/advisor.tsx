import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { LayoutDashboard, Users, AlertTriangle, ClipboardList, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/advisor")({ component: AdvisorLayout });

const NAV = [
  { to: "/advisor", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { to: "/advisor/students", label: "Students", icon: <Users size={16} /> },
  { to: "/advisor/risk", label: "Risk Insights", icon: <AlertTriangle size={16} /> },
  { to: "/advisor/interventions", label: "Interventions", icon: <ClipboardList size={16} /> },
  { to: "/advisor/reports", label: "Reports", icon: <BarChart3 size={16} /> },
];

function AdvisorLayout() {
  return <AppShell role="advisor" nav={NAV}><Outlet /></AppShell>;
}
