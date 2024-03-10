// function Chat() {
//   const [inputModel, setInputModel] = useState('MIXTRAL_8X7B_INSTRUCT_FP16');
//   const modelList = ['MIXTRAL_8X7B_INSTRUCT_FP16', 'CODELLAMA_13B_INSTRUCT_FP16', 'CODELLAMA_34B_INSTRUCT_FP16', 'CODELLAMA_70B_INSTRUCT_FP16', 'CODELLAMA_7B_INSTRUCT_FP16', 'LLAMA_2_70B_CHAT_FP16', 'MISTRAL_7B_INSTRUCT_FP16'];

//   const [temperature, setTemperature] = useState(0.7);
//   const [maxTokens, setMaxTokens] = useState(100);

//   const [apiKey, setApiKey] = useState('llm_api-fTpmESmiOrZLiJkwXCK8Y8Mx');
//   const [userQuery, setQuery] = useState('');
//   const [response, setResponse] = useState('');

//   // Loading/Waiting states
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Indicate loading state
//     setErrorMessage(''); // Reset error message

//     const url = "http://18.118.200.3/handle_llm_request";
    
//     const requestBody = {
//       input_text: userQuery,
//       api_key: apiKey,
//       model_name: inputModel,
//       temperature: temperature.toString(),
//       max_tokens: maxTokens.toString(),
//     };



//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody),
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // Handle your data here...
//       setResponse(data.choices[0].message.content);
//       console.log(data);
//       // Example: setResponse(data); // Adjust based on actual API response structure
//     } catch (error) {
//       console.error("Error making API call:", error);
//       setErrorMessage(`Failed to fetch data: ${error}`);
//     } finally {
//       setLoading(false); // Reset loading state regardless of success or failure
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         {/* <Navbar>
//           <select value={inputModel} onChange={(e) => setInputModel(e.target.value)}>
//             {modelList.map((model) => (
//               <option key={model} value={model}>{model}</option>
//             ))}
//           </select>

//           <div className="slider-container">
//             <label htmlFor="temperature-slider">Temperature:</label>
//             <input
//               type="range"
//               id="temperature-slider"
//               value={temperature}
//               step="0.1"
//               min="0"
//               max="1"
//               onChange={(e) => setTemperature(parseFloat(e.target.value))}
//             />
//             <input
//               type="number"
//               id="temperature-number"
//               value={temperature}
//               step="0.1"
//               min="0"
//               max="1"
//               onChange={(e) => setTemperature(parseFloat(e.target.value))}
//               placeholder="Temperature"
//             />
//           </div>

//           <div className="slider-container">
//             <label htmlFor="maxtokens-slider">Max Tokens:</label>
//             <input
//               type="range"
//               id="maxtokens-slider"
//               value={maxTokens}
//               min="0"
//               max="512"
//               onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
//             />
//             <input
//               type="number"
//               id="maxtokens-number"
//               value={maxTokens}
//               onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
//               placeholder="Max Tokens"
//             />
//           </div>
//         </Navbar> */}

//         {/* <ResponseArea>
//           {loading && <p>Loading...</p>}
//           {errorMessage && <p>{errorMessage}</p>}
//           {response && <p>{response}</p>}
//         </ResponseArea> */}

//         <div class="chat-container">
//               <div class="message user">
//                 <p class="message-text">use styled components for the following jsx code so that the Navbar section is at the top, response area takes up the middle part of the website, Input area is on the bottom of the screen</p>
//               </div>
//               <div class="message chatgpt">
//                 <p class="message-text">To structure your React app with the described layout using styled-components, you'll first need to ensure you have styled-components installed in your project. If it's not installed, you can add it via npm or yarn:</p>
//               </div>
//         </div>

//         {/* <InputArea> */}
//         <div class="message-container">
//           <div class="input-group">
//             <textarea 
//             id="messageChatGPT" 
//             placeholder="Ask Anything..." 
//             aria-label="Message ChatGPT"
//             value={userQuery}
//             onChange={(e) => setQuery(e.target.value)}
//             ></textarea>
//             <button type="submit" aria-label="Send message"> S
//               {/* <!-- Replace with your send button icon --> */}
//               {/* <img src="path_to_send_icon.png" alt="Send"> */}
//             </button>
//           </div>
//           <p class="disclaimer">The output from AI models can have mistakes. Consider checking important information.</p>
//         </div>
//           {/* <textarea
//             id="userInput"
//             value={userQuery}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Ask Anything..."
//           ></textarea> */}
//           {/* <button type="submit">Submit</button> */}
//         {/* </InputArea> */}
//       </form>
//     </>
//   );
// }

// //   return (
// //     <>
// //       <Navbar />
// //       <Query />
// //     </>
// //     );
// // }


// export default Chat;