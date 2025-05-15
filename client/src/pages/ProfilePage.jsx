"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/slices/authSlice";
import { updateFarmerProfile } from "../redux/slices/farmerSlice";
import Loader from "../components/Loader";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLeaf,
  FaCheck,
} from "react-icons/fa";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const {
    myFarmerProfile,
    loading: farmerLoading,
    success: farmerSuccess,
  } = useSelector((state) => state.farmers);

  const [userForm, setUserForm] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const [farmerForm, setFarmerForm] = useState({
    farmName: "",
    description: "",
    farmingPractices: [],
    establishedYear: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    businessHours: {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
    acceptsPickup: false,
    acceptsDelivery: false,
    deliveryRadius: 0,
  });

  const [farmingPractice, setFarmingPractice] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (user) {
      setUserForm({
        name: user.name || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "farmer" && myFarmerProfile) {
      setFarmerForm({
        farmName: myFarmerProfile.farmName || "",
        description: myFarmerProfile.description || "",
        farmingPractices: myFarmerProfile.farmingPractices || [],
        establishedYear: myFarmerProfile.establishedYear || "",
        socialMedia: {
          facebook: myFarmerProfile.socialMedia?.facebook || "",
          instagram: myFarmerProfile.socialMedia?.instagram || "",
          twitter: myFarmerProfile.socialMedia?.twitter || "",
        },
        businessHours: {
          monday: myFarmerProfile.businessHours?.monday || {
            open: "",
            close: "",
          },
          tuesday: myFarmerProfile.businessHours?.tuesday || {
            open: "",
            close: "",
          },
          wednesday: myFarmerProfile.businessHours?.wednesday || {
            open: "",
            close: "",
          },
          thursday: myFarmerProfile.businessHours?.thursday || {
            open: "",
            close: "",
          },
          friday: myFarmerProfile.businessHours?.friday || {
            open: "",
            close: "",
          },
          saturday: myFarmerProfile.businessHours?.saturday || {
            open: "",
            close: "",
          },
          sunday: myFarmerProfile.businessHours?.sunday || {
            open: "",
            close: "",
          },
        },
        acceptsPickup: myFarmerProfile.acceptsPickup || false,
        acceptsDelivery: myFarmerProfile.acceptsDelivery || false,
        deliveryRadius: myFarmerProfile.deliveryRadius || 0,
      });
    }
  }, [user, myFarmerProfile]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUserForm({
        ...userForm,
        [parent]: {
          ...userForm[parent],
          [child]: value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
    }
  };

  const handleFarmerChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFarmerForm({
        ...farmerForm,
        [name]: checked,
      });
      return;
    }

    if (name.includes(".")) {
      const [parent, child, grandchild] = name.split(".");

      if (grandchild) {
        setFarmerForm({
          ...farmerForm,
          [parent]: {
            ...farmerForm[parent],
            [child]: {
              ...farmerForm[parent][child],
              [grandchild]: value,
            },
          },
        });
      } else {
        setFarmerForm({
          ...farmerForm,
          [parent]: {
            ...farmerForm[parent],
            [child]: value,
          },
        });
      }
    } else {
      setFarmerForm({
        ...farmerForm,
        [name]: value,
      });
    }
  };

  const handleAddFarmingPractice = () => {
    if (farmingPractice.trim() !== "") {
      setFarmerForm({
        ...farmerForm,
        farmingPractices: [
          ...farmerForm.farmingPractices,
          farmingPractice.trim(),
        ],
      });
      setFarmingPractice("");
    }
  };

  const handleRemoveFarmingPractice = (index) => {
    setFarmerForm({
      ...farmerForm,
      farmingPractices: farmerForm.farmingPractices.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(userForm));
  };

  const handleFarmerSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFarmerProfile(farmerForm));
  };

  if (loading || farmerLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "general"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General Information
        </button>
        {user?.role === "farmer" && (
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "farm"
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("farm")}
          >
            Farm Profile
          </button>
        )}
      </div>

      {activeTab === "general" && (
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">General Information</h2>

          <form onSubmit={handleUserSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userForm.name}
                    onChange={handleUserChange}
                    className="form-input pl-10 block w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={user?.email}
                    className="form-input pl-10 bg-gray-100 block w-full"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userForm.phone}
                    onChange={handleUserChange}
                    className="form-input pl-10 block w-full"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Type
                </label>
                <input
                  type="text"
                  id="role"
                  value={
                    user?.role.charAt(0).toUpperCase() + user?.role.slice(1)
                  }
                  className="form-input bg-gray-100 pl-3"
                  disabled
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address.street"
                    value={userForm.address.street}
                    onChange={handleUserChange}
                    className="form-input pl-10 block w-full"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address.city"
                    value={userForm.address.city}
                    onChange={handleUserChange}
                    className="form-input block w-full pl-3"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="address.state"
                    value={userForm.address.state}
                    onChange={handleUserChange}
                    className="form-input block w-full pl-3"
                    placeholder="State"
                  />
                </div>

                <input
                  type="text"
                  name="address.zipCode"
                  value={userForm.address.zipCode}
                  onChange={handleUserChange}
                  className="form-input block w-full pl-3"
                  placeholder="ZIP / Postal code"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "farm" && user?.role === "farmer" && (
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Farm Profile</h2>

          <form onSubmit={handleFarmerSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="farmName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Farm Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLeaf className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="farmName"
                    name="farmName"
                    value={farmerForm.farmName}
                    onChange={handleFarmerChange}
                    className="form-input pl-10 block w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="establishedYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Established Year
                </label>
                <input
                  type="number"
                  id="establishedYear"
                  name="establishedYear"
                  value={farmerForm.establishedYear}
                  onChange={handleFarmerChange}
                  className="form-input block w-full"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Farm Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={farmerForm.description}
                onChange={handleFarmerChange}
                className="form-input block w-full pl-3"
                placeholder="Tell customers about your farm..."
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farming Practices
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={farmingPractice}
                  onChange={(e) => setFarmingPractice(e.target.value)}
                  className="form-input flex-grow pl-3"
                  placeholder="e.g., Organic, No-till, Permaculture"
                />
                <button
                  type="button"
                  onClick={handleAddFarmingPractice}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {farmerForm.farmingPractices.map((practice, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{practice}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFarmingPractice(index)}
                      className="ml-2 text-green-800 hover:text-green-900"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="socialMedia.facebook"
                    value={farmerForm.socialMedia.facebook}
                    onChange={handleFarmerChange}
                    className="form-input block w-full pl-3"
                    placeholder="https://facebook.com/yourfarm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="socialMedia.instagram"
                    value={farmerForm.socialMedia.instagram}
                    onChange={handleFarmerChange}
                    className="form-input block w-full pl-3"
                    placeholder="https://instagram.com/yourfarm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="socialMedia.twitter"
                    value={farmerForm.socialMedia.twitter}
                    onChange={handleFarmerChange}
                    className="form-input block w-full pl-3"
                    placeholder="https://twitter.com/yourfarm"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Business Hours</h3>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(farmerForm.businessHours).map(
                  ([day, hours]) => (
                    <div
                      key={day}
                      className="grid grid-cols-3 gap-4 items-center"
                    >
                      <div className="capitalize">{day}</div>
                      <div>
                        <input
                          type="time"
                          name={`businessHours.${day}.open`}
                          value={hours.open}
                          onChange={handleFarmerChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <input
                          type="time"
                          name={`businessHours.${day}.close`}
                          value={hours.close}
                          onChange={handleFarmerChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Order Options</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptsPickup"
                    name="acceptsPickup"
                    checked={farmerForm.acceptsPickup}
                    onChange={handleFarmerChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="acceptsPickup"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Accepts Pickup Orders
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptsDelivery"
                    name="acceptsDelivery"
                    checked={farmerForm.acceptsDelivery}
                    onChange={handleFarmerChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="acceptsDelivery"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Offers Delivery
                  </label>
                </div>

                {farmerForm.acceptsDelivery && (
                  <div>
                    <label
                      htmlFor="deliveryRadius"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Delivery Radius (miles)
                    </label>
                    <input
                      type="number"
                      id="deliveryRadius"
                      name="deliveryRadius"
                      value={farmerForm.deliveryRadius}
                      onChange={handleFarmerChange}
                      className="form-input w-32"
                      min="0"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={farmerLoading}
            >
              {farmerLoading ? "Saving..." : "Save Farm Profile"}
            </button>

            {farmerSuccess && (
              <div className="mt-4 flex items-center text-green-600">
                <FaCheck className="mr-2" />
                <span>Farm profile updated successfully!</span>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
