import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import Header from '../Header/Header';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [activeTab, setActiveTab] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [buttonColor, setButtonColor] = useState('#3a3ad5');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json');
        console.log(response);
        setResources(response.data);
        setFilteredResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [activeTab, searchTerm, currentPage]);

  useEffect(() => {
    if (activeTab === 'resources') {
      setButtonColor('#3a3ad5');
    }
  }, [activeTab]);

  const filterResources = () => {
    let filtered = resources;

    if (activeTab !== 'resources') {
      filtered = filtered.filter(resource => resource.tag === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setButtonColor('#3a3ad5');
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResources.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredResources.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="home">
      <Header />
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          style={{ backgroundColor: activeTab === 'resources' ? buttonColor : '' }}
          onClick={() => handleTabChange('resources')}
        >
          Resources
        </button>
        <button
          className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}
          style={{ backgroundColor: activeTab === 'request' ? buttonColor : '' }}
          onClick={() => handleTabChange('request')}
        >
          Requests
        </button>
        <button
          className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
          style={{ backgroundColor: activeTab === 'user' ? buttonColor : '' }}
          onClick={() => handleTabChange('user')}
        >
          Users
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="resource-cards">
        {currentItems.map(resource => (
          <div key={resource.id} className="card">
            <div className='item-logo'>
              <img src={resource.icon_url} />
              <span>
                <h3>{resource.title}</h3>
                <h5>{resource.category}</h5>
              </span>
            </div>

            <p className = 'link'>{resource.link}</p>
            <p className = 'description'>{resource.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
