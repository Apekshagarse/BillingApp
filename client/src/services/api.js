const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for handling responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

// Bill API calls using Fetch
export const getBills = () => {
  return fetch(`${API_BASE_URL}/bills`)
    .then(handleResponse);
};

export const saveBill = (billData) => {
  return fetch(`${API_BASE_URL}/bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(billData)
  }).then(handleResponse);
};

export const deleteBill = (id) => {
  return fetch(`${API_BASE_URL}/bills/${id}`, {
    method: 'DELETE'
  }).then(handleResponse);
};