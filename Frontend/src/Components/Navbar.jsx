import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Add your custom styles here

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }

componentDidMount() {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.displayName) {
        this.setState({ username: parsedUser.displayName });
      }
      console.log(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}


  handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  };

  render() {
    const { username } = this.state;

    return (
      <header className="bg-green-600 text-white body-font">
        <div className="k container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* Logo */}
         <Link
  to="/"
  className="flex title-font font-medium items-center text-black mb-4 md:mb-0"
  style={{ textDecoration: 'none', fontWeight: 'bold' }}
>
  <span className="ml-3 text-xl text-black">Kissan Connect</span>
</Link>

          {/* Navigation Links */}
          <nav className="md:ml-auto flex space-x-6 items-center text-base">
            <Link to="/" className="hover:text-green-200">
              Home
            </Link>
            <Link to="/crops" className="hover:text-green-200">
              Crops
            </Link>
            <Link to="/Analysis" className="hover:text-green-200">
              Analysis
            </Link>
            <Link to="/postCrop" className="hover:text-green-200">
              Post Crop
            </Link>
          </nav>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4 md:mt-0 items-center">
            {username ? (
              <>
                {/* Display username */}
                <span className="text-white font-medium">Welcome, {username}</span>
                <button
                  onClick={this.handleLogout}
                  className="bg-white text-green-600 py-2 px-4 rounded hover:bg-green-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-white text-green-600 py-2 px-4 rounded hover:bg-green-100">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
