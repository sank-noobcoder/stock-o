
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, BarChart2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-finance-500" />
                <TrendingUp className="h-6 w-6 text-finance-600 -ml-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-finance-400 to-finance-600 bg-clip-text text-transparent">
                StockOracle
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Home
              </Link>
              <Link
                to="/brokerage"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/brokerage'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Stock Brokerage
              </Link>
              <Link
                to="/prediction"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/prediction'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Future Prediction
              </Link>
              <Link
                to="/learning"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/learning'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Learning
              </Link>
              <ThemeToggle />
              <div className="ml-4 flex items-center">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline">{user?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="mr-2">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button>Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Home
              </Link>
              <Link
                to="/brokerage"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/brokerage'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Stock Brokerage
              </Link>
              <Link
                to="/prediction"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/prediction'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Future Prediction
              </Link>
              <Link
                to="/learning"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/learning'
                    ? 'text-white bg-finance-600'
                    : 'text-foreground hover:bg-finance-500/10'
                }`}
              >
                Learning
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Button className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
