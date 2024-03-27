import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [date, setDate] = useState('');
  const [words, setWords] = useState('');


  const handleSubmit = async () => {
    if (!date || !words) {
      swal('Error', 'Both date and words are required.', 'error');
      return;
    }
  
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://localhost:3001/api/insert', { date, words });
  
      // Check the response status
      if (response.status === 201) {
        // Reset the form after successful submission
        setDate('');
        setWords('');
        swal('Success', 'Data submitted successfully.', 'success');
      } else {
        swal('Error', 'Failed to submit data.', 'error');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      swal('Error', 'Failed to submit data.', 'error');
    }
  };
  const history = useNavigate();
  const handleSearchByWord = () => {
    history('/searchByWord'); // Navigate to /searchByWord route
    
  };

  const handleSearchByDate = () => {
    history('/searchByDate');
  };

  return (
    <div className="container">
      <div className="form-title">
        Data management system
      </div>
      <div className="form-input">
        <label htmlFor="date">Enter Date</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-input">
        <label htmlFor="words">Words:</label>
        <input type="text" id="words" value={words} onChange={(e) => setWords(e.target.value)} />
      </div>
      <div className="form-input">
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <button className="glow-on-hover" style={{left: '25px'}} type="button" onClick={handleSearchByWord}>Search By Word</button>
      <button className="glow-on-hover" style={{left: '120px', border: '2px solid green'}} type="button" onClick={handleSearchByDate}>Search by Date</button>
    </div>
  );
};

export default Main;
