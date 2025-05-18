
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, CreditCard, Shield, Zap, ChevronRight } from "lucide-react";
import { LoginForm } from "@/components/ui/LoginForm";
import { useAuth } from "@/lib/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bank-blue to-bank-teal pt-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Banking Reimagined For The Digital Age
              </h1>
              <p className="text-xl text-white/80">
                Experience seamless, secure, and smart banking with Bank of Trust. 
                Your finances, simplified.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 md:hidden">
                <Button
                  className="bg-white text-bank-blue hover:bg-white/90"
                  size="lg"
                  onClick={() => document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <LoginForm />
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="relative h-20">
          <svg className="absolute bottom-0 w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need in a modern banking experience, 
              designed for simplicity and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-bank-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-bank-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Security</h3>
              <p className="text-gray-600">
                Multi-layered encryption and biometric authentication to keep your finances secure.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-bank-success/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-bank-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Transfers</h3>
              <p className="text-gray-600">
                Send money to anyone, anywhere in the world with real-time processing.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-bank-blue/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-bank-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Cards</h3>
              <p className="text-gray-600">
                Virtual and physical cards with dynamic limits and instant notifications.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard" className="flex items-center">
                Explore All Features <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mobile Login Section */}
      <section id="login-section" className="py-16 bg-white md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Join Bank of Trust</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create an account or login to access your banking dashboard.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-bank-blue to-bank-teal py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Banking Smarter?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of customers who trust us with their financial journey.
              Get started in minutes.
            </p>
            <Button
              className="bg-white text-bank-blue hover:bg-white/90"
              size="lg"
              onClick={() => document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Open Your Account Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
