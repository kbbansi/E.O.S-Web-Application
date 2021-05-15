import React from 'react';
import Footer from './Footer';
import Header from "./Header";
import LoaderWrapper from "./LoaderWrapper";
import Ttpagecontent from "./Ttpagecontent";

function Home (props) {
    return (
        <React.Fragment>
            {/* <LoaderWrapper /> */}
            <Header />
            <Ttpagecontent />
            <Footer/>
        </React.Fragment>
    )
}

export default Home;