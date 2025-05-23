# Blogging-Platform-Frontend


This is the frontend of the Blogging Platform built using **ReactJS**. It allows users to register, log in, create, edit, and delete blog posts, and view all public blogs. The frontend connects to a backend API built with Node.js and MySQL.

---

##  Features

- JWT-based authentication
- Rich text editing using CKEditor
- Public blog post listing and detail view
- Dashboard for managing user-specific posts
- Frontend-only search functionality (by title/content)
- Responsive design using CSS Modules
- Smooth animations with Framer Motion

---

##  Approach

- Designed using a component-based architecture in React.
- Global authentication state is managed using `AuthContext`.
- Axios is used for all API communications with the backend.
- JWT tokens are stored in localStorage for persistent sessions.
- Implemented role-based UI: only authors can edit or delete their posts.

---

## AI Usage

- **ChatGPT**:
  - Helped for component structure and routing
  -Generated setup and README templates
 
---

##  Setup Instructions

- Node.js v16 or above
- Backend server running (see backend setup)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Blogging-Platform-Frontend.git
cd Blogging-Platform-Frontend


###Install Dependencies

npm install

### Create a .env File
Inside the root directory, add your backend URL:


REACT_APP_API_BASE_URL=http://localhost:5000/api
Replace localhost:5000 with your deployed backend URL if applicable.

####Start the Development Server

npm start

The app will be available at http://localhost:3000.

###Folder Structure

src/
├── api/                # Axios instance
├── components/         # Navbar, PostCard, Editor
├── pages/              # Login, Register, Home, Dashboard, etc.
├── styles/             # CSS modules
├── App.js
└── index.js

