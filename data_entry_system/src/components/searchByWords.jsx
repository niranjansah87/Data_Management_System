import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchByWords = () => {
    const [words, setWords] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
    const handleSubmit = async () => {
        if (!words) {
            swal('Error', 'Words are required.', 'error');
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:3001/api/searchByWord?words=${words}`);
    
            if (response.status === 200) {
                setSearchResult(response.data);
            } else {
                swal('Error', 'Failed to fetch data.', 'error');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal('Error', 'Failed to fetch data.', 'error');
        }
    };
    const history = useNavigate();
    const InsertData = () => {
      history('/'); // Navigate to /searchByWord route
      
    };
  
    const handleSearchByDate = () => {
      history('/searchByDate');
    };
    return (
        <div className="container">
            <div className="form-title">
                Data Management System
            </div>
            <div className="form-input">
                <label htmlFor="words">Enter Words</label>
                <input type="text" id="words" value={words} onChange={(e) => setWords(e.target.value)} />
            </div>
            
            <div className="form-input">
                <button id="submit" onClick={handleSubmit}>Search</button>
            </div>
            <button className="glow-on-hover" style={{left: '25px'}} type="button" onClick={handleSearchByDate}>Search By Date</button>
            <button className="glow-on-hover" style={{left: '100px', border: '2px solid green' ,margin:'20px'}} type="button" onClick={InsertData}>Insert Data</button>
            {searchResult.length > 0 && (
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Words</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.words}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchByWords;
