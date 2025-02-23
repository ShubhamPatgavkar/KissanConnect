import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import { Users, ShoppingBasket, TrendingUp, ChevronRight, Leaf, Apple } from "lucide-react";
import "../styles/Home.css";

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Navbar />

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Connecting Farmers <br />
                <span className="highlight">Empowering Agriculture</span>
              </h1>
              <p>
                Join India's largest farming community. Connect with fellow farmers, access markets, and grow your agricultural business.
              </p>
              <button className="cta-button">
                Get Started <ChevronRight className="icon" />
              </button>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80"
                alt="Farmer in field"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose KisanConnect?</h2>
          <p className="subtitle">Everything you need to grow your farming business</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Users className="icon" />
              </div>
              <h3>Community Support</h3>
              <p>Connect with experienced farmers and share knowledge</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <ShoppingBasket className="icon" />
              </div>
              <h3>Direct Market Access</h3>
              <p>Sell your produce directly to buyers at better prices</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp className="icon" />
              </div>
              <h3>Growth Resources</h3>
              <p>Access modern farming techniques and market insights</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Apple className="icon" />
              </div>
              <h3>Fruits & Vegetables</h3>
              <p>Get real-time pricing and sell your fresh produce easily</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Leaf className="icon" />
              </div>
              <h3>Organic Farming</h3>
              <p>Learn organic techniques and connect with eco-friendly buyers</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to grow with us?</h2>
          <p>Join thousands of farmers already using KisanConnect to transform their farming business.</p>
          <button className="cta-button">Join the Community</button>
        </div>
      </div>
    );
  }
}

export default Home;