# Dating App Client (React Frontend)

A modern React frontend for a dating application with swipe functionality, real-time animations, and responsive design.

### Prerequisites

- Node.js 16+ and npm
- The Django backend server running on `http://127.0.0.1:8000`

### Installation

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   **Key dependencies:**
   - react & react-dom
   - react-router-dom
   - framer-motion
   - axios
   - react-icons

3. **Start the development server:**
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000/`

## Application Flow

### 1. Authentication
- **Register**: Create a new account with username, email, and password
- **Login**: Access your account with credentials
- **Auto-redirect**: Authenticated users go to swipe page, others to login

### 2. Discover (Swipe Interface)
- **Swipe right** or **click heart** to like someone
- **Swipe left** or **click X** to pass
- **Match celebration** when mutual like occurs
- **Smooth animations** for all interactions

### 3. Matches
- View all your mutual matches
- **Grid layout** with profile cards
- **Hover animations** for interactivity

### 4. Profile
- View and edit your profile information
- **Debug information** for development

## Sample User Journey

### First Time User

1. **Visit the app** → Redirected to login page
2. **Click "Sign up"** → Fill registration form
3. **Complete registration** → Auto-login and redirect to swipe
4. **Start swiping** → See potential matches
5. **Get matches** → Celebrate and view in matches page
6. **Check profile** → See your information

### Returning User

1. **Visit the app** → Auto-login if token valid
2. **Continue swiping** → Pick up where you left off
3. **Check new matches** → See recent matches
4. **Update profile** → Edit bio or preferences

## Component Structure

```
src/
├── components/
│   ├── Login.js          # Login form with validation
│   ├── Register.js       # Registration form
│   ├── SwipeCard.js      # Main swipe interface
│   ├── Matches.js        # Matches grid display
│   ├── Profile.js        # User profile view
│   └── Navbar.js         # Navigation with mobile sidebar
├── contexts/
│   └── AuthContext.js    # Global authentication state
├── utils/
│   └── api.js           # API communication layer
├── App.js               # Main app with routing
├── App.css              # Global styles
└── index.js             # React entry point
```

## API Integration

The frontend communicates with the Django backend through these endpoints:

### Authentication
```javascript
// Login
POST /api/auth/login/
{
  "username": "john_doe",
  "password": "secure123"
}

// Register
POST /api/auth/register/
{
  "username": "john_doe",
  "password": "secure123",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Dating Features
```javascript
// Get potential matches
GET /api/dating/users/
Authorization: Bearer <token>

// Record swipe interaction
POST /api/dating/interact/
{
  "target_user_id": 2,
  "interaction_type": "like" // or "pass"
}

// Get matches
GET /api/dating/matches/
Authorization: Bearer <token>
```

## Swipe Mechanics

### Gesture Controls
- **Drag left**: Pass on user
- **Drag right**: Like user
- **Button clicks**: Alternative to dragging
- **Keyboard**: Space (like), Escape (pass)

### Animation Details
- **Card exit**: Slides in swipe direction with rotation
- **Next card**: Scales up smoothly
- **Match modal**: Confetti-style celebration
- **Responsive**: Works on all screen sizes

## Mobile Experience

### Responsive Features
- **Mobile sidebar**: Hamburger menu navigation
- **Touch gestures**: Native swipe support
- **Optimized layout**: Proper spacing on small screens
- **Icon navigation**: Clear visual indicators

### Mobile Sidebar
- **Slide-in animation** from right
- **Overlay background** with blur effect
- **Touch-friendly** large buttons
- **Auto-close** on navigation

## Styling & Theme

### Color Scheme
- **Primary**: Pink gradients (#fd5068 to #ff8a9b)
- **Secondary**: Warm yellow (#ffeaa7)
- **Background**: Gradient backdrop
- **Cards**: Clean white with subtle shadows

### Key Design Elements
- **Rounded corners**: Modern card design
- **Gradient buttons**: Eye-catching CTAs
- **Smooth transitions**: All interactions animated
- **Typography**: Clean, readable fonts
- **Icons**: React Icons for consistency

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Analyze bundle size
npm run build && npx serve -s build
```

## Sample Testing Scenarios

### With Sample Data

1. **Login as sample user**:
   - Username: `alice_johnson`
   - Password: `password123`

2. **Test swipe functionality**:
   - Swipe through sample profiles
   - Try both gesture and button interactions
   - Watch for match animations

3. **Check matches page**:
   - View mutual matches
   - Test responsive grid layout

4. **Mobile testing**:
   - Open developer tools
   - Test mobile sidebar
   - Verify touch interactions

### Without Sample Data

1. **Register new account**
2. **No profiles message** should appear
3. **Test navigation** between pages
4. **Profile page** should show user info

## Environment Configuration

### Development
- Backend URL: `http://localhost:8000`
- Frontend URL: `http://localhost:3000`
- CORS enabled for cross-origin requests

### API Configuration
```javascript
// In utils/api.js
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Reset Application State

```javascript
// Clear all localStorage
localStorage.clear();

// Or specifically auth data
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Test on multiple devices
5. Submit a pull request

## DevSoc Workshop Notes

This frontend is designed for educational purposes to demonstrate:
- Modern React development patterns
- REST API integration
- Animation libraries usage
- Responsive design principles
- User experience best practices

Perfect for learning how web applications work and how frontend connects to backend services!

---

## Create React App Commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
