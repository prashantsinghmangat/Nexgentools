import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 glass-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NexgenTools</h3>
            <p className="text-sm text-gray-600">
              A collection of useful tools for developers and everyday users.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-600">
              Have questions? Reach out to us at support@nexgentools.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} NexgenTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};