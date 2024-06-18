import React from 'react';
import './about.css';
import mainn from './assets/ABOUT.png';

export default function About() {
  return (
    <section className="about section p-10 ml-20 bd-container flex justify-center  min-h-screen bg-white " id="about">
      <div className="text-center">
        <h2 className="text-4xl font-bold uppercase mb-6" style={{ 
          background: 'linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          STAY SAVVY
        </h2>
        <div className="about__container grid gap-6 md:grid-cols-2 items-center justify-center">
          <div className="about__data text-center md:text-left">
            <p className="about__description text-lg mb-6">
              <span className="text-2xl font-semibold">Your Savvy Home Away From Home<br /></span>
              Welcome to Stay Savvy, where we blend comfort with convenience to create your perfect getaway. Whether you're traveling for business or leisure, our thoughtfully designed spaces provide a seamless blend of modern amenities and cozy charm. Discover a new standard of hospitality that ensures your stay is both comfortable and memorable. At Stay Savvy, we pride ourselves on making you feel right at home, wherever you are
            </p>

            <div className="grid gap-4">
              <div className="card bg-gradient p-4 rounded-lg text-white">
                <span className="about__number text-4xl">05</span>
                <span className="about__achievement block">Years of Experience</span>
              </div>

              <div className="card bg-gradient p-4 rounded-lg text-white">
                <span className="about__number text-4xl">2000+</span>
                <span className="about__achievement block">bookings completed</span>
              </div>

              <div className="card bg-gradient p-4 rounded-lg text-white">
                <span className="about__number text-4xl">09</span>
                <span className="about__achievement block">Best hospitality awards</span>
              </div>
            </div>
          </div>

          <img 
            src={mainn} 
            alt="About me" 
            className="about__img w-5/6 h-5/6 mx-auto "
          />
        </div>
      </div>
    </section>
  );
}
