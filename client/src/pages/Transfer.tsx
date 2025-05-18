
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { accounts, recentContacts } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, ArrowRight, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Transfer = () => {
  const [step, setStep] = useState(1);
  const [transferType, setTransferType] = useState('own');
  const [recipient, setRecipient] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  const handleContinue = () => {
    if (step === 1) {
      if (!fromAccount) {
        toast({
          title: "Please select an account",
          description: "Select an account to transfer from",
          variant: "destructive",
        });
        return;
      }
      if (transferType === 'someone' && !recipient) {
        toast({
          title: "Please select a recipient",
          description: "Select a recipient for your transfer",
          variant: "destructive",
        });
        return;
      }
      if (transferType === 'own' && !toAccount) {
        toast({
          title: "Please select a destination account",
          description: "Select an account to transfer to",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid amount",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Handle transfer submission
      toast({
        title: "Transfer Successful!",
        description: `$${amount} has been sent successfully.`,
        variant: "default",
      });
      
      // Reset form
      setStep(1);
      setTransferType('own');
      setRecipient('');
      setFromAccount('');
      setToAccount('');
      setAmount('');
      setNote('');
    }
  };
  
  const filteredContacts = recentContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedAccount = accounts.find(account => account.id === fromAccount);
  const selectedDestinationAccount = accounts.find(account => account.id === toAccount);
  const selectedContact = recentContacts.find(contact => contact.id === recipient);

  return (
    <>
      <Helmet>
        <title>Transfer Money | Bank of Trust</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <div className="hidden md:block w-64 pt-16">
            <Sidebar />
          </div>
          <main className="flex-1 pt-16 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
            <div className="py-6">
              <h1 className="text-2xl font-semibold mb-2">Transfer Money</h1>
              <p className="text-muted-foreground mb-6">Send money to your accounts or others securely</p>
              
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-bank-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                      1
                    </span>
                    <span className="hidden sm:inline text-sm">Details</span>
                  </div>
                  <div className="w-full max-w-[80px] h-1 mx-2 bg-gray-200">
                    <div className={`h-full ${step >= 2 ? 'bg-bank-accent' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-bank-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                      2
                    </span>
                    <span className="hidden sm:inline text-sm">Amount</span>
                  </div>
                  <div className="w-full max-w-[80px] h-1 mx-2 bg-gray-200">
                    <div className={`h-full ${step >= 3 ? 'bg-bank-accent' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-bank-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                      3
                    </span>
                    <span className="hidden sm:inline text-sm">Review</span>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {step === 1 && "Transfer Details"}
                      {step === 2 && "Transfer Amount"}
                      {step === 3 && "Review Transfer"}
                    </CardTitle>
                    <CardDescription>
                      {step === 1 && "Select accounts and recipient"}
                      {step === 2 && "Enter amount and description"}
                      {step === 3 && "Confirm your transfer details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>From Account</Label>
                          <Select value={fromAccount} onValueChange={setFromAccount}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.accountType} - {new Intl.NumberFormat('en-US', { style: 'currency', currency: account.currency }).format(account.balance)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Transfer Type</Label>
                          <RadioGroup 
                            value={transferType} 
                            onValueChange={setTransferType}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div>
                              <RadioGroupItem 
                                value="own" 
                                id="own" 
                                className="peer sr-only" 
                              />
                              <Label 
                                htmlFor="own" 
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-bank-accent [&:has([data-state=checked])]:border-bank-accent"
                              >
                                <span>Between my accounts</span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem 
                                value="someone" 
                                id="someone" 
                                className="peer sr-only" 
                              />
                              <Label 
                                htmlFor="someone" 
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-bank-accent [&:has([data-state=checked])]:border-bank-accent"
                              >
                                <span>To someone else</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {transferType === 'own' ? (
                          <div className="space-y-2">
                            <Label>To Account</Label>
                            <Select value={toAccount} onValueChange={setToAccount}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select destination account" />
                              </SelectTrigger>
                              <SelectContent>
                                {accounts
                                  .filter(account => account.id !== fromAccount)
                                  .map((account) => (
                                    <SelectItem key={account.id} value={account.id}>
                                      {account.accountType} - {new Intl.NumberFormat('en-US', { style: 'currency', currency: account.currency }).format(account.balance)}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Find Contact</Label>
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Search by name or email"
                                  className="pl-8"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Select Recipient</Label>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                {filteredContacts.map((contact) => (
                                  <div 
                                    key={contact.id}
                                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer hover:bg-muted/50 ${recipient === contact.id ? 'border-bank-accent bg-muted/50' : 'border-border'}`}
                                    onClick={() => setRecipient(contact.id)}
                                  >
                                    <Avatar className="h-10 w-10 mr-3">
                                      <AvatarImage src={contact.image} alt={contact.name} />
                                      <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium text-sm">{contact.name}</p>
                                      <p className="text-xs text-muted-foreground">{contact.email}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input 
                              id="amount" 
                              placeholder="0.00" 
                              className="pl-8" 
                              type="text"
                              inputMode="decimal"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="note">Note (optional)</Label>
                          <Input 
                            id="note" 
                            placeholder="Add a note" 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </div>
                        
                        {selectedAccount && (
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Available Balance</p>
                            <p className="text-xl font-semibold">
                              {new Intl.NumberFormat('en-US', { 
                                style: 'currency', 
                                currency: selectedAccount.currency 
                              }).format(selectedAccount.balance)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="flex flex-col space-y-4">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">From</span>
                            <span className="font-medium">{selectedAccount?.accountType} Account</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">To</span>
                            {transferType === 'own' ? (
                              <span className="font-medium">{selectedDestinationAccount?.accountType} Account</span>
                            ) : (
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={selectedContact?.image} alt={selectedContact?.name} />
                                  <AvatarFallback>{selectedContact?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{selectedContact?.name}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Amount</span>
                            <span className="font-medium text-xl">${Number(amount).toFixed(2)}</span>
                          </div>
                          
                          {note && (
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Note</span>
                              <span>{note}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Date</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Fee</span>
                            <span className="font-medium text-green-600">$0.00</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-muted/50 rounded-lg flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-xl font-semibold">${Number(amount).toFixed(2)}</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-bank-accent" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => step > 1 ? setStep(step - 1) : null}
                      disabled={step === 1}
                    >
                      Back
                    </Button>
                    <Button 
                      className="bg-bank-accent hover:bg-bank-accent/90"
                      onClick={handleContinue}
                    >
                      {step < 3 ? 'Continue' : 'Confirm Transfer'} 
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Transfer;
