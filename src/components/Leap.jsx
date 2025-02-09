import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import kpmgLogo from "../assets/kpmg.svg";

const LeapAI = ({ onNavigate }) => {
    const [droppedItems, setDroppedItems] = useState([]);
    
    // Expanded list of items
    const allItems = [
        { id: 1, text: "Agentic AI can autonomously detect fraudulent transactions in financial services, reducing losses and improving security.", correct: true },
        { id: 2, text: "Agentic AI can optimize workforce scheduling in industries like retail and healthcare by predicting demand fluctuations.", correct: true },
        { id: 3, text: "Agentic AI can analyze customer feedback across multiple channels to identify emerging trends and improve product development.", correct: true },
        { id: 4, text: "AAgentic AI interacts with external tools, but traditional LLMs just generate text", correct: true },
        { id: 5, text: "Agentic AI requires Cloud infrastructure", correct: false },
        { id: 6, text: "Agentic AI follows only predefined rules, similar to traditional LLMs", correct: false }
    ];

    // Randomly select 6 items on component mount
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        // Shuffle array and take first 6 items
        const shuffledItems = [...allItems].sort(() => Math.random() - 0.5);
        setItems(shuffledItems.slice(0, 6));
    }, []);

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData("item", JSON.stringify(item));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData("item"));
        if (!droppedItems.find(d => d.id === item.id)) {
            setDroppedItems([...droppedItems, item]);
        }
    };

    // Add particle animation
    useEffect(() => {
        const canvas = document.getElementById('particles-bg');
        const ctx = canvas.getContext('2d');
        
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const particles = [];
        const particleCount = 50;  // Increased count
        const connectionDistance = 150;  // Distance for web connections
        
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;  // Slightly faster
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 3 + 2;  // Bigger particles
                this.color = `hsla(210, 100%, 95%, 0.5)`;  // Brighter color
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

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationFrameId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections first
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `hsla(210, 100%, 95%, ${0.15 * (1 - distance/connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles with glow
            particles.forEach(particle => {
                particle.update();
                
                // Add glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(147, 197, 253, 0.5)';  // Blue glow
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Reset shadow for next iteration
                ctx.shadowBlur = 0;
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
                    @keyframes slideUp {
                        from { 
                            transform: translateY(50px);
                            opacity: 0;
                        }
                        to { 
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }

                    @keyframes fadeInScale {
                        from { 
                            transform: scale(0.95);
                            opacity: 0;
                        }
                        to { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }

                    @keyframes glowPulse {
                        0% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
                        50% { text-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
                        100% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
                    }

                    .animate-slide-up {
                        animation: slideUp 0.8s ease-out;
                    }

                    .animate-fade-scale {
                        animation: fadeInScale 0.8s ease-out;
                    }

                    .animate-glow {
                        animation: glowPulse 3s infinite;
                    }
                `}
            </style>

            <div className="min-h-screen w-screen flex flex-col items-center text-white overflow-x-hidden relative">
                {/* Background with blur */}
                <div 
                    className="fixed inset-0 bg-cover bg-center bg-no-repeat blur-sm brightness-75"
                    style={{ 
                        backgroundImage: `url(${background})`,
                        zIndex: 0
                    }}
                />
                
                {/* Particles canvas */}
                <canvas
                    id="particles-bg"
                    className="fixed inset-0"
                    style={{ zIndex: 1 }}
                />

                {/* Content wrapper */}
                <div className="relative w-full flex flex-col items-center z-10">
                    {/* Header - make it full width */}
                    <div className="w-full flex justify-between items-center py-3 px-8 bg-gradient-to-r from-black/30 via-blue-900/20 to-black/30 backdrop-blur-md border-b border-white/10 shadow-lg">
                        <img src={kpmgLogo} alt="KPMG Logo" className="h-8 drop-shadow-lg" />
                        <div className="space-x-4">
                            <button 
                                className="px-6 py-3 bg-gradient-to-r from-blue-600/90 to-blue-500/90 rounded-lg text-white 
                                    hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl 
                                    font-medium text-lg backdrop-blur-sm border border-white/10" 
                                onClick={() => onNavigate('home')}
                            >
                                Home Page
                            </button>
                            <button 
                                className="px-6 py-3 bg-gradient-to-r from-blue-600/90 to-blue-500/90 rounded-lg text-white 
                                    hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl 
                                    font-medium text-lg backdrop-blur-sm border border-white/10" 
                                onClick={() => onNavigate('agentic')}
                            >
                                Use Case
                            </button>
                        </div>
                    </div>

                    {/* Rest of the content with adjusted width */}
                    <div className="w-full flex flex-col items-center px-10">
                        {/* Title */}
                        <div className="text-center mt-6 w-full animate-fade-scale">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white drop-shadow-lg animate-glow">
                                Welcome to LEAP 2025 Agentic AI Virtual Assistants
                            </h1>
                            <p className="text-lg mt-2 text-blue-100 font-medium">
                                Explore LEAP 2025 with our AI Assistants—innovate, inspire, and enjoy!
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-wrap justify-center items-start gap-8 mt-6 mb-4 w-full max-w-[1400px]">
                            
                            {/* Chatbot Section - enhanced */}
                            <div className="w-[500px] h-[650px] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-slide-up">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 text-white text-center py-4 font-bold uppercase text-lg tracking-wider flex-shrink-0 shadow-lg">
                                    Agentic AI Agent
                                </div>
                                {/* Iframe container */}
                                <div className="flex-1">
                                    <iframe 
                                        className="w-full h-full border-none"
                                        src="https://copilotstudio.microsoft.com/environments/Default-fc3b3043-d920-470a-8ae0-b2610bb2aea5/bots/cr0c2_myAgent_0DgLY1/webchat?__version__=2"
                                    >
                                    </iframe>
                                </div>
                                {/* Footer gradient */}
                                <div className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 h-6 flex-shrink-0">
                                </div>
                            </div>

                            {/* Drag & Drop Section - enhanced */}
                            <div className="flex-1 min-w-[600px] max-w-[700px] flex flex-col justify-start h-[650px] gap-4 animate-slide-up"
                                 style={{ animationDelay: '0.2s' }}>
                                {/* Draggable Items */}
                                <div className="grid grid-cols-2 gap-3">
                                    {items.map(item => (
                                        <div key={item.id}
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, item)}
                                            className="p-3 bg-white/20 backdrop-blur-xl rounded-xl text-center cursor-grab text-sm font-medium 
                                            hover:bg-white/30 transition-all duration-300 border border-white/20 shadow-lg
                                            hover:shadow-xl hover:-translate-y-0.5 select-none"
                                        >
                                            {item.text}
                                        </div>
                                    ))}
                                </div>

                                {/* Drop Zone */}
                                <div className="flex-grow border-2 border-dashed border-blue-400/50 rounded-xl 
                                    flex flex-col items-center justify-center
                                    p-4 text-lg font-semibold text-white bg-white/15 backdrop-blur-xl
                                    shadow-lg relative"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                >
                                    {droppedItems.length === 0 ? (
                                        <p className="text-lg font-bold text-blue-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            Drop Here
                                        </p>
                                    ) : (
                                        <div className="w-full space-y-3 max-h-full overflow-y-auto">
                                            {droppedItems.map((item) => (
                                                <div key={item.id} 
                                                    className={`p-4 w-full text-center rounded-xl ${
                                                        item.correct 
                                                            ? "bg-gradient-to-r from-green-600 to-green-500" 
                                                            : "bg-gradient-to-r from-red-600 to-red-500"
                                                    } text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl`}
                                                >
                                                    {item.text}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeapAI;
