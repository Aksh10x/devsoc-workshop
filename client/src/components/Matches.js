import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { datingAPI } from '../utils/api';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await datingAPI.getMatches();
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the other user from a match
  const getMatchUser = (match, currentUserId) => {
    return match.user1.id === currentUserId ? match.user2 : match.user1;
  };

  // Get current user ID from localStorage
  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your matches...</p>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <h1 className="matches-title">Your Matches</h1>
      
      {matches.length === 0 ? (
        <motion.div
          className="no-matches"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>No matches yet</h2>
          <p>Keep swiping to find your perfect match!</p>
        </motion.div>
      ) : (
        <motion.div
          className="matches-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {matches.map((match, index) => {
            const matchUser = getMatchUser(match, getCurrentUserId());
            
            return (
              <motion.div
                key={match.id}
                className="match-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={matchUser.cover_image_url}
                  alt={`${matchUser.first_name} ${matchUser.last_name}`}
                  className="match-image"
                />
                <div className="match-info">
                  <div className="match-name">
                    {matchUser.first_name} {matchUser.last_name}
                  </div>
                  <div className="match-age">
                    {matchUser.age} years old
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Matches;
