
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { currentUser } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Settings | Bank of Trust</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <div className="hidden md:block w-64 pt-16">
            <Sidebar />
          </div>
          <main className="flex-1 pt-16 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
            <div className="py-6">
              <h1 className="text-2xl font-semibold mb-2">Account Settings</h1>
              <p className="text-muted-foreground mb-6">Manage your profile and preferences</p>
              
              <div className="max-w-4xl">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account details and personal information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex flex-col items-center sm:items-start mb-6">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src={currentUser.profileImage} alt={currentUser.name} />
                                <AvatarFallback>{currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <Button variant="outline" size="sm" className="mt-4">
                                Change Photo
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" defaultValue={currentUser.name} />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue={currentUser.email} type="email" />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" defaultValue="+1 (555) 123-4567" type="tel" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="123 Main Street" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" defaultValue="New York" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" defaultValue="NY" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input id="zipCode" defaultValue="10001" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="ml-auto bg-bank-accent hover:bg-bank-accent/90" onClick={handleSave}>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security and authentication methods</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Password</h3>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword">Current Password</Label>
                              <Input id="currentPassword" type="password" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">New Password</Label>
                              <Input id="newPassword" type="password" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <Input id="confirmPassword" type="password" />
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Enable 2FA</p>
                              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t">
                          <h3 className="text-lg font-medium">Login Sessions</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-muted-foreground">MacBook Pro • New York, USA • Active now</p>
                              </div>
                              <div className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                <span className="text-sm text-muted-foreground">Current</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-medium">iPhone 13</p>
                                <p className="text-sm text-muted-foreground">iOS • New York, USA • 2 hours ago</p>
                              </div>
                              <Button variant="outline" size="sm">Logout</Button>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-bank-error">Logout of All Devices</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Control how you receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Email Notifications</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Account Activity</p>
                                  <p className="text-sm text-muted-foreground">Receive emails for logins, password changes, etc.</p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Transaction Updates</p>
                                  <p className="text-sm text-muted-foreground">Get notified about deposits, withdrawals, and transfers</p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Marketing & Promotions</p>
                                  <p className="text-sm text-muted-foreground">Stay updated on new services and special offers</p>
                                </div>
                                <Switch />
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4 pt-6 border-t">
                            <h3 className="text-lg font-medium">Push Notifications</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Transaction Alerts</p>
                                  <p className="text-sm text-muted-foreground">Real-time notifications for all transactions</p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Security Alerts</p>
                                  <p className="text-sm text-muted-foreground">Notifications about security-related events</p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Balance Updates</p>
                                  <p className="text-sm text-muted-foreground">Get notified about significant balance changes</p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="ml-auto bg-bank-accent hover:bg-bank-accent/90" onClick={handleSave}>Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Settings;
