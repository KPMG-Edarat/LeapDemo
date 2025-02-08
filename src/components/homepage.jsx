import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import images
import kpmgLogo from '../assets/kpmg.svg';
import challengeIcon from '../assets/challenge.png';
import solutionIcon from '../assets/solution.png';
import impactIcon from '../assets/impact.png';
import trendIcon from '../assets/trend.png';
import backgroundImage from '../assets/backgroundwelcome.png';

const WelcomePage = () => {
  const toggleInfo = (id) => {
    const element = document.getElementById(id);
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

  const navigate = useNavigate();

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
    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Update the particle system settings
    const particles = [];
    const particleCount = 35;  // Increased slightly
    const connectionDistance = 180;  // Increased connection distance
    
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 3 + 2;
        // Brighter colors for particles
        this.color = `hsla(${210 + Math.random() * 30}, 100%, 85%, 0.9)`;
        this.glowColor = `hsla(${210 + Math.random() * 30}, 100%, 75%, 0.4)`;
      }

      draw() {
        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = this.glowColor;
        ctx.fill();

        // Middle glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Enhanced shadow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        
        // Core particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections with enhanced glow
      ctx.globalCompositeOperation = 'screen';  // Makes overlapping elements brighter
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Enhanced connection glow
            ctx.shadowBlur = 15;  // Increased blur
            ctx.shadowColor = 'rgba(147, 197, 253, 0.8)';  // Brighter shadow
            
            const opacity = 0.6 * (1 - distance/connectionDistance);  // Increased base opacity
            
            // Draw multiple lines with different colors for enhanced glow
            const colors = [
              `rgba(147, 197, 253, ${opacity})`,     // Blue
              `rgba(191, 219, 254, ${opacity * 0.8})`, // Light blue
              `rgba(96, 165, 250, ${opacity * 0.6})`   // Darker blue
            ];
            
            colors.forEach((color, index) => {
              ctx.beginPath();
              ctx.strokeStyle = color;
              ctx.lineWidth = 2 - (index * 0.5);  // Decreasing line width
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            });
          }
        }
      }
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
            background: 'linear-gradient(135deg, #0A192F 0%, #0F2547 50%, #162B4D 100%)',  // Deeper blue gradient
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
            <h1 style={{ 
              fontSize: '48px', 
              margin: 0, 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 3s infinite',
              letterSpacing: '1px'
            }}>
              Welcome to LEAP 2025 and the Future of Agentic AI
            </h1>
            <p style={{ 
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
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '40px',
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
                gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%)',  // Green gradient
                content: 'Agentic AI improves customer experience, boosts operational efficiency, and enables better decision-making. Its scalable deployment reduces costs while supporting growth....'
              }
            ].map((item) => (
              <div key={item.id} style={{
                background: item.gradient,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
                color: 'white',
                padding: '30px',
                borderRadius: '15px',
                cursor: 'pointer',
                width: '33%',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  onClick={() => toggleInfo(item.id)}
                  style={{ width: '80px', cursor: 'pointer' }}
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
            marginTop: '30px', 
            marginBottom: '80px',
            textAlign: 'center' 
          }}>
            <button 
              onClick={() => navigate('/leap')}
              style={{
                background: 'linear-gradient(135deg, #0091DA 0%, #006B9F 100%)',
                color: 'white',
                padding: '15px 40px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '20px',
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
            position: 'fixed',
            bottom: '80px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.03)',  // Very subtle white background
            backdropFilter: 'blur(10px)',
            padding: '30px 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #A7A8AA 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 1s ease-out'
            }}>
              <img 
                src={trendIcon} 
                alt="Trend Icon" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  marginRight: '15px',
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
                animation: 'scroll 60s linear infinite',
              }}>
                {[...trends, ...trends].map((trend, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      padding: '15px 25px',
                      margin: '0 15px',
                      borderRadius: '8px',
                      fontSize: '18px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.3) 100%)'
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

          <style>
            {`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}
          </style>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;