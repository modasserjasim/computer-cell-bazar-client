import React from 'react';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts';
import Categories from '../Categories/Categories';
import Hero from '../Hero/Hero';
import Newsletter from '../Newsletter/Newsletter';
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <AdvertisedProducts></AdvertisedProducts>
            <Categories></Categories>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;