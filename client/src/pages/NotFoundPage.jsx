import { Link } from "react-router-dom";
import { FaLeaf, FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <FaLeaf className="text-green-500 text-6xl mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for seems to have been harvested already.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        <FaHome />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
