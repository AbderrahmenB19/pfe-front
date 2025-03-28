import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Power } from 'react-bootstrap-icons';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Enhanced Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/admin" className="d-flex align-items-center">
            <img
              src="/val.png" // Replace with your logo path
              alt="Company Logo"
              width="auto"
              height="40"
              className="d-inline-block align-top me-2"
            />
            <span className="brand-text">Admin Dashboard</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="admin-navbar" />
          
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/admin" 
                className="nav-link-custom"
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/admin/form-builder" 
                className="nav-link-custom"
              >
                Form Builder
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/admin/process-definition" 
                className="nav-link-custom"
              >
                Process Definition
              </Nav.Link>
            </Nav>
            
            <Button 
              variant="outline-light" 
              onClick={handleLogout}
              className="logout-btn"
            >
              <Power className="me-1" /> Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="flex-grow-1 py-4">
        <Outlet />
      </Container>

      {/* Enhanced Footer */}
      <footer className="footer-custom py-3 mt-auto">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <img
              src="/val.png" // Replace with your logo path
              alt="Company Logo"
              width="auto"
              height="30"
              className="me-2"
            />
            <span>© 2025 Admin Dashboard</span>
          </div>
          
          <div className="d-flex">
            <Link to="/privacy" className="text-white me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-white">Terms of Service</Link>
          </div>
        </Container>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        .navbar-custom {
          background-color: #16176F;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .brand-text {
          font-weight: 600;
          font-size: 1.25rem;
          color: white;
        }
        
        .nav-link-custom {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          padding: 0.5rem 1rem;
          margin: 0 0.25rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .nav-link-custom:hover, 
        .nav-link-custom:focus,
        .nav-link-custom.active {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.1);
          text-decoration: none;
        }
        
        .logout-btn {
          border-radius: 4px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .footer-custom {
          background-color: #16176F;
          color: white;
        }
        
        @media (max-width: 991.98px) {
          .navbar-collapse {
            padding-top: 1rem;
          }
          
          .logout-btn {
            margin-top: 1rem;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;