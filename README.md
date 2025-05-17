# KisanBazar

**KisanBazar** is a full-stack web application developed during a hackathon to bridge the gap between farmers and consumers. It enables farmers to showcase their produce, connect with buyers, and build trust — all in one platform.

🚀 **Winner of the Full Stack Web Development Hackathon** at the University of South Asia — built by Team Terminator 🏆

---

## 💡 Challenge (Given Scenario)

**Build a full-stack web application that connects farmers and consumers.**

We responded with **KisanBazar** — a modern, scalable agri-tech solution empowering both farmers and consumers.

---

## ❗ The Problem (That Needs to Be Solved)

Farmers in many regions face major hurdles:

- ❌ Limited or no digital presence
- ❌ Dependence on middlemen who reduce their profit margins
- ❌ Lack of direct connection and trust with consumers
- ❌ No centralized online platform to market their goods

---

## ✅ Our Developed Solution

**KisanBazar** directly addresses these issues by offering:

- 🌾 **Farmer Profiles** — Showcase farm products, locations, and background
- 🛒 **Consumer Dashboard** — Browse goods by category, farm
- 📬 **Messaging System** — Enables real-time communication between farmers and consumers
- 📦 **Order Requests** — Simple, secure order placement
- ⚙️ **Admin Panel** — Manage users, listings, categories
- 📈 **Trust Building** — Transparent and localized digital marketplace

---

## Technologies Used

- **Frontend:** React JS, Tailwind CSS, React Redux
- **Backend:** Node JS, Express JS
- **Database:** MongoDB
- **Security:** JWT (JSON Web Token)
- **Hosting:** Vercel

---

## 🧩 Features Overview

| Role       | Features                                                                          |
|------------|-----------------------------------------------------------------------------------|
| 👨‍🌾 Farmer  | Register, login, create profile, list products, manage products, view & reply to messages  |
| 🛒 Consumer | Browse listings, search by category, message farmers, request orders               |
| 🛠️ Admin   | Manage users, products, order requests, and categories via dashboard              |
| 🔐 Auth    | Role-based access control                                                         |

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- VS Code or any other code editor
- Git (optional, for cloning the repository)

### File Structures

```plaintext
client/
├── public/
│   └── logo.png                       # Logo file
├── src/
│   ├── assets/                        # Images and other assets
│   ├── components/                    # Reusable UI components
│   ├── pages/                         # Pages
│   ├── redux/                         # State management
│   ├── App.jsx                        # React Router setup
│   └── main.jsx                       # Application entry point
├── .env                               # Environment variables
└── index.html                         # Root HTML file
```

```plaintext
api/
├── controllers/                       # Core logic
├── db/                                # Database connection
├── models/                            # Data schemas
├── routes/                            # API routes
├── utils/                             # Helper functions
├── .env                               # Environment variables
└── index.js                           # Main server file
```

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/kisanbazar.git
   ```

   `Unzip the File`

2. **Open with VS Code**

   Open the project directory with VS Code or your preferred code editor.

3. **Install Dependencies**

    **Frontend:**

    - Navigate to the frontend directory:

    ```bash
    cd client
    ```

    - Create a `.env` file in the backend directory and add the following environment variables:

    ```env
    VITE_BACKEND_URL = your_backend_url (http://localhost:5000)
    ```

    - Install the dependencies:

    ```bash
    npm install
    ```

    - Run the development server:

    ```bash
    npm run dev
    ```

    **Backend:**

    - Navigate to the backend directory:

    ```bash
    cd api
    ```

    - Create a `.env` file in the backend directory and add the following environment variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRE =your_jwt_expiry (90d)
    ```

    - Install the dependencies:

    ```bash
    npm install
    ```

    - Start the server:

    ```bash
    npm run dev
    ```

4. **Update API URLs**

    Ensure that the API URLs in your frontend code are correctly pointing to your local backend server. Update the `VITE_BACKEND_URL` in the `.env` file (as mentioned in the previous step).

5. **Access the Application**

    After everything is set up:
    - Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.
    - Ensure the frontend loads correctly and communicates with the backend server.

---

## Live Links

- **Live Web:** [kisanbazar.vercel.app](https://kisanbazar.vercel.app)
- **GitHub Repo:** [github.com/ahadalireach/kisanbazar](https://github.com/ahadalireach/kisanbazar) (Give it a Star!)
- Live Video Demo: [Watch Now](https://www.youtube.com/watch?v=riaSSccA8uk)

## Contact

For any questions, feedback, or collaboration opportunities, feel free to contact me at [ahadali.reach@gmail.com](mailto:ahadali.reach@gmail.com).

---

> Built with ❤️ by Team Terminator | **Full Stack Web Development Hackathon** Winner at the University of South Asia 🏆
