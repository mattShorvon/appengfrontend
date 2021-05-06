import React from 'react';
import { Layout } from "./Layout.js";
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components'; 
import Image2 from '../Photos/pexels-matt-hardy-3560139.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${Image2}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 300px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;
//need to query which website it is

function Core({ websitename }) {
    
    return (
        <>
        <Styles>
        <Jumbo fluid className="jumbo">
          <Layout>
          <div className="overlay"></div>
            <Container>
                <h1>Welcome to {websitename}!</h1>
                <p>use the navigation bar at the top of the screen to find your way around
                    To get started, click 'On Sale' to find out the products we have for you!
                </p>
            </Container>
        </Layout>
        </Jumbo>
        </Styles>
        </>
    );
}

export default Core;
