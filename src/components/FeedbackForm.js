import React, { useState } from 'react';
import { saveFeedback } from '../idb';
import './FeedbackForm.css';

function FeedbackForm() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    const feedback = {
      rating,
      comment,
      timestamp: new Date().toISOString()
    };

    await saveFeedback(feedback);
    alert("Feedback saved locally!");

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-feedback');
    }

    setRating('');
    setComment('');
  };

  return (
    <div className="feedback-card">
      <h1>SMART CANTEEN<br />FEEDBACK</h1>
      <h2>How was the food today?</h2>
      
      <p className="label">Rating</p>
      <div className="rating-group">
        {[1, 2, 3, 4, 5].map((val) => (
          <label key={val}>
            <input
              type="radio"
              value={val}
              checked={rating === String(val)}
              onChange={(e) => setRating(e.target.value)}
            />
            <span>★ {val}</span>
          </label>
        ))}
      </div>

      <textarea
        placeholder="Comments"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FeedbackForm;
