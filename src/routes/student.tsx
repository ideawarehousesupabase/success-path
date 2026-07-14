import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { LayoutDashboard, ClipboardCheck, MapPin, MessageCircle, Users, Heart, User } from "lucide-react";

export const Route = createFileRoute("/student")({ component: StudentLayout });

const NAV = [
  { to: "/student", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { to: "/student/readiness", label: "Readiness", icon: <ClipboardCheck size={16} /> },
  { to: "/student/journey", label: "Journey Map", icon: <MapPin size={16} /> },
  { to: "/student/companion", label: "AI Companion", icon: <MessageCircle size={16} /> },
  { to: "/student/community", label: "Community", icon: <Users size={16} /> },
  { to: "/student/wellbeing", label: "Wellbeing", icon: <Heart size={16} /> },
  { to: "/student/profile", label: "Profile", icon: <User size={16} /> },
];

function StudentLayout() {
  return (
    <AppShell role="student" nav={NAV}>
      <Outlet />
    </AppShell>
  );
}
