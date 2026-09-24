import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  User,
  Users,
  Dumbbell,
  ClipboardCheck,
  BarChart3,
  Settings,
  Shield,
  Store,
  Tags,
  type LucideIcon,
} from "lucide-react";

export type RoleKey = "guest" | "customer" | "trainer" | "staff" | "manager" | "admin";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  description?: string;
};

export type RoleArea = {
  key: RoleKey;
  name: string;
  tagline: string;
  home: string;
  items: NavItem[];
};

export const roleAreas: RoleArea[] = [
  {
    key: "guest",
    name: "Guest",
    tagline: "Public marketing site",
    home: "/guest",
    items: [
      { label: "Home", to: "/guest", icon: Store, description: "Landing page" },
      { label: "Pricing", to: "/guest/pricing", icon: Tags, description: "Membership plans" },
      { label: "Classes", to: "/guest/classes", icon: CalendarDays, description: "Public schedule" },
    ],
  },
  {
    key: "customer",
    name: "Customer",
    tagline: "Member self-service area",
    home: "/customer",
    items: [
      { label: "Dashboard", to: "/customer", icon: LayoutDashboard },
      { label: "Classes", to: "/customer/classes", icon: CalendarDays },
      { label: "Membership", to: "/customer/membership", icon: CreditCard },
      { label: "Profile", to: "/customer/profile", icon: User },
    ],
  },
  {
    key: "trainer",
    name: "Trainer",
    tagline: "Coaching workspace",
    home: "/trainer",
    items: [
      { label: "Dashboard", to: "/trainer", icon: LayoutDashboard },
      { label: "Schedule", to: "/trainer/schedule", icon: CalendarDays },
      { label: "Clients", to: "/trainer/clients", icon: Users },
      { label: "Programs", to: "/trainer/programs", icon: Dumbbell },
    ],
  },
  {
    key: "staff",
    name: "Staff",
    tagline: "Front-desk operations",
    home: "/staff",
    items: [
      { label: "Dashboard", to: "/staff", icon: LayoutDashboard },
      { label: "Check-in", to: "/staff/check-in", icon: ClipboardCheck },
      { label: "Members", to: "/staff/members", icon: Users },
      { label: "Classes", to: "/staff/classes", icon: CalendarDays },
    ],
  },
  {
    key: "manager",
    name: "Manager",
    tagline: "Branch management",
    home: "/manager",
    items: [
      { label: "Dashboard", to: "/manager", icon: LayoutDashboard },
      { label: "Staff", to: "/manager/staff", icon: Users },
      { label: "Reports", to: "/manager/reports", icon: BarChart3 },
      { label: "Memberships", to: "/manager/memberships", icon: CreditCard },
    ],
  },
  {
    key: "admin",
    name: "Admin",
    tagline: "System administration",
    home: "/admin",
    items: [
      { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
      { label: "Users", to: "/admin/users", icon: Users },
      { label: "Branches", to: "/admin/branches", icon: Store },
      { label: "Roles", to: "/admin/roles", icon: Shield },
      { label: "Settings", to: "/admin/settings", icon: Settings },
    ],
  },
];

export function getRoleArea(key: RoleKey): RoleArea {
  return roleAreas.find((area) => area.key === key)!;
}
