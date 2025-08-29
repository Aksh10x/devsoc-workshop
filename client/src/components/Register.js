import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    bio: '',
    gender: '',
    birth_date: '',
    cover: null,
  });
  const [likes, setLikes] = useState([]);
  const [newLike, setNewLike] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddLike = (e) => {
    if (e.key === 'Enter' && newLike.trim()) {
      e.preventDefault();
      if (!likes.includes(newLike.trim().toLowerCase())) {
        setLikes([...likes, newLike.trim().toLowerCase()]);
      }
      setNewLike('');
    }
  };

  const removeLike = (likeToRemove) => {
    setLikes(likes.filter(like => like !== likeToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare form data
      const submitData = {
        ...formData,
        likes: likes,
      };

      const result = await register(submitData);
      if (!result.success) {
        if (typeof result.error === 'object') {
          // Handle field-specific errors
          const errorMessages = Object.entries(result.error)
            .map(([field, messages]) => {
              const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
              return `${fieldName}: ${Array.isArray(messages) ? messages.join(', ') : messages}`;
            })
            .join('\n');
          setError(errorMessages);
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Join DateApp</h2>
        
        {error && (
          <div className="error-message">
            {error.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="form-input"
            placeholder="Tell us about yourself..."
            maxLength="160"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="birth_date">Birth Date</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>Interests</label>
          <input
            type="text"
            value={newLike}
            onChange={(e) => setNewLike(e.target.value)}
            onKeyPress={handleAddLike}
            className="form-input likes-input"
            placeholder="Type an interest and press Enter"
          />
          <div className="likes-display">
            {likes.map((like, index) => (
              <span key={index} className="like-tag">
                {like}
                <button
                  type="button"
                  onClick={() => removeLike(like)}
                  className="remove-like"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cover">Profile Photo</label>
          <div className="file-input-container">
            <input
              type="file"
              id="cover"
              name="cover"
              onChange={handleChange}
              className="file-input"
              accept="image/*"
            />
            <label htmlFor="cover" className="file-input-label">
              {formData.cover ? formData.cover.name : 'Choose a photo'}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
