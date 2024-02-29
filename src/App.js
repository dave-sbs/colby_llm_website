import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import './App.css';


export default function Chat() {
  const [inputModel, setInputModel] = useState('MIXTRAL_8X7B_INSTRUCT_FP16');
  const modelList = ['MIXTRAL_8X7B_INSTRUCT_FP16', 'Model2', 'Model3', 'Model4', 'Model5'];

  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(100);

  const [apiKey, setApiKey] = useState('llm_api-fTpmESmiOrZLiJkwXCK8Y8Mx');
  const [userQuery, setQuery] = useState('what is a banana?');
  const [response, setResponse] = useState('');

  // Loading/Waiting states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Indicate loading state
    setErrorMessage(''); // Reset error message

    const url = "http://137.146.195.250/handle_llm_request";

    const requestBody = {
      input_text: userQuery,
      api_key: apiKey,
      model_name: inputModel,
      temperature: temperature.toString(),
      max_tokens: maxTokens.toString(),
    };



    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle your data here
      console.log(data);
      // Example: setResponse(data); // Adjust based on actual API response structure
    } catch (error) {
      console.error("Error making API call:", error);
      setErrorMessage(`Failed to fetch data: ${error}`);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Navbar>
            {/* <li className='PathfindingVisualizer__navbar-item-dropdown'> */}
              {/* <button class="dropbtn">{inputModel}</button> */}
                {/* <div class="dropdown-content"> */}
                  {/* go through model list using a loop and list each as an option under the dropdown */}
                  <select value={inputModel} onChange={(e) => setInputModel(e.target.value)}>
                    {modelList.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                {/* </div> */}
            {/* </li> */}
          
            <div className="slider-container">
              <label htmlFor="temperature-slider">Temperature:</label>
              <input
                type="range"
                id="temperature-slider"
                value={temperature}
                step="0.1"
                min="0"
                max="1"
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
              <input
                type="number"
                id="temperature-number"
                value={temperature}
                step="0.1"
                min="0"
                max="1"
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                placeholder="Temperature"
              />
            </div>

            <div className="slider-container">
              <label htmlFor="maxtokens-slider">Max Tokens:</label>
              <input
                type="range"
                id="maxtokens-slider"
                value={maxTokens}
                min="0"
                max="512" // Set a reasonable max value for tokens
                onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
              />
              <input
                type="number"
                id="maxtokens-number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
                placeholder="Max Tokens"
              />
            </div>
          </Navbar>

          {/* Create a div that displays the response in the middle of the website */}
          <div class="ResponseArea">
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {response && <p>{response}</p>}
          </div>

          <div class="InputArea">
            <textarea
              id="userInput"
              type="text"
              value={userQuery}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Anything..."
            ></textarea>
            <button type="submit">Submit</button>
          </div>
          {/* <textarea
          value = {response}
          onChange = {(e) => setResponse(e.target.value)}></textarea> */}
        </form>
      </div>
    </>
  );
}
