import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      toast.success("Subscribed successfully!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-green-400 text-2xl" />
              <h3 className="text-xl font-bold">KisanBazar</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting local farmers with consumers for fresh, sustainable
              produce.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Products", "Farmers", "About Us"].map((text, i) => (
                <li key={i}>
                  <Link
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 hover:text-green-400 transition"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-400 mt-1" />
                <span>Lahore, Punjab Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-400" />
                <span>03241441444</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" />
                <span>info@freshharvestconnect.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe for updates on fresh produce and local farmers.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} KisanBazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
