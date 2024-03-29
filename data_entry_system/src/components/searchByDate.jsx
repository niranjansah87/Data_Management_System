import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchByDate = () => {
    const [date, setDate] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const history = useNavigate();

    const handleSubmit = async () => {
        if (!date) {
            swal('Error', 'Date is required.', 'error');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/api/searchByDate?date=${date}`);

            if (response.status === 200) {
                setSearchResult(response.data);
                if (Array.isArray(response.data) && response.data.length === 0) {
                    swal('Info', 'Failed to fetch data.', 'info');
                }
            } else {
                swal('Error', 'Failed to fetch data.', 'error');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal('Error', 'No data found for the provided date.', 'error');
        }
    };

    const handleSearchByWord = () => {
        history('/searchByWord');
    };

    const InsertData = () => {
        history('/'); // Navigate to /searchByWord route
    };

    return (
        <div className="container">
            <div className="form-title">
                Data Management System
            </div>
            <div className="form-input">
                <label htmlFor="date">Enter Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="form-input">
                <button id="submit" onClick={handleSubmit}>Search</button>
            </div>
            <button className="glow-on-hover" style={{ left: '25px' }} type="button" onClick={handleSearchByWord}>Search By Words</button>
            <button className="glow-on-hover" style={{ left: '100px', border: '2px solid green', margin: '20px' }} type="button" onClick={InsertData}>Insert Data</button>
            {Array.isArray(searchResult) && searchResult.length > 0 && (
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

export default SearchByDate;
