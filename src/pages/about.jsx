import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {Layout} from '../generic/base';

class About extends Component {
    
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <Layout>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>About</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <h1>Hello World from about</h1>
                
            </Layout>
        );
    }
  }
  
  export default About;