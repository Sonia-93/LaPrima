import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import loginImg from '../login_image.jpeg';
import signupImg from '../signup_image.jpeg';
import userAvatar from '../👩.svg';

const slides = [
    {
        image: loginImg,
        title: "Made for\nCoffee Lovers\nEverywhere",
        subtitle: "Register your shop, manage menus, accept orders, and connect with your community — all in one beautiful place.",
        testimonial: {
            text: `"La Prima put my little coffee shop on the map. I had new customers within the first week of joining."`,
            name: "Hope Keza",
            role: "Owner, Café Lumière · Kigali"
        }
    },
    {
        image: signupImg,
        title: "Make yourcoffee shop grow\nwith la Prima",
        subtitle: "From your first espresso to your thousandth loyal customer — La Prima is where great coffee shops become legendary.",
        testimonial: null
    }
];

function AuthCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 7000); // Transitions every 7 seconds

        return () => clearInterval(interval);
    }, []);

    const slide = slides[currentSlide];

    return (
        <div className="auth-left">
            <img src={logo} alt="La Prima Logo" className="auth-logo" />
            
            <div className="carousel-background" style={{ backgroundImage: `url(${slide.image})` }}></div>

            <div className="carousel-overlay">
                
                <div className="carousel-top-text">
                    <span className="carousel-line"></span>
                    <span className="carousel-top-title">THE COFFEE SHOP PLATFORM</span>
                </div>

                <div className="carousel-main-content">
                    <h1 className="carousel-title" style={{ whiteSpace: 'pre-wrap' }}>
                        {currentSlide === 0 ? (
                            <>
                                Made for <br/>
                                <span className="carousel-title-gold" style={{ fontFamily: '"Jim Nightshade", cursive' }}>Coffee Lovers</span><br/>
                                Everywhere
                            </>
                        ) : (
                            <>
                                Make yourcoffee shop grow<br/>
                                <span className="carousel-title-gold" style={{ fontFamily: '"Jim Nightshade", cursive' }}>with la Prima</span>
                            </>
                        )}
                    </h1>
                    <p className="carousel-subtitle">
                        {slide.subtitle}
                    </p>

                    {slide.testimonial && (
                        <div className="carousel-testimonial">
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">{slide.testimonial.text}</p>
                            <div className="testimonial-author-block">
                                <img src={userAvatar} alt="Hope Keza" className="testimonial-avatar" />
                                <div>
                                    <div className="testimonial-name">{slide.testimonial.name}</div>
                                    <div className="testimonial-role">{slide.testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination Indicators */}
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <div 
                            key={index} 
                            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AuthCarousel;
