
import React from 'react';
import { Card } from "@/components/ui/card";
import { Account } from "@/lib/mockData";
import { CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: account.currency,
  }).format(account.balance);

  const getGradientClass = () => {
    switch (account.accountType) {
      case 'Checking':
        return 'from-blue-700 to-cyan-400';
      case 'Savings':
        return 'from-emerald-700 to-teal-400';
      case 'Investment':
        return 'from-violet-700 to-purple-400';
      default:
        return 'from-blue-700 to-cyan-400';
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${getGradientClass()} text-white rounded-2xl overflow-hidden`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium opacity-80">{account.accountType} Account</p>
            <h3 className="text-2xl font-bold mt-1">{formattedBalance}</h3>
            <p className="mt-4 text-sm opacity-80">{account.accountNumber}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Button variant="ghost" className="text-sm text-white bg-white/10 hover:bg-white/20">
            View Details
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;
