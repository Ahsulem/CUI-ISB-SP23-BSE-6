import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ErrorPage.css';

/**
 * ErrorPage Component
 * Displays a generic error page when user hits an invalid path or server error occurs
 * Gen-Z styled with animated sad scholar avatar
 */
const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [glitchText, setGlitchText] = useState(false);
    
    // Extract error details from query params or location state
    const searchParams = new URLSearchParams(location.search);
    const errorCode = searchParams.get('code') || location.state?.code || 404;
    const errorMessage = searchParams.get('message') || location.state?.message || getDefaultMessage(errorCode);

    // Glitch effect interval
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchText(true);
            setTimeout(() => setGlitchText(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    function getDefaultMessage(code) {
        const messages = {
            400: "Bruh... the server didn't get what you meant 💀",
            401: "You're not logged in bestie, can't let you in 🚫",
            403: "No cap, you don't have permission for this 🙅‍♂️",
            404: "This page said 'aight imma head out' 👻",
            500: "Server's having a mental breakdown rn fr fr 😭",
            502: "The gateway said 'nah' and dipped 🏃‍♂️",
            503: "Server went on a mental health break, slay 💅",
        };
        return messages[code] || "Something's not passing the vibe check 😬";
    }

    function getGenZTitle(code) {
        const titles = {
            400: "That ain't it chief 😵",
            401: "Who dis? 🤨",
            403: "Access Denied Bestie 🚷",
            404: "It's Giving... Nothing 💨",
            500: "Server's in its Flop Era 📉",
            502: "Gateway Failed the Vibe Check 🚪",
            503: "Server's Ghosting You 👻",
        };
        return titles[code] || "Big Yikes Energy 😬";
    }

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="error-page">
            {/* Floating emojis background */}
            <div className="floating-emojis">
                <span className="float-emoji">💀</span>
                <span className="float-emoji">😭</span>
                <span className="float-emoji">📚</span>
                <span className="float-emoji">😵</span>
                <span className="float-emoji">🎓</span>
                <span className="float-emoji">📖</span>
            </div>

            <div className="error-container">
                {/* Animated Sad Scholar Avatar */}
                <div className="scholar-avatar">
                    <div className="scholar-body">
                        {/* Graduation Cap */}
                        <div className="grad-cap">
                            <div className="cap-top"></div>
                            <div className="cap-base"></div>
                            <div className="tassel"></div>
                        </div>
                        
                        {/* Face */}
                        <div className="scholar-face">
                            {/* Glasses */}
                            <div className="glasses">
                                <div className="lens left-lens"></div>
                                <div className="lens right-lens"></div>
                                <div className="bridge"></div>
                            </div>
                            
                            {/* Sad Eyes with tears */}
                            <div className="eyes">
                                <div className="eye left-eye">
                                    <div className="pupil"></div>
                                    <div className="tear"></div>
                                </div>
                                <div className="eye right-eye">
                                    <div className="pupil"></div>
                                    <div className="tear tear-delay"></div>
                                </div>
                            </div>
                            
                            {/* Sad Mouth */}
                            <div className="sad-mouth"></div>
                            
                            {/* Blush */}
                            <div className="blush left-blush"></div>
                            <div className="blush right-blush"></div>
                        </div>
                        
                        {/* Books */}
                        <div className="fallen-books">
                            <div className="book book1">📕</div>
                            <div className="book book2">📗</div>
                            <div className="book book3">📘</div>
                        </div>
                    </div>
                </div>

                {/* Error Code with Glitch Effect */}
                <div className={`error-code-wrapper ${glitchText ? 'glitch' : ''}`}>
                    <span className="error-code" data-text={errorCode}>{errorCode}</span>
                </div>
                
                <h1 className="error-title">{getGenZTitle(parseInt(errorCode))}</h1>
                
                <p className="error-message">{errorMessage}</p>
                
                <div className="error-vibes">
                    <span className="vibe-check">✨ Vibe Status: Not Found ✨</span>
                </div>
                
                <div className="error-details">
                    <p className="error-path">
                        <span className="detail-emoji">🔗</span> 
                        <strong>Lost at:</strong> {location.pathname}
                    </p>
                    <p className="error-timestamp">
                        <span className="detail-emoji">⏰</span>
                        <strong>When it flopped:</strong> {new Date().toLocaleString()}
                    </p>
                </div>
                
                <div className="error-actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleGoHome}
                    >
                        <span className="btn-emoji">🏠</span> Take Me Home
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleGoBack}
                    >
                        <span className="btn-emoji">↩️</span> Go Back Bestie
                    </button>
                </div>
                
                <div className="error-help">
                    <p>Still stuck? No worries, it's not a you problem 💅</p>
                    <p className="help-subtext">fr fr, contact support if this keeps happening</p>
                </div>

                {/* Decorative elements */}
                <div className="sparkles">
                    <span className="sparkle">✨</span>
                    <span className="sparkle">💫</span>
                    <span className="sparkle">⭐</span>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
