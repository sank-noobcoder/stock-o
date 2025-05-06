
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-finance-400 to-finance-600 bg-clip-text text-transparent">
              StockOracle
            </h3>
            <p className="text-muted-foreground">
              Your cutting-edge platform for stock market insights, predictions, and trading.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-finance-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-finance-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-finance-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-finance-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-finance-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/brokerage" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Stock Brokerage
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Future Prediction
                </Link>
              </li>
              <li>
                <Link to="/learning" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Learning
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-finance-600 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} StockOracle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
