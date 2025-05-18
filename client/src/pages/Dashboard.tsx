
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import AccountCard from "@/components/ui/AccountCard";
import TransactionCard from "@/components/ui/TransactionCard";
import QuickActions from "@/components/ui/QuickActions";
import { accounts, transactions, currentUser } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
];

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Bank of Trust</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <div className="hidden md:block w-64 pt-16">
            <Sidebar />
          </div>
          <main className="flex-1 pt-16 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
            <div className="py-6">
              <h1 className="text-2xl font-semibold mb-2">Welcome back, {currentUser.name}</h1>
              <p className="text-muted-foreground mb-6">Here's an overview of your accounts</p>
              
              {/* Account Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
              
              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <Card>
                  <CardContent className="py-6">
                    <QuickActions />
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Financial Overview */}
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Financial Overview</CardTitle>
                    <CardDescription>Your spending pattern over the last 7 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#7B61FF" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Transactions */}
                <Card className="col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Your latest financial activities</CardDescription>
                    </div>
                    <a href="/transactions" className="text-sm text-bank-accent hover:underline">View All</a>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto">
                      {transactions.slice(0, 5).map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
