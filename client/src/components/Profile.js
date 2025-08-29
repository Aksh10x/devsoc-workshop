import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to user from context
        setProfileData(user);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="loading-container">
        <p>Unable to load profile data</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <motion.div
        className="profile-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {profileData.cover_image_url && (
          <motion.img
            src={profileData.cover_image_url}
            alt={`${profileData.first_name || ''} ${profileData.last_name || ''}`}
            className="profile-image"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        )}
        
        <motion.h1
          className="profile-name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {profileData.first_name || profileData.username || 'Unknown'} {profileData.last_name || ''}
        </motion.h1>
        
        <motion.p
          className="profile-age"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {profileData.age ? `${profileData.age} years old` : 'Age not specified'}
        </motion.p>
        
        <motion.p
          className="profile-bio"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {profileData.bio || 'No bio available'}
        </motion.p>
        
        <motion.div
          className="profile-likes"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {profileData.likes && profileData.likes.length > 0 ? (
            profileData.likes.map((like, index) => (
              <motion.span
                key={index}
                className="profile-like-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                {like}
              </motion.span>
            ))
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No interests added</p>
          )}
        </motion.div>

        
      </motion.div>
    </div>
  );
};

export default Profile;
