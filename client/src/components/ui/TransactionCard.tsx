
import React from 'react';
import { Transaction } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const date = new Date(transaction.date);
  const formattedDate = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(transaction.amount));

  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5 text-green-600" />
          </div>
        );
      case 'withdrawal':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-red-600" />
          </div>
        );
      case 'transfer':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
          </div>
        );
      default:
        return null;
    }
  };

  const getAmountColor = () => {
    return transaction.amount >= 0 ? 'text-bank-success' : 'text-bank-error';
  };

  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Failed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-4">
        {getTransactionIcon()}
        <div>
          <h4 className="font-medium">{transaction.description}</h4>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className={`font-semibold ${getAmountColor()}`}>
          {transaction.amount >= 0 ? '+' : '-'} {formattedAmount}
        </span>
        <span className="text-sm text-muted-foreground">{transaction.category}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
