import React, { useState } from 'react';

import './App.css';
import './normal.css'


function App() {
  const modelList = ['MIXTRAL_8X7B_INSTRUCT_FP16', 'CODELLAMA_13B_INSTRUCT_FP16', 'CODELLAMA_34B_INSTRUCT_FP16', 'CODELLAMA_70B_INSTRUCT_FP16', 'CODELLAMA_7B_INSTRUCT_FP16', 'LLAMA_2_70B_CHAT_FP16', 'MISTRAL_7B_INSTRUCT_FP16', 'gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo'];

  const [inputModel, setInputModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [apiKey, setApiKey] = useState('');
  const [userQuery, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function clearChat() {
    setMessages([]);
  } 

  function toggleOptionsContainer() {
    const optionsContainer = document.querySelector('.custom-options-container');
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleOptionsContainer();
    }
  }

  function handleOptionClick(selectedModel) {
    setInputModel(selectedModel);
    toggleOptionsContainer();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userQuery.trim()) return; // Prevent empty queries
    if (loading) return; // Prevent multiple simultaneous requests
    if (!apiKey) {
      setErrorMessage('Please enter an API key');
      return;
    }
    setLoading(true);
    setQuery(''); // Clear the input field
    setErrorMessage('');
  
    // Append the user's query to messages
    const newMessage = { type: 'query', text: userQuery };
    setMessages(messages => [...messages, newMessage]);
  
    // Append a temporary "loading" message
    setMessages(messages => {
      const loadingMessageIndex = messages.length; // Index where the loading message will be added
      return [...messages, { type: 'loading', text: 'Loading...' }]
    });
  
    const url = "http://18.118.200.3/handle_llm_request";
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
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // Replace the "loading" message with the actual response
      setMessages(currentMessages => {
        const loadingMessageIndex = currentMessages.findIndex(msg => msg.type === 'loading');
        return [
          ...currentMessages.slice(0, loadingMessageIndex),
          { type: 'response', text: data.choices[0].message.content },
          ...currentMessages.slice(loadingMessageIndex + 1),
        ];
      });

    } catch (error) {
      console.error("Error making API call:", error);
      setErrorMessage(`Failed to fetch data: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='sidemenu-button' onClick={clearChat}>
          <span className='sidemenu-button-span'>
            +
          </span>
          Clear Chat
        </div>
        <div className="model-selector-section">
          <div className="model-selector-header">
            Models
          </div>
          <div className="custom-select-container">
            <div className="selected-value" tabIndex="0" onClick={toggleOptionsContainer} onKeyPress={handleKeyPress}>
                {inputModel}
              </div>
              <div className="custom-options-container">
                {modelList.map((model) => (
                  <div
                    key={model}
                    className="custom-option"
                    data-value={model}
                    onClick={() => handleOptionClick(model)}
                  >
                    {model}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="model-selector-section">
          <div className="model-selector-header">
            API Key
          </div>
          <input className="api-key-input" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        </div>
        {/* <div className="slider-container">
          <div className="slider-top-row">
             <label htmlFor="temperature-slider">Temperature</label>
             <div className = "temperature-value">
              <input
                type="number"
                className="temperature-number"
                value={temperature}
                step="0.1"
                min="0"
                max="1"
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                placeholder="Temperature"
              />
            </div>
          </div>
             <input
              type="range"
              id="temperature-slider"
              value={temperature}
              step="0.1"
              min="0"
              max="1"
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
          </div> */}
      </aside>
      <section className='chatbox'>
        <div className = 'chat-log'>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}`}>
            <div className='chat-message-center'>
              <div className='top-row'>
                <div className={`avatar ${message.type}`}>
                  {message.type === 'query' ? 'Y' : 'AI'}
                </div>
                <div className={`message ${message.type}`}>
                  {message.type === 'query' ? 'You' : 'Response'}
                </div>
              </div>
              <div className='output-text'>
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='chatbox-input-container'>
            <div className='chatbox-input-holder'>
              <textarea
                rows="1"
                className='chatbox-input-entry'
                placeholder='Ask Anything...'
                value={userQuery}
                onInput={(e) => autoExpand(e.target)}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
              <div className='submit-button' onClick={handleSubmit}>
                <span className='submit-button-span'>
                S
                </span>
              </div>
            </div>
          <p className="disclaimer">Generated content can be inaccurate or false. Consider checking important information.</p>
        </div>
      </section>
    </div>
    );
  } 

export default App;


function autoExpand(field) {
  const minHeight = 18.398;
  // Reset field height to minimum
  field.style.height = minHeight + 'px'; 

  // Get the computed styles for the element
  var computed = window.getComputedStyle(field);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
               + parseInt(computed.getPropertyValue('padding-top'), 10)
               + field.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  // If the scrollHeight is less than the minHeight, set it to minHeight. Otherwise, set it to the calculated height
  field.style.height = (field.scrollHeight <= minHeight ? minHeight : height) + 'px';
}

// Event listener for textarea on input
document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
}, false);