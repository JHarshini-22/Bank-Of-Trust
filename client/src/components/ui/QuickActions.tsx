
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Plus, CreditCard, PiggyBank, ChartBar } from "lucide-react";
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const actions = [
    {
      name: 'Transfer',
      icon: <ArrowLeftRight className="h-5 w-5" />,
      link: '/transfer',
      bgColor: 'bg-bank-accent',
    },
    {
      name: 'Deposit',
      icon: <Plus className="h-5 w-5" />,
      link: '/deposit',
      bgColor: 'bg-bank-success',
    },
    {
      name: 'Cards',
      icon: <CreditCard className="h-5 w-5" />,
      link: '/cards',
      bgColor: 'bg-bank-teal',
    },
    {
      name: 'Savings',
      icon: <PiggyBank className="h-5 w-5" />,
      link: '/savings',
      bgColor: 'bg-bank-warning',
    },
    {
      name: 'Analytics',
      icon: <ChartBar className="h-5 w-5" />,
      link: '/analytics',
      bgColor: 'bg-bank-blue',
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {actions.map((action) => (
        <Link key={action.name} to={action.link} className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-14 w-14 rounded-xl ${action.bgColor} text-white hover:scale-110 transition-all duration-200 hover:shadow-md active:scale-95`}
          >
            {action.icon}
          </Button>
          <span className="mt-2 text-xs font-medium">{action.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
