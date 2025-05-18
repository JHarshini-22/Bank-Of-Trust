
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bank-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Bank of Trust</h2>
            <p className="text-gray-300">
              Redefining banking for the modern world with security, transparency, and innovation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link to="/transfer" className="text-gray-300 hover:text-white">Transfer</Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-300 hover:text-white">Settings</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Online Banking</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Mobile Banking</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Investments</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Loans</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">support@bankoftrust.com</li>
              <li className="text-gray-300">+1 (123) 456-7890</li>
              <li className="text-gray-300">123 Banking Street, Financial District</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">&copy; 2025 Bank of Trust. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-300 hover:text-white">Privacy Policy</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Terms of Service</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
