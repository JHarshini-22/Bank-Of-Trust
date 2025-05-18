
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isLoggedIn = !!user;
  
  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];
  
  const appLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Transfer', href: '/transfer' },
    { name: 'Settings', href: '/settings' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = isLoggedIn ? appLinks : mainLinks;

  return (
    <nav className={`w-full ${isLoggedIn ? 'bg-white/80 backdrop-blur-md border-b' : 'bg-transparent'} 
      fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className={`text-2xl font-bold ${isLoggedIn ? 'gradient-text' : 'text-white'}`}>
                Bank of Trust
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`${isLoggedIn 
                    ? 'text-gray-700 hover:text-bank-blue' 
                    : 'text-white/90 hover:text-white'} 
                    px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted/50`}
                >
                  {link.name}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="relative hover:bg-muted/50">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-bank-accent ring-2 ring-white"></span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted/50">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.profileImage} alt={user?.name} />
                          <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer text-destructive hover:bg-destructive/10"
                        onClick={async () => {
                          const success = await logout();
                          if (success) {
                            toast({
                              title: "Logged out",
                              description: "You have been logged out successfully.",
                            });
                          }
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button asChild variant="ghost" className="text-white border border-white/50 hover:bg-white hover:text-bank-blue">
                    <Link to="/">Log in</Link>
                  </Button>
                  <Button asChild className="bg-bank-accent hover:bg-bank-accent/80">
                    <Link to="/">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              className={`${isLoggedIn ? 'text-gray-700' : 'text-white'} p-2`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-bank-blue shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <Button 
                variant="destructive" 
                className="w-full mt-4"
                onClick={async () => {
                  setIsMenuOpen(false);
                  const success = await logout();
                  if (success) {
                    toast({
                      title: "Logged out",
                      description: "You have been logged out successfully.",
                    });
                  }
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                </Button>
                <Button asChild className="w-full mt-2 bg-bank-accent hover:bg-bank-accent/80">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
