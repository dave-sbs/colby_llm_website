import React, { useState, Component } from 'react';
import styled from 'styled-components';

function Query () {
    const [userQuery, setQuery] = useState('');

    return(
        <Container>
            <Search_area>
                <Search_bar>
                    <textarea
                        id="userInput"
                        type="text"
                        value={userQuery}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask Anything..."
                    ></textarea>
                </Search_bar>
                
                <Search_button>
                    <button type="submit">Submit</button>
                </Search_button>

                <Warning_text>

                </Warning_text>
            </Search_area>

            <Help_area>
                

            </Help_area>
        </Container>
    )
}

export default Query;

const Container = styled.div`
    min-height: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Search_area = styled.div`
    display: flex;
    align-items: center;
`

const Search_bar = styled.div``

const Search_button = styled.div``

const Warning_text = styled.div``

const Help_area = styled.div``