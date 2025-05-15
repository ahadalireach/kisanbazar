"use client";

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFarmerProfile,
  clearFarmerProfile,
} from "../redux/slices/farmerSlice";
import { getProducts } from "../redux/slices/productSlice";
import { sendMessage } from "../redux/slices/messageSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import {
  FaLeaf,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaArrowLeft,
  FaComment,
} from "react-icons/fa";

const FarmerDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState("");

  const { farmerProfile, loading } = useSelector((state) => state.farmers);
  const { products, loading: productsLoading } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFarmerProfile(id));
    dispatch(getProducts({ farmer: id }));

    return () => {
      dispatch(clearFarmerProfile());
    };
  }, [dispatch, id]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!message.trim()) {
      return;
    }

    dispatch(
      sendMessage({
        receiver: id,
        content: message,
      })
    );

    setMessage("");
    setShowMessageForm(false);
  };

  if (loading || productsLoading) {
    return <Loader />;
  }

  if (!farmerProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">Farmer not found</span>
        </div>
        <Link
          to="/farmers"
          className="mt-4 inline-block text-green-500 hover:text-green-700"
        >
          Back to Farmers
        </Link>
      </div>
    );
  }

  const { farmer, profile } = farmerProfile;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/farmers"
        className="flex items-center text-green-500 hover:text-green-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Farmers
      </Link>

      <div className="glass p-6 rounded-xl mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
              <FaLeaf className="text-green-500 text-4xl" />
            </div>
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-2">
              {profile?.farmName || farmer.name}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-4">
              {farmer.address && (
                <div className="flex items-center mr-6 mb-2">
                  <FaMapMarkerAlt className="text-green-500 mr-2" />
                  <span>
                    {farmer.address.city}, {farmer.address.state}
                  </span>
                </div>
              )}
              {farmer.phone && (
                <div className="flex items-center mr-6 mb-2">
                  <FaPhone className="text-green-500 mr-2" />
                  <span>{farmer.phone}</span>
                </div>
              )}
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-green-500 mr-2" />
                <span>{farmer.email}</span>
              </div>
            </div>

            {profile?.description && (
              <p className="text-gray-700 mb-4">{profile.description}</p>
            )}

            {profile?.establishedYear && (
              <div className="flex items-center text-gray-600 mb-4">
                <FaCalendarAlt className="text-green-500 mr-2" />
                <span>Established in {profile.establishedYear}</span>
              </div>
            )}

            {profile?.socialMedia && (
              <div className="flex space-x-4 mb-4">
                {profile.socialMedia.facebook && (
                  <a
                    href={profile.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                )}
                {profile.socialMedia.instagram && (
                  <a
                    href={profile.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                )}
                {profile.socialMedia.twitter && (
                  <a
                    href={profile.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                )}
              </div>
            )}

            {isAuthenticated && user?.role !== "farmer" && (
              <div>
                {showMessageForm ? (
                  <form onSubmit={handleSendMessage} className="mt-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-input mb-2"
                      placeholder="Write your message here..."
                      rows="3"
                      required
                    ></textarea>
                    <div className="flex space-x-2">
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMessageForm(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowMessageForm(true)}
                    className="flex items-center space-x-2 text-green-500 hover:text-green-700"
                  >
                    <FaComment />
                    <span>Message Farmer</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {profile.farmingPractices && profile.farmingPractices.length > 0 && (
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Farming Practices</h2>
              <ul className="space-y-2">
                {profile.farmingPractices.map((practice, index) => (
                  <li key={index} className="flex items-start">
                    <FaLeaf className="text-green-500 mt-1 mr-2" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile.businessHours && (
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              <div className="space-y-2">
                {Object.entries(profile.businessHours).map(
                  ([day, hours]) =>
                    hours.open &&
                    hours.close && (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}:</span>
                        <span>
                          {hours.open} - {hours.close}
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Available Products</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 glass rounded-xl">
            <FaLeaf className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              This farmer doesn't have any products listed at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDetailPage;
