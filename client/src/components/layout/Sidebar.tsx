
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowLeftRight,
  CreditCard,
  PieChart,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  
  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transfer",
      href: "/transfer",
      icon: ArrowLeftRight,
    },
    {
      name: "Cards",
      href: "/cards",
      icon: CreditCard,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: PieChart,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  return (
    <div className={cn("pb-12 w-full min-h-screen bg-muted/30 flex flex-col justify-between", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-semibold">
            <span className="gradient-text">Bank of Trust</span>
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:text-bank-accent hover:bg-muted",
                  location.pathname === item.href
                    ? "bg-muted text-bank-accent font-medium"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
                {item.name === "Transfer" && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-bank-accent text-[10px] text-white">
                    2
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 pb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          asChild
        >
          <Link to="/">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
