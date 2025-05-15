import { Link } from "react-router-dom";
import { placeholder } from "../assets";

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholder;
  };

  return (
    <div className="card transition-transform duration-300">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div>
            <img
              src={placeholder}
              alt="placeholder"
              className="w-full h-56 object-cover"
            />
          </div>
        )}
        {product.isOrganic && (
          <span className="absolute top-2 right-2 badge badge-green">
            Organic
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">
          {product.category?.name || "General"}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">
            ₨{product.price.toFixed(2)} / {product.unit}
          </span>
          <Link
            to={`/products/${product._id}`}
            className="text-sm text-green-500 hover:text-green-700 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
