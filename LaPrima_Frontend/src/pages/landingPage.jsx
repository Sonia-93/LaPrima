import './landingPage.css'
import logo from "../logo.svg"
import building from "../building.svg"
import coffee from "../sonia.svg"
import handshake from "../handshake.svg"
import menu from "../menu.svg";
import rocket from "../rocket.svg";
import register from "../register.svg";
import dashboardIcon from "../lucide_layout-dashboard.svg";
import callingIcon from "../calling.svg";
import locationIconAsset from "../location.svg";
import mobileIcon from "../heroicons-outline_device-phone-mobile.svg";
import searchIcon from "../heroicons-outline_search.svg";
import mailIcon from "../mail.svg";
import landing1 from '../landing1.jpeg';
import landing2 from '../landing2.jpeg';
import landing3 from '../landing3.jpeg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { LuCoffee, LuStore, LuSparkles } from 'react-icons/lu';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const HERO_IMAGES = [
    {
        src: landing1,
        Icon: LuCoffee,
        title: 'Coffee First',
        desc: 'La Prima helps you start every morning — manage orders, menus, and loyal regulars in one place.',
    },
    {
        src: landing2,
        Icon: LuStore,
        title: 'Grow Your Shop',
        desc: 'Put your coffee shop on the map. Reach new customers and build your community online.',
    },
    {
        src: landing3,
        Icon: LuSparkles,
        title: 'Sip & Savor',
        desc: 'Discover curated menus, order ahead, and connect with the coffee lovers who matter most.',
    },
];
const POSITION_CLASSES = ['card-front', 'card-middle', 'card-back'];

function HeroImageStack() {
    const [order, setOrder] = useState([0, 1, 2]);
    const intervalRef = useRef(null);

    const rotateForward = useCallback(() => {
        setOrder((prev) => [prev[1], prev[2], prev[0]]);
    }, []);

    const resetAutoRotate = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(rotateForward, 5000);
    }, [rotateForward]);

    useEffect(() => {
        resetAutoRotate();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [resetAutoRotate]);

    const handleImageClick = (position) => {
        if (position === 0) return;
        setOrder((prev) => {
            if (position === 1) return [prev[1], prev[0], prev[2]];
            return [prev[2], prev[0], prev[1]];
        });
        resetAutoRotate();
    };

    return (
        <div className="hero-stacked-cards">
            {order.map((imgIndex, position) => {
                const slide = HERO_IMAGES[imgIndex];
                const SlideIcon = slide.Icon;
                return (
                <div
                    key={imgIndex}
                    className={`stacked-card-wrapper ${POSITION_CLASSES[position]}${position !== 0 ? ' stacked-card-clickable' : ''}`}
                    onClick={() => handleImageClick(position)}
                >
                    <img
                        src={slide.src}
                        alt={`Coffee shop ${imgIndex + 1}`}
                        className="stacked-card"
                    />
                    {position === 0 && (
                        <div className="stacked-card-overlay">
                            <div className="stacked-card-overlay-header">
                                <span className="stacked-card-icon">
                                    <SlideIcon aria-hidden />
                                </span>
                                <span className="stacked-card-title">{slide.title}</span>
                            </div>
                            <p className="stacked-card-desc">{slide.desc}</p>
                        </div>
                    )}
                </div>
                );
            })}
        </div>
    );
}

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="landing-page">

            {/* ══════════════════════════════
                DARK HERO SECTION
            ══════════════════════════════ */}
            <div className="hero-section">

                {/* Navbar */}
                <div className="landing-navbar">
                    <img src={logo} alt="logo" className='logo-image' />
                    <div className="navbar-right">
                        <nav className="navbar-links">
                            <a href="#about">About</a>
                            <a href="#how-it-works">How it works</a>
                            <a href="#features">Features</a>
                            <a href="#testimonials">Testimonials</a>
                        </nav>
                        <button className="navbar-join-btn" onClick={() => navigate('/signup')}>Join Us</button>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="landing-content">
                    <div className="left">
                        <div className="landing-page-container">
                            <div className="line-decoration"></div>
                            <p className="landing-page-subtitle">THE COFFEE SHOP PLATFORM</p>
                        </div>
                        <h1 className="landing-page-title">Where Every</h1>
                        <h1 className="landing-page-subtitle-coffee">Coffee Shop</h1>
                        <h1 className="landing-page-subtitle-secondary">Thrives Online</h1>
                        <p className="landing-page-description">
                            La Prima connects coffee shop owners with their customers.
                            Register your shop, manage your menu, track orders, and
                            grow your community — all in one elegant platform.
                        </p>
                        <div className="landing-buttons">
                            <button className="landing-register" onClick={() => navigate('/signup')}>Register your shop</button>
                            <button className="landing-register-btn2" onClick={() => navigate('/#how-it-works')}>See how it works</button>
                        </div>

                        <div className="hero-stats">
                            <div className="hero-stat-item">
                                <span className="hero-stat-num">100+</span>
                                <span className="hero-stat-label">Shops Registered</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-num">42+</span>
                                <span className="hero-stat-label">Coffee Lovers</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-num">180k+</span>
                                <span className="hero-stat-label">Orders Placed</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-num">80%</span>
                                <span className="hero-stat-label">Efficiency</span>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <HeroImageStack />
                    </div>
                </div>

            </div>
            {/* END HERO SECTION */}


            {/* ══════════════════════════════
                WHITE SECTION
            ══════════════════════════════ */}
            <div className="white-section">

                {/* ── Built For ── */}
                <div className="built-for-section" id="about">

                    <div className="built-for-left">
                        <div className="built-for-eyebrow">
                            <div className="line-decoration-dark"></div>
                            <p className="built-for-tag">BUILT FOR</p>
                        </div>
                        <h2 className="built-for-title">
                            Two Worlds,<br />
                            <span className="built-for-title-gold">One platform</span>
                        </h2>
                        <p className="built-for-desc">
                            Whether you brew the perfect espresso or simply
                            can't start your day without one, La Prima is
                            built for you.
                        </p>
                    </div>

                    <div className="built-for-right">
                        <div className="built-for-card">
                            <div className="card-header">
                                <span className="card-icon">
                                    <img src={building} alt="building" className='building-image' />
                                </span>
                                <div>
                                    <h3 className="card-title">Coffee Shop Owners</h3>
                                    <div className="card-title-underline"></div>
                                </div>
                            </div>
                            <p className="card-desc">
                                Register your shop, manage your full menu, accept online
                                orders, track daily revenue, and build a loyal local
                                following with powerful tools designed for small businesses.
                            </p>
                        </div>

                        <div className="built-for-card">
                            <div className="card-header">
                                <span className="card-icon">
                                    <img src={coffee} alt="coffee" className='coffee-image' />
                                </span>
                                <div>
                                    <h3 className="card-title">Coffee Enthusiasts</h3>
                                    <div className="card-title-underline"></div>
                                </div>
                            </div>
                            <p className="card-desc">
                                Discover curated coffee shops near you, browse menus,
                                read real reviews, save your favorites, and order ahead
                                so your cup is ready when you arrive.
                            </p>
                        </div>

                        <div className="built-for-card">
                            <div className="card-header">
                                <span className="card-icon">
                                    <img src={handshake} alt="handshake" className='handshake-image' />
                                </span>
                                <div>
                                    <h3 className="card-title">Community First</h3>
                                    <div className="card-title-underline"></div>
                                </div>
                            </div>
                            <p className="card-desc">
                                La Prima believes local coffee culture deserves a digital
                                home. We help independent shops compete, grow, and connect
                                with the people who love them most.
                            </p>
                        </div>
                    </div>

                </div>
                {/* END Built For */}


                {/* ── Process Section ── */}
                <div className="process-section" id="how-it-works">

                    <div className="process-eyebrow">
                        <div className="line-decoration-dark"></div>
                        <p className="process-tag">PROCESS</p>
                    </div>
                    <h2 className="process-title">Up and running</h2>
                    <h2 className="process-title-gold">in minutes</h2>

                    <div className="process-cards">

                        <div className="process-card">
                            <div className="process-num">1</div>
                            <div className="process-card-icon">
                               
                            </div>
                            <h3 className="process-card-title"><span>
                                 <img src={register} alt="register" className='rocket-image' />
                                  </span>  Register Your Shop</h3>
                            <p className="process-card-desc">
                                Sign Up, add your shop details, location, photos,
                                and set up your unique profile page. Quick, free,
                                no credit card needed.
                            </p>
                        </div>

                        <div className="process-card">
                            <div className="process-num">2</div>
                            <div className="process-card-icon">
                                
                            </div>
                            <h3 className="process-card-title"><span>
                                <img src={menu} alt="menu" className='rocket-image' />
                                </span>Build Your Menu</h3>
                            <p className="process-card-desc">
                                Upload your full menu with pricing, categories,
                                and beautiful photos of your drinks.
                            </p>
                        </div>

                        <div className="process-card">
                            <div className="process-num">3</div>
                            <div className="process-card-icon">
                               
                            </div>
                            <h3 className="process-card-title"><span> <img src={rocket} alt="rocket" className='rocket-image' />
                            </span>      Go Live & Grow</h3>
                            <p className="process-card-desc">
                                Start receiving orders, collect reviews, and watch
                                your customer base expand.
                            </p>
                        </div>

                    </div>

                </div>
                {/* END Process Section */}


                {/* ── Everything You Need Section ── */}
                <div className="everything-section" id="features">
                    <div className="everything-eyebrow">
                        <div className="line-decoration-dark"></div>
                        <p className="everything-tag">FEATURES</p>
                    </div>
                    <h2 className="everything-title">Everything you need to run</h2>
                    <h2 className="everything-title-gold">your Shop</h2>

                    <div className="everything-cards">
                        <div className="everything-card card-real-time">
                            <div className="real-time-content">
                                <div className="card-header-horizontal">
                                    <img src={dashboardIcon} alt="dashboard" className='feature-icon-small' />
                                    <h3 className="everything-card-title-horizontal">Real-Time dashboard</h3>
                                </div>
                                <p className="everything-card-desc">
                                    Track your daily sales, popular items, peak hours, and customer trends from a single beautiful dashboard. Know your business inside out.
                                </p>
                                <button className="view-dashboard-btn" onClick={() => navigate('/dashboard')}>View dashboard &rarr;</button>
                            </div>
                            <div className="today-overview-box">
                                <h4 className="today-overview-title">TODAY'S OVERVIEW</h4>
                                <div className="overview-item">
                                    <div className="overview-text">
                                        <span className="overview-name">Expresso</span>
                                        <span className="overview-value">148 orders</span>
                                    </div>
                                    <div className="overview-line stroke-100"></div>
                                </div>
                                <div className="overview-item">
                                    <div className="overview-text">
                                        <span className="overview-name">Latte</span>
                                        <span className="overview-value">98 orders</span>
                                    </div>
                                    <div className="overview-line stroke-60"></div>
                                </div>
                                <div className="overview-item">
                                    <div className="overview-text">
                                        <span className="overview-name">Cappuccino</span>
                                        <span className="overview-value">71 orders</span>
                                    </div>
                                    <div className="overview-line stroke-40"></div>
                                </div>
                                <div className="overview-revenue">
                                    <span className="revenue-label">Revenue today</span>
                                    <span className="revenue-value">1,984$</span>
                                </div>
                            </div>
                        </div>

                        <div className="everything-card">
                            <div className="card-header-horizontal">
                                <img src={searchIcon} alt="discovery" className='feature-icon-small' />
                                <h3 className="everything-card-title-horizontal">Shop Discovery</h3>
                            </div>
                            <p className="everything-card-desc-mt">
                                Customers find you on our city map, browse your menu, and fall in love with your brand before even walking in.
                            </p>
                        </div>

                        <div className="everything-card">
                            <div className="card-header-horizontal">
                                <img src={mobileIcon} alt="orders" className='feature-icon-small mobile-tall' />
                                <h3 className="everything-card-title-horizontal">Order Management</h3>
                            </div>
                            <p className="everything-card-desc-mt">
                                Receive and manage orders in real time. Customers order ahead, you brew on time — zero wasted cups.
                            </p>
                        </div>

                        <div className="everything-card">
                            <div className="card-header-horizontal">
                                <FaStar className="feature-icon-small star-gold-react" aria-hidden />
                                <h3 className="everything-card-title-horizontal">Reviews & Loyalty</h3>
                            </div>
                            <p className="everything-card-desc-mt">
                                Build trust with verified reviews, reward your regulars with loyalty points, and turn one-time visitors into regulars.
                            </p>
                        </div>
                    </div>

                </div>
                {/* END Everything You Need Section */}


                {/* ── Testimonials Section ── */}
                <div className="testimonials-section" id="testimonials">
                    <div className="testimonials-eyebrow">
                        <div className="line-decoration-dark"></div>
                        <p className="testimonials-tag">TESTIMONIALS</p>
                    </div>
                    <h2 className="testimonials-title">What shop Owners</h2>
                    <h2 className="testimonials-title-gold">are saying</h2>

                    <div className="testimonials-cards">
                        <div className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="star-icon-react" aria-hidden />
                                ))}
                            </div>
                            <p className="testimonial-quote">
                                "La Prima transformed how I run my shop. The dashboard alone saved me hours every week. My regulars love ordering ahead."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar-icon">
                                    <FaUserCircle aria-hidden />
                                </div>
                                <div className="author-info">
                                    <h4 className="author-name">Hope KEZA</h4>
                                    <p className="author-shop">Owner, Café Lumière</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="star-icon-react" aria-hidden />
                                ))}
                            </div>
                            <p className="testimonial-quote">
                                "Within a month of joining, my shop's online visibility doubled. New customers literally say they found me on La Prima."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar-icon">
                                    <FaUserCircle aria-hidden />
                                </div>
                                <div className="author-info">
                                    <h4 className="author-name">Jessy Hales</h4>
                                    <p className="author-shop">Owner, Brew & Co.</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-stars">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="star-icon-react" aria-hidden />
                                ))}
                            </div>
                            <p className="testimonial-quote">
                                "The menu builder is so simple. I updated our seasonal drinks in 5 minutes. My customers got notified automatically — brilliant."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar-icon">
                                    <FaUserCircle aria-hidden />
                                </div>
                                <div className="author-info">
                                    <h4 className="author-name">Moran Russel</h4>
                                    <p className="author-shop">Owner, The Daily Grind</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END Testimonials Section */}


                {/* ── CTA Section ── */}
                <div className="cta-section">
                    <div className="cta-content">
                        <h2 className="cta-title">Your shop deserves a</h2>
                        <h2 className="cta-title-gold">premier presence</h2>
                        <p className="cta-description">
                            Join thousands of coffee shop owners who have transformed their business with La Prima.
                            Start your free trial today and see the difference.
                        </p>
                    <div className="cta-buttons">
                            <button className="cta-primary-btn" onClick={() => navigate('/signup')}>Register Your Shop-Free</button>
                            <button className="cta-secondary-btn" onClick={() => navigate('/explore')}>Explore Shops</button>
                        </div>
                    </div>
                </div>
                {/* END CTA Section */}


                {/* ── Subscribe Section ── */}
                <div className="subscribe-section">
                    <div className="subscribe-content">
                        <div className="subscribe-left">
                            <img src={logo} alt="logo" className='subscribe-logo' />
                        </div>
                        <div className="subscribe-center">
                            <h3 className="subscribe-title">Subscribe now</h3>
                        </div>
                        <div className="subscribe-right">
                            <input type="email" placeholder="Your email" className="subscribe-input" />
                            <button className="subscribe-btn">Subscribe</button>
                        </div>
                    </div>
                </div>
                {/* END Subscribe Section */}
            </div>
            {/* END WHITE SECTION */}


            {/* ══════════════════════════════
                FOOTER SECTION
            ══════════════════════════════ */}
            <div className="footer-section">
                <div className="footer-content">
                    <div className="footer-left">
                        <img src={logo} alt="logo" className='footer-logo' />
                        <p className="footer-tagline">
                            The platform where coffee shop culture meets the digital world. Connecting owners and lovers of great coffee.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4 className="footer-column-title">PLATFORM</h4>
                            <a href="#/" className="footer-link">For shop owners</a>
                            <a href="#/" className="footer-link">For Customers</a>
                            <a href="#/" className="footer-link">Pricing</a>
                            <a href="#features" className="footer-link">Features</a>
                        </div>

                        <div className="footer-column">
                            <h4 className="footer-column-title">COMPANY</h4>
                            <a href="#about" className="footer-link">About La Prima</a>
                            <a href="#/" className="footer-link">Blog</a>
                            <a href="#/" className="footer-link">Careers</a>
                            <a href="#/" className="footer-link">Press</a>
                        </div>

                        <div className="footer-column">
                            <h4 className="footer-column-title">SUPPORT</h4>
                            <a href="#/" className="footer-link">Help Center</a>
                            <a href="#/" className="footer-link">Contact Us</a>
                            <a href="#/" className="footer-link">Privacy Policy</a>
                            <a href="#/" className="footer-link">Terms</a>
                        </div>

                        <div className="footer-column contacts-col">
                            <h4 className="footer-column-title">CONTACTS</h4>
                            <p className="footer-contact-item"><img src={locationIconAsset} className="footer-contact-icon" alt="" /> Muhanga, Rwanda</p>
                            <p className="footer-contact-item"><img src={callingIcon} className="footer-contact-icon" alt="" /> 07832862521</p>
                            <p className="footer-contact-item"><img src={mailIcon} className="footer-contact-icon" alt="" /> prisma@ac.rw</p>
                            <div className="footer-social">
                                <a href="#/" className="social-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                                <a href="#/" className="social-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                                <a href="#/" className="social-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                                <a href="#/" className="social-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-wrapper">
                    <div className="footer-bottom">
                        <p className="footer-copyright">© 2026 La Prima. All rights are reserved</p>
                        <p className="footer-madein">Made in La Prima for coffee lovers everywhere</p>
                    </div>
                </div>
            </div>
            {/* END FOOTER SECTION */}


        </div>
        /* END landing-page */
    )
}

export default LandingPage

