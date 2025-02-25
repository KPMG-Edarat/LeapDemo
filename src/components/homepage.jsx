import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import images
import kpmgLogo from '../assets/kpmg.svg';
import challengeIcon from '../assets/challenge.png';
import solutionIcon from '../assets/solution.png';
import impactIcon from '../assets/impact.png';
import trendIcon from '../assets/trend.png';
import backgroundImage from '../assets/backgroundwelcome.png';

const WelcomePage = ({ onNavigate }) => {
  const toggleInfo = (id) => {
    const element = document.getElementById(id);
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

  // Duplicate array for continuous scrolling effect
  const trends = [
    'Autonomous Decision-Making with Agentic AI',
    'Context-Aware AI Systems',
    'Resource-Efficient AI Solutions',
    'Self-Learning & Continuous Improvement in AI',
    'Multi-Modal AI Capabilities',
    'AI for Task-Oriented Automation',
    'Scalable & Cost-Effective AI Deployment',
    'Enhanced Human-AI Collaboration',
    'Ethical AI and Transparency',
    'Data-Driven Predictive Insights with Agentic AI',
    'AI for Dynamic Problem Solving',
    'Real-Time AI Feedback and Adaptation',
    'Intelligent Virtual Assistants powered by Agentic AI',
    'AI for Personalized User Experiences',
    'Autonomous Workflow Automation'
  ];

  // Update the particle animation code
  useEffect(() => {
    const canvas = document.getElementById('tech-background');
    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true // Reduce latency
    });
    
    // Use offscreen canvas for better performance
    const offscreen = new OffscreenCanvas(window.innerWidth, window.innerHeight);
    const offscreenCtx = offscreen.getContext('2d', { alpha: false });
    
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      offscreen.width = displayWidth;
      offscreen.height = displayHeight;
    };
    setCanvasSize();

    // Throttle resize event with RAF
    let resizeRequestId;
    window.addEventListener('resize', () => {
      if (!resizeRequestId) {
        resizeRequestId = requestAnimationFrame(() => {
          setCanvasSize();
          resizeRequestId = null;
        });
      }
    });

    // Update particle count and connection distance based on screen size
    const getParticleSettings = () => {
      const width = window.innerWidth;
      if (width < 768) {
        return {
          count: Math.min(30, Math.floor(width / 50)),
          distance: Math.min(150, width / 8)
        };
      }
      return {
        count: Math.min(40, Math.floor(width / 50)),
        distance: Math.min(180, width / 8)
      };
    };

    const settings = getParticleSettings();
    const particleCount = settings.count;
    const connectionDistance = settings.distance;
    const connectionDistanceSquared = connectionDistance * connectionDistance;
    
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * offscreen.width;
        this.y = Math.random() * offscreen.height;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.radius = Math.random() * 2 + 2;
        this.initialRadius = this.radius;
        this.glowSize = this.radius * 4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Pulse the radius for a subtle animation
        this.radius = this.initialRadius + Math.sin(Date.now() * 0.003) * 0.5;

        const padding = connectionDistance;
        if (this.x < -padding) this.x = offscreen.width + padding;
        else if (this.x > offscreen.width + padding) this.x = -padding;
        if (this.y < -padding) this.y = offscreen.height + padding;
        else if (this.y > offscreen.height + padding) this.y = -padding;
      }
    }

    // Pre-create particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let lastTime = 0;
    const fps = 30; // Limit FPS
    const frameInterval = 1000 / fps;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        
        offscreenCtx.clearRect(0, 0, offscreen.width, offscreen.height);
        
        // Draw connections with glow
        offscreenCtx.strokeStyle = 'rgba(147, 197, 253, 0.4)';
        offscreenCtx.lineWidth = 1.8;
        offscreenCtx.shadowBlur = 8;
        offscreenCtx.shadowColor = 'rgba(147, 197, 253, 0.6)';

        // Update and draw particles
        particles.forEach(particle => {
          particle.update();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSquared = dx * dx + dy * dy;

            if (distSquared < connectionDistanceSquared) {
              const alpha = 1 - (Math.sqrt(distSquared) / connectionDistance);
              offscreenCtx.strokeStyle = `rgba(147, 197, 253, ${alpha * 0.4})`;
              offscreenCtx.beginPath();
              offscreenCtx.moveTo(p1.x, p1.y);
              offscreenCtx.lineTo(p2.x, p2.y);
              offscreenCtx.stroke();
            }
          }
        }

        // Draw particles with glow
        particles.forEach(particle => {
          // Draw glow
          const gradient = offscreenCtx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.glowSize
          );
          gradient.addColorStop(0, 'rgba(147, 197, 253, 0.4)');
          gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
          
          offscreenCtx.fillStyle = gradient;
          offscreenCtx.beginPath();
          offscreenCtx.arc(particle.x, particle.y, particle.glowSize, 0, Math.PI * 2);
          offscreenCtx.fill();

          // Draw particle
          offscreenCtx.fillStyle = 'rgba(147, 197, 253, 0.8)';
          offscreenCtx.beginPath();
          offscreenCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          offscreenCtx.fill();
        });

        // Copy to main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreen, 0, 0);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeRequestId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes glow {
            0% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
            50% { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
            100% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
          }

          @keyframes slideIn {
            from { transform: translateX(-50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @media (max-width: 768px) {
            .animate-slide-up {
              animation: slideUp 0.6s ease-out forwards;
            }
            
            .animate-fade-in {
              animation: fadeIn 0.6s ease-out forwards;
            }
          }

          @media (max-width: 480px) {
            * {
              font-size: 95%;
            }
          }

          @media (max-width: 1200px) and (max-height: 600px) {
            .main-title {
              font-size: 32px !important;
              margin-top: 60px !important;
            }

            .subtitle {
              font-size: 18px !important;
              margin-top: 10px !important;
            }

            .box-container {
              margin-top: 15px !important;
              gap: 15px !important;
            }

            .info-box {
              padding: 15px !important;
            }

            .info-box img {
              width: 50px !important;
            }

            .info-box h2 {
              font-size: 20px !important;
              margin: 10px 0 5px 0 !important;
            }

            .trends-container {
              bottom: 40px !important;
              height: 100px !important;
              padding: 10px 0 !important;
            }

            .trends-title {
              font-size: 16px !important;
              margin-bottom: 5px !important;
            }

            .trend-item {
              padding: 8px 15px !important;
              font-size: 14px !important;
            }

            .start-button {
              margin-bottom: 120px !important;
              padding: 10px 25px !important;
              font-size: 16px !important;
            }
          }
        `}
      </style>
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}>
        {/* Update the canvas background */}
        <canvas
          id="tech-background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: `radial-gradient(circle at 50% 50%, 
              #162B4D 0%, 
              #0F2547 40%, 
              #0A192F 100%
            ), 
            linear-gradient(135deg, 
              rgba(10, 25, 47, 0.95) 0%, 
              rgba(15, 37, 71, 0.95) 50%, 
              rgba(22, 43, 77, 0.95) 100%
            )`,  // Combined radial and linear gradient
          }}
        />

        {/* Update the main content div */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: '"Calibri", Arial, sans-serif',
          minHeight: '100vh',
          width: '100vw',
          overflow: 'hidden',
          padding: '0 20px', // Add padding for small screens
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            padding: '20px 40px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10
          }}>
            <img src={kpmgLogo} alt="KPMG Logo" style={{ height: '60px', marginRight: '15px' }} />
          </div>

          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            marginTop: '120px',
            width: '90%',
            maxWidth: '1400px',
            animation: 'fadeIn 1s ease-out'
          }}>
            <h1 className="main-title" style={{ 
              fontSize: window.innerWidth < 768 ? '32px' : '48px', // Smaller font on mobile
              margin: '0 auto',
              maxWidth: '90%', // Limit width on large screens
              padding: '0 10px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 3s infinite',
              letterSpacing: '1px',
              textAlign: 'center'
            }}>
              Welcome to the Future of Agentic AI
            </h1>
            <p className="subtitle" style={{ 
              fontSize: '24px', 
              marginTop: '20px', 
              lineHeight: 1.5,
              color: '#e0e7ff',
              animation: 'fadeIn 1s ease-out 0.5s both',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Experience the next wave of artificial intelligence, brought to you by{' '}
              <strong style={{ 
                color: '#fff',
                borderBottom: '2px solid #0091DA',
                padding: '0 4px',
                transition: 'all 0.3s ease'
              }}>KPMG</strong>
            </p>
          </div>

          <div style={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: window.innerWidth < 1024 ? 'column' : 'row', // Stack on mobile
            justifyContent: 'center',
            gap: window.innerWidth < 1024 ? '20px' : '40px',
            width: '90%',
            maxWidth: '1400px'
          }}>
            {[
              { 
                icon: challengeIcon, 
                title: 'Challenge', 
                id: 'challenge',
                gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.2) 100%)',  // Indigo gradient
                content: 'Generative AI struggles with data limitations, needing vast datasets and high-performance GPUs. It operates reactively, generates inaccurate information, and lacks long-term memory and adaptability....'
              },
              { 
                icon: solutionIcon, 
                title: 'Solution', 
                id: 'solution',
                gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 100%)',  // Blue gradient
                content: 'Agentic AI plans and executes tasks autonomously, adapts dynamically, and completes workflows efficiently. It reduces GPU dependency, evolves through user feedback, and supports multi-modal data processing....'
              },
              { 
                icon: impactIcon, 
                title: 'Impact', 
                id: 'impact',
                gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 100%)',  // Changed to match Solution's blue gradient
                content: 'Agentic AI improves customer experience, boosts operational efficiency, and enables better decision-making. Its scalable deployment reduces costs while supporting growth....'
              }
            ].map((item) => (
              <div key={item.id} style={{
                background: item.gradient,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
                color: 'white',
                padding: window.innerWidth < 768 ? '20px' : '30px',
                borderRadius: '15px',
                cursor: 'pointer',
                width: window.innerWidth < 1024 ? '100%' : '33%', // Full width on mobile
                minWidth: window.innerWidth < 1024 ? 'auto' : '300px',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: 'translateY(0)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
                  background: item.gradient.replace('0.1', '0.15').replace('0.2', '0.25'), // Slightly stronger gradient on hover
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }
              }}>
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  onClick={() => toggleInfo(item.id)}
                  style={{ 
                    width: '80px', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
                <h2 style={{ 
                  margin: '20px 0 10px 0', 
                  fontSize: '28px',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                  }
                }}>{item.title}</h2>
                <p id={item.id} style={{ 
                  display: 'none', 
                  fontSize: '18px', 
                  marginTop: '15px', 
                  lineHeight: '1.6',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'all 0.5s ease',
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            position: 'fixed',
            bottom: window.innerWidth < 768 ? '60px' : '80px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            padding: window.innerWidth < 768 ? '15px 0' : '30px 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
            height: window.innerWidth < 768 ? '120px' : window.innerWidth < 1024 ? '150px' : '180px',
            overflow: 'hidden',
            zIndex: 1
          }}>
            <div style={{
              fontSize: window.innerWidth < 768 ? '18px' : '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #A7A8AA 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: window.innerWidth < 768 ? '10px' : '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 1s ease-out'
            }}>
              <img 
                src={trendIcon} 
                alt="Trend Icon" 
                style={{ 
                  width: window.innerWidth < 768 ? '24px' : '32px', 
                  height: window.innerWidth < 768 ? '24px' : '32px', 
                  marginRight: '10px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }} 
              /> 
              Key Trends in Agentic AI
            </div>
            <div style={{ 
              position: 'relative', 
              overflow: 'hidden',
              padding: '0 20px'  // Added padding for better spacing
            }}>
              <div style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                animation: 'scroll 30s linear infinite', // Changed from 45s to 30s for faster scrolling
              }}>
                {[...trends, ...trends].map((trend, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      padding: window.innerWidth < 768 ? '10px 15px' : '15px 25px',
                      margin: window.innerWidth < 768 ? '0 8px' : '0 15px',
                      borderRadius: '8px',
                      fontSize: window.innerWidth < 768 ? '14px' : '18px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.05)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.4) 100%)'
                      }
                    }}
                  >
                    {trend}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '30px',
            marginBottom: window.innerWidth < 768 ? '150px' : '200px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            <button 
              onClick={() => onNavigate('leap')}
              className="start-button"
              style={{
                background: 'linear-gradient(135deg, #0091DA 0%, #006B9F 100%)',
                color: 'white',
                padding: window.innerWidth < 768 ? '12px 30px' : '15px 40px',
                border: 'none',
                borderRadius: '8px',
                fontSize: window.innerWidth < 768 ? '18px' : '20px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                  background: 'linear-gradient(135deg, #007bb8 0%, #005a8c 100%)'
                }
              }}
            >
              Start
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(180deg, #001F3F 0%, #00274d 100%)',
            color: '#fff',
            fontSize: '14px',
            padding: '12px 0',
            textAlign: 'center',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            letterSpacing: '1px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(180deg, #002952 0%, #003366 100%)',
              textShadow: '0 2px 4px rgba(0,0,0,0.4)'
            }
          }}>
            Powered by KPMG
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;