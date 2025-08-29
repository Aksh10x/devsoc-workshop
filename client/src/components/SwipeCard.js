import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { datingAPI } from '../utils/api';
import { FaTimes, FaHeart } from 'react-icons/fa';

const MatchModal = ({ isVisible, onClose, matchedUser }) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="match-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="match-content"
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="match-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            It's a Match! 🎉
          </motion.div>
          <motion.p
            className="match-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            You and {matchedUser?.first_name} {matchedUser?.last_name} liked each other!
          </motion.p>
          <motion.button
            className="match-close"
            onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Swiping
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SwipeCard = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [exitDirection, setExitDirection] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await datingAPI.getUsers();
      setUsers(response.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction, targetUserId) => {
    const action = direction === 'right' ? 'like' : 'pass';
    
    // Set exit direction for animation
    setExitDirection(direction);
    
    try {
      const response = await datingAPI.interact(targetUserId, action);
      
      if (response.data.matched) {
        setMatchedUser(users[currentIndex]);
        setShowMatch(true);
      }

      // Move to next card or add new user from backend
      if (response.data.next) {
        const newUsers = [...users];
        newUsers[currentIndex + 1] = response.data.next;
        setUsers(newUsers);
      }
      
      setCurrentIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error swiping:', error);
      // Still move to next card on error
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleButtonSwipe = (direction) => {
    if (currentIndex < users.length) {
      handleSwipe(direction, users[currentIndex].id);
    }
  };

  const currentUser = users[currentIndex];
  const nextUser = users[currentIndex + 1];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Finding amazing people for you...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="swipe-container">
        <div className="no-more-cards">
          <h2>No more cards</h2>
          <p>Come back later for more potential matches!</p>
          <motion.button
            className="submit-btn"
            onClick={fetchUsers}
            style={{ marginTop: '2rem', maxWidth: '200px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Refresh
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <div className="swipe-stack">
        <AnimatePresence mode="wait">
          {/* Next card (background) */}
          {nextUser && (
            <motion.div
              key={`next-${currentIndex}`}
              className="swipe-card"
              style={{ zIndex: 1, scale: 0.95, opacity: 0.8 }}
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 0.95, opacity: 0.8 }}
            >
              <img
                src={nextUser.cover_image_url}
                alt={`${nextUser.first_name} ${nextUser.last_name}`}
                className="card-image"
              />
              <div className="card-content">
                <div className="card-header">
                  <span className="card-name">{nextUser.first_name} {nextUser.last_name}</span>
                  <span className="card-age">{nextUser.age}</span>
                </div>
                <p className="card-bio">{nextUser.bio}</p>
                <div className="card-likes">
                  {nextUser.likes?.slice(0, 3).map((like, index) => (
                    <span key={index} className="card-like-tag">
                      {like}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Current card (foreground) */}
          <motion.div
            key={`current-${currentIndex}`}
            className="swipe-card"
            style={{ zIndex: 2 }}
            initial={{ scale: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ scale: 1, x: 0, y: 0, rotate: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(event, info) => {
              const threshold = 150;
              if (Math.abs(info.offset.x) > threshold) {
                const direction = info.offset.x > 0 ? 'right' : 'left';
                handleSwipe(direction, currentUser.id);
              }
            }}
            whileDrag={{
              scale: 1.05,
            }}
            exit={{
              x: exitDirection === 'right' ? 300 : exitDirection === 'left' ? -300 : 0,
              rotate: exitDirection === 'right' ? 30 : exitDirection === 'left' ? -30 : 0,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
          >
            <img
              src={currentUser.cover_image_url}
              alt={`${currentUser.first_name} ${currentUser.last_name}`}
              className="card-image"
            />
            <div className="card-content">
              <div className="card-header">
                <span className="card-name">{currentUser.first_name} {currentUser.last_name}</span>
                <span className="card-age">{currentUser.age}</span>
              </div>
              <p className="card-bio">{currentUser.bio}</p>
              <div className="card-likes">
                {currentUser.likes?.map((like, index) => (
                  <span key={index} className="card-like-tag">
                    {like}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="swipe-actions">
        <motion.button
          className="action-btn pass-btn"
          onClick={() => handleButtonSwipe('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes />
        </motion.button>
        <motion.button
          className="action-btn like-btn"
          onClick={() => handleButtonSwipe('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaHeart />
        </motion.button>
      </div>

      {/* Match Modal */}
      <MatchModal
        isVisible={showMatch}
        onClose={() => setShowMatch(false)}
        matchedUser={matchedUser}
      />
    </div>
  );
};

export default SwipeCard;
