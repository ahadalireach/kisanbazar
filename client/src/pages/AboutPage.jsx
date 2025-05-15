import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaUsers,
  FaHandshake,
  FaShoppingBasket,
  FaCheck,
} from "react-icons/fa";
import { member1, member2, member3, member4, member5 } from "../assets";

const teamMembers = [
  {
    id: 1,
    name: "Ahad Ali",
    pic: member1,
    linkedin: "https://www.linkedin.com/in/ahadalireach/",
  },
  {
    id: 2,
    name: "Muteeb Haider",
    pic: member2,
    linkedin: "https://www.linkedin.com/in/mateeb-haider-233b6b254/",
  },

  {
    id: 3,
    name: "Ali Mahmood Rana",
    pic: member3,
    linkedin: "https://www.linkedin.com/in/ali-mahmood-rana-7093322a7/",
  },

  {
    id: 4,
    name: "Muhammad Basit",
    pic: member4,
    linkedin: "https://www.linkedin.com/in/muhammad-basit-nazir-2aba93254/",
  },

  {
    id: 5,
    name: "Kamran Azhar",
    pic: member5,
    linkedin: "https://www.linkedin.com/in/kamranazhar/",
  },
];

const AboutPage = () => {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold rounded-full px-3 py-1 mb-6 shadow-sm border border-green-200">
              <span className="uppercase tracking-wider">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
              About KisanBazar
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              Connecting local farmers with consumers to promote sustainable
              agriculture and strengthen community bonds.
            </p>
          </div>
        </div>
      </section>

      <div className="container  mx-auto px-4 py-12">
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="bg-white/70 backdrop-blur-md shadow-xl p-10 rounded-3xl max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 text-center md:text-left">
                  <h2 className="text-4xl font-extrabold text-green-700 mb-6 leading-tight">
                    Our Mission
                  </h2>
                  <p className="text-gray-800 text-lg mb-4">
                    KisanBazar was founded with a simple yet powerful mission:
                    to create a direct link between local farmers and consumers.
                    We believe everyone deserves access to fresh, locally grown
                    produce and farmers deserve fair compensation.
                  </p>
                  <p className="text-gray-800 text-lg">
                    By eliminating middlemen and creating a transparent
                    marketplace, we're building a sustainable food system that
                    benefits both producers and consumers while reducing
                    environmental impact.
                  </p>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <div className="w-60 h-60 bg-green-100 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                    <FaLeaf className="text-green-500 text-8xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass p-8 rounded-2xl text-center shadow-md animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Farmers create profiles showcasing their farms, growing
                practices, and available produce. Consumers browse and discover
                local farms in their area.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center shadow-md animate-fade-in animate-delay-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingBasket className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Order</h3>
              <p className="text-gray-600">
                Consumers browse available products, select items, and place
                orders directly with farmers. Choose between pickup or delivery
                options.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center shadow-md animate-fade-in animate-delay-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-green-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600">
                Receive fresh, locally grown produce directly from farmers.
                Build relationships with the people who grow your food and
                support your local economy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">
                For Consumers
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>Access to fresher, more nutritious produce</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>
                    Knowledge about where your food comes from and how it's
                    grown
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>
                    Support for local economy and sustainable farming practices
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>
                    Reduced environmental impact from shorter supply chains
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>Direct communication with farmers</span>
                </li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">
                For Farmers
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>
                    Higher profit margins by selling directly to consumers
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>Stable local market for products</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>Reduced waste through better demand planning</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>
                    Opportunity to showcase sustainable farming practices
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-2" />
                  <span>Direct feedback from customers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16">
            Passionate people behind KisanBazar
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="glass p-4 rounded-[30px] flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 group border border-white/20"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <img
                    src={member.pic}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-lg transition-transform"
                  />
                </div>
                <h3 className="text-base font-semibold mb-3 text-gray-900">
                  {member.name}
                </h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-transform text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
            Whether you're a farmer looking to expand your customer base or a
            consumer seeking fresh, local produce, KisanBazar is for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-primary px-8 py-3 text-lg font-bold shadow-md"
            >
              Sign Up Now
            </Link>
            <Link
              to="/products"
              className="btn btn-outline px-8 py-3 text-lg font-bold"
            >
              Browse Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
