"use client"
import { useState, useEffect } from 'react';

// Define types for location coordinates
interface LocationCoords {
  lat: number;
  lng: number;
}

export default function VitMap() {
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationError, setLocationError] = useState<string>('');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');

  // VIT Chennai coordinates
  const vitLocation = {
    lat: 12.8406,
    lng: 80.1534,
    address: "VIT Chennai, Vandalur - Kelambakkam Road, Chennai, Tamil Nadu 600127, India"
  };

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported');
      setLocationPermission('denied');
      return;
    }

    // Immediately request location to trigger browser permission prompt
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError('');
        setLocationPermission('granted');
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        setLocationError('Location access denied');
        setLocationPermission('denied');
      }
    );
  };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const requestLocationAccess = () => {
    setLocationPermission('checking');
    // Force a new location request to trigger permission prompt again
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
          setLocationPermission('granted');
        },
        
        
      );
    }
  };

  const handleGetDirections = () => {
    const destination = `${vitLocation.lat},${vitLocation.lng}`;
    let url;

    if (userLocation) {
      // If we have user location, create directions from current location
      url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destination}`;
    } else {
      // If no user location, open Google Maps with VIT as destination
      url = `https://www.google.com/maps/dir//${destination}`;
    }
  
    window.open(url, '_blank');
  };

  const openVitCampusMap = () => {
    // Open VIT Chennai campus location in Google Maps
    const url = `https://www.google.com/maps/place/VIT+Chennai/@${vitLocation.lat},${vitLocation.lng},17z`;
    window.open(url, '_blank');
  };

  return (
    <section id="vit-map" className="relative z-10 min-h-screen py-20">
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 border border-emerald-400/20 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-green-400/10 to-emerald-600/10 rounded-full animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              VENUE
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Find your way to VIT Chennai Campus
          </p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400"></div>
            <span className="text-emerald-400 font-semibold">Location & Directions</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section - Address & Directions */}
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-3">📍</div>
                <h3 className="text-2xl font-bold text-white">Address</h3>
              </div>
              
              <div className="space-y-5 text-gray-300">
                <p className="text-emerald-300 font-bold text-3xl md:text-4xl">VIT Chennai</p>
                <p className="flex items-start text-lg">
                  <span className="text-emerald-400 mr-3 mt-0">📍</span>
                  Vandalur - Kelambakkam Road
                </p>
                <p className="flex items-start text-lg">
                  <span className="text-emerald-400 mr-3 mt-0">🏙️</span>
                  Chennai, Tamil Nadu 600127
                </p>
                <p className="flex items-start text-lg">
                  <span className="text-emerald-400 mr-3 mt-0">🇮🇳</span>
                  India
                </p>
              
                {/* Location Status - Only show when access is denied */}
                {locationPermission === 'denied' && (
                  <div className="mt-6 p-4 bg-red-900/30 rounded-2xl border border-red-400/20">
                    <div className="text-red-400 text-sm mb-3">
                      <span className="text-lg mr-2">⚠️</span>
                      Location Access denied, Can&apos;t determine your current location. 
                    </div>
                    
                  </div>
                )}
              </div>
            </div>
            {/* Action Buttons anchored bottom */}
            <div className="mt-6 space-y-3">
              <button 
                onClick={handleGetDirections}
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center"
              >
                Get Directions
              </button>
            </div>
          </div>
          
          {/* Right Section - Interactive Campus Map */}
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="text-3xl mr-3">🗺️</div>
                <h3 className="text-2xl font-bold text-white">Campus Map</h3>
              </div>
            </div>
            
            {/* Map Container with Google Maps Embed */}
            <div 
              onClick={openVitCampusMap}
              className="relative h-80 bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl overflow-hidden cursor-pointer group hover:border-emerald-400/60 transition-all duration-300"
            >
              {/* Embedded Google Map */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0123456789!2d${vitLocation.lng}!3d${vitLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c1c0c0c0c0c%3A0x1234567890abcdef!2sVIT%20Chennai!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 rounded-2xl"
              />
              
              {/* Click Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-green-900/20 group-hover:from-emerald-900/40 group-hover:to-green-900/40 transition-all duration-300 flex items-center justify-center">
                <div className="bg-emerald-900/90 backdrop-blur-sm border border-emerald-400/40 rounded-xl px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white font-semibold text-sm flex items-center">
                    <span className="mr-2">🔍</span>
                    Click to open in Google Maps
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  )
}