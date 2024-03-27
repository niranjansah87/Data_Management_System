import { useState } from 'react';
import swal from 'sweetalert';

const Main = () => {
  const [date, setDate] = useState('');
  const [words, setWords] = useState('');

  const handleSubmit = () => {
    if (!date || !words) {
      swal('Error', 'Both date and words are required.', 'error');
      return;
    }

    // Perform your submission logic here
    // For example, you can make an API call to submit the data

    // Reset the form after submission
    setDate('');
    setWords('');
    swal('Success', 'Data submitted successfully.', 'success');
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
      <button className="glow-on-hover" style={{left: '25px'}} type="button">Search By Word</button>
      <button className="glow-on-hover" style={{left: '120px', border: '2px solid green'}} type="button">Search by Date</button>
    </div>
  );
};

export default Main;
