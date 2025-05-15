"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFarmers } from "../redux/slices/farmerSlice";
import FarmerCard from "../components/FarmerCard";
import Loader from "../components/Loader";
import { FaSearch, FaLeaf } from "react-icons/fa";

const FarmersPage = () => {
  const dispatch = useDispatch();
  const { farmers, loading } = useSelector((state) => state.farmers);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);

  useEffect(() => {
    dispatch(getAllFarmers());
  }, [dispatch]);

  useEffect(() => {
    if (farmers) {
      setFilteredFarmers(
        farmers.filter((farmer) =>
          farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [farmers, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Farmers</h1>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search farmers..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      {filteredFarmers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <FarmerCard key={farmer._id} farmer={farmer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaLeaf className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Farmers Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FarmersPage;
