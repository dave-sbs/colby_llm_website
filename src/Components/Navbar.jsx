import React, { useState, Component } from 'react';
import styled from 'styled-components';

function Navbar () {
  const [inputModel, setInputModel] = useState('MIXTRAL_8X7B_INSTRUCT_FP16');
  const modelList = ['MIXTRAL_8X7B_INSTRUCT_FP16', 'Model2', 'Model3', 'Model4', 'Model5'];

  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(100);

  const [apiKey, setApiKey] = useState('llm_api-fTpmESmiOrZLiJkwXCK8Y8Mx');


  return (
    <Container>
      <Left_buttons_container>
        <API_button>
          <button>
            {/* Key image */}
            API
          </button>
        </API_button>

        <Clear_button>
          <button>
            {/* Broom image */}
            Clear
          </button>
        </Clear_button>
      </Left_buttons_container>
      
      <Model_Selector>
      <select value={inputModel} onChange={(e) => setInputModel(e.target.value)}>
        {modelList.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
      </Model_Selector>

      <Sliders_container>
        <Temperature_slider>
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
        </Temperature_slider>

        <Length_slider>
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
        </Length_slider>

      </Sliders_container>

    </Container>

  )
}

export default Navbar;


const Container = styled.div`
  min-height: 60px;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left_buttons_container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
`

const API_button = styled.div`
  padding: 0 5px;
  margin-left: 5px;
`

const Clear_button = styled(API_button)`
  padding: 0 5px;
`

const Model_Selector = styled.div`
  padding: 0 40px;
`

const Sliders_container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50 0px;
  right: 0;
`

const Temperature_slider = styled.div`  
  padding: 0 5px;
`

const Length_slider = styled.div`
  padding: 0 7px;
`


