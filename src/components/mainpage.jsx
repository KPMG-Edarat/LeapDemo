import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Youtube, FileSpreadsheet, Calculator, MessageSquare } from 'lucide-react';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import Draggable from 'react-draggable';
import { 
  FaCity, // For City Selection Agent
  FaCloudSunRain, // For Weather Analysis Agent
  FaCalendarCheck // For Plan Generation Agent
} from 'react-icons/fa';
import kpmgLogo from '../assets/kpmg.svg';
const DraggableToolBox = ({ name, Icon, extraField, position, onPositionChange, toolId, agentIndex, hoveredAgent, isVisible }) => {
    const updateXarrow = useXarrow();
    
    return (
      <div id={toolId} className={`transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-20'
      }`}>
        <Draggable
          position={position}
          onDrag={(e, data) => {
            updateXarrow();
            onPositionChange({ x: data.x, y: data.y });
          }}
          onStop={(e, data) => {
            updateXarrow();
            onPositionChange({ x: data.x, y: data.y });
          }}
        >
          <div className="cursor-move">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 w-[120px] flex flex-col items-center justify-center">
              {/* Add the green circle at the top */}
              <div 
                id={`tool-circle-${toolId}`}
                className="relative mb-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-50"></div>
              </div>
              <div className="relative mb-2">
                <Icon className="w-8 h-8 text-gray-700" />
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-50"></div>
              </div>
              <span className="text-xs font-medium text-center mb-1">{name}</span>
              <div className="space-y-1 w-full">
                <input 
                  type="text" 
                  placeholder="API Key" 
                  className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs"
                />
                <input 
                  type="text" 
                  placeholder={extraField.placeholder}
                  className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs"
                />
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  };

const Agent = ({ title, index, Icon, iconBg }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 w-[250px]">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${iconBg} shadow-lg`}>
          <Icon 
            className="w-6 h-6 text-white filter drop-shadow-md"
          />
        </div>
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Model Provider</label>
          <select className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs">
            <option>OpenAI</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Model Name</label>
          <input 
            type="text" 
            className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs"
            placeholder="gpt-3.5-turbo"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">OpenAI API Key</label>
          <input 
            type="password" 
            className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs"
            placeholder="••••••••••••••••"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Agent Instructions</label>
          <textarea 
            className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs h-[40px] resize-none"
            placeholder="You are a helpful assistant..."
          />
        </div>

        <div className="pt-1.5 border-t border-gray-100 flex items-center gap-2">
          <div 
            id={`tools-circle-${index}`}
            className="relative"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-50"></div>
          </div>
          <span className="text-xs font-medium">Tools</span>
        </div>

        <div className="pt-1.5 border-t border-gray-100 flex items-center gap-2">
          <div 
            id={`input-circle-${index}`}
            className="relative"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-50"></div>
          </div>
          <span className="text-xs font-medium">Input</span>
        </div>

        <div className="pt-1.5 border-t border-gray-100 relative">
          <input 
            type="text" 
            placeholder="Response" 
            className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs pr-8"
          />
          <div 
            id={`output-circle-${index}`}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="absolute inset-0 rounded-full bg-purple-400 animate-pulse opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DraggableAgent = ({ title, index, position, onPositionChange, visibleAgents, onHover, Icon, iconBg }) => {
  return (
    <Draggable position={position} onDrag={(e, data) => onPositionChange({ x: data.x, y: data.y })}>
      <div 
        className="cursor-move"
        onMouseEnter={() => onHover(index)}
        onClick={() => onHover(index)}
      >
        <div className={`transition-all duration-300 ${
          visibleAgents.includes(index) ? 'ring-2 ring-blue-500' : ''
        }`}>
          <Agent 
            title={title} 
            index={index}
            Icon={Icon}
            iconBg={iconBg}
          />
        </div>
      </div>
    </Draggable>
  );
};

const DraggableExplanationBox = ({ title, description, position, onPositionChange }) => {
  const updateXarrow = useXarrow();
  const nodeRef = React.useRef(null);
  
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={(e, data) => {
        updateXarrow();
        onPositionChange({ x: data.x, y: data.y });
      }}
      onStop={(e, data) => {
        updateXarrow();
        onPositionChange({ x: data.x, y: data.y });
      }}
    >
      <div ref={nodeRef} className="cursor-move">
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-3 w-[200px] mb-4">
          <h4 className="text-xs font-medium text-blue-800 mb-1">{title}</h4>
          <p className="text-xs text-blue-700">{description}</p>
        </div>
      </div>
    </Draggable>
  );
};

// Add the ChatInput component
const DraggableChatInput = ({ position, onPositionChange }) => {
  const updateXarrow = useXarrow();
  const nodeRef = React.useRef(null);
  
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={(e, data) => {
        updateXarrow();
        onPositionChange({ x: data.x, y: data.y });
      }}
      onStop={(e, data) => {
        updateXarrow();
        onPositionChange({ x: data.x, y: data.y });
      }}
    >
      <div ref={nodeRef} className="cursor-move">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 w-[250px]">
          <h3 className="text-xs font-medium mb-2">Chat Input</h3>
          
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Prompt</label>
              <textarea 
                className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs h-[60px] resize-none"
                placeholder="Enter your prompt here..."
              />
            </div>

            <div className="pt-1.5 border-t border-gray-100 relative">
              <input 
                type="text" 
                placeholder="Response" 
                className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs pr-8"
                readOnly
              />
              <div 
                id="chat-output-circle"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="absolute inset-0 rounded-full bg-purple-400 animate-pulse opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

// Update DraggableOutputBox component
const DraggableOutputBox = ({ position, onPositionChange, isVisible }) => {
  const updateXarrow = useXarrow();
  const nodeRef = React.useRef(null);
  
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={(e, data) => {
        updateXarrow();
        onPositionChange({ x: data.x, y: data.y });
      }}
      onStop={(e, data) => {
        updateXarrow();
        onPositionChange({ x: data.x, y: data.y });
      }}
    >
      <div ref={nodeRef} className="cursor-move">
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 w-[250px] 
          transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-20'}`}>
          <h3 className="text-xs font-medium mb-2">Final Output</h3>
          
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Response</label>
              <textarea 
                className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs h-[60px] resize-none"
                placeholder="Final response will appear here..."
                readOnly
              />
            </div>

            <div className="pt-1.5 border-t border-gray-100 relative">
              <div 
                id="output-box-input-circle"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
              >
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-50"></div>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Status" 
                className="w-full border border-gray-200 rounded-md px-2 py-0.5 text-xs pl-8"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

const AgentWorkflow = ({ onNavigate }) => {
    const [positions, setPositions] = useState(() => {
      const savedPositions = localStorage.getItem('agentWorkflowPositions');
      if (savedPositions) {
        return JSON.parse(savedPositions);
      }
      
      return {
        agents: {
          'agent-0': { x: -124, y: -22 },
          'agent-1': { x: 40, y: 91 },
          'agent-2': { x: -42, y: -80 }
        },
        explanations: {
          'explanation-0': { x: -68, y: -137 },
          'explanation-1': { x: 383, y: -25 },
          'explanation-2': { x: 417, y: -141 }
        },
        tools: {
          'tool-0-0': { x: -119, y: 25 },
          'tool-0-1': { x: -50, y: 36 },
          'tool-0-2': { x: -430, y: -189 },
          'tool-1-0': { x: -80, y: 45 },
          'tool-1-1': { x: -207, y: -214 },
          'tool-2-0': { x: 376, y: 24 },
          'tool-2-1': { x: -112, y: 21 },
          'tool-2-2': { x: -88, y: 42 }
        },
        chatInput: { x: 8, y: -5 },
        outputBox: { x: 826, y: -527 }
      };
    });
  
    // Change hoveredAgent to an array to track multiple visible agents
    const [visibleAgents, setVisibleAgents] = useState([]);
  
    useEffect(() => {
      localStorage.setItem('agentWorkflowPositions', JSON.stringify(positions));
    }, [positions]);
  
    const updatePosition = (type, id, newPosition) => {
      setPositions(prev => ({
        ...prev,
        [type]: type === 'chatInput' || type === 'outputBox' ? newPosition : {
          ...prev[type],
          [id]: newPosition
        }
      }));
    };
  
    const handleAgentHover = (index) => {
      if (visibleAgents.includes(index)) {
        setVisibleAgents(visibleAgents.filter(i => i !== index));
      } else {
        setVisibleAgents([...visibleAgents, index]);
      }
    };
  
    const agents = [
      {
        title: 'City Selection Agent',
        Icon: FaCity,
        iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600', // Blue gradient
        description: "Evaluates potential travel destinations based on user preferences and constraints. Analyzes factors like budget, weather, and activities to recommend ideal cities.",
        tools: [
          { 
            name: "Search API", 
            Icon: Search,
            extraField: {
              placeholder: "Search Engine URL"
            }
          },
          { 
            name: "YouTube API", 
            Icon: Youtube,
            extraField: {
              placeholder: "Channel/Video ID"
            }
          },
          { 
            name: "Yahoo Finance", 
            Icon: FileSpreadsheet,
            extraField: {
              placeholder: "Stock Symbol"
            }
          }
        ]
      },
      {
        title: 'Weather Analysis Agent',
        Icon: FaCloudSunRain,
        iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600', // Purple gradient
        description: "Gathers comprehensive local information about selected cities, including attractions, culture, transportation, and practical tips for visitors.",
        tools: [
          {
            name: "Wikipedia API",
            Icon: Search,
            extraField: {
              placeholder: "Language Code"
            }
          },
          {
            name: "Custom Tools",
            Icon: FileSpreadsheet,
            extraField: {
              placeholder: "Data Source URL"
            }
          }
        ]
      },
      {
        title: 'Plan Generation Agent',
        Icon: FaCalendarCheck,
        iconBg: 'bg-gradient-to-br from-green-400 to-green-600', // Green gradient
        description: "Creates detailed travel itineraries and provides recommendations for accommodations, restaurants, and activities based on user preferences.",
        tools: [
          {
            name: "Bing Search",
            Icon: Search,
            extraField: {
              placeholder: "Market Region"
            }
          },
          {
            name: "Calculator",
            Icon: Calculator,
            extraField: {
              placeholder: "Currency Code"
            }
          },
          {
            name: "Message to Data",
            Icon: MessageSquare,
            extraField: {
              placeholder: "Template ID"
            }
          }
        ]
      }
    ];
  
    // Add useEffect for particle animation
    useEffect(() => {
      const canvas = document.getElementById('agent-background');
      const ctx = canvas.getContext('2d');
      
      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      // Optimized particle system
      const particles = [];
      const particleCount = 50;
      
      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.radius = Math.random() * 3 + 1.5;  // Increased size
          this.color = `hsla(${180 + Math.random() * 30}, 90%, 80%, 0.6)`;  // Brighter color
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

      const connectionDistance = 100;
      const connectionDistanceSquared = connectionDistance * connectionDistance;

      let animationFrameId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
        });

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';  // Brighter connections
        ctx.lineWidth = 1;  // Thicker lines

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSquared = dx * dx + dy * dy;

            if (distSquared < connectionDistanceSquared) {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
        ctx.stroke();

        ctx.fillStyle = 'rgba(20, 184, 166, 0.8)';  // Brighter particles
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
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
                transform: translateY(30px);
                opacity: 0;
              }
              to { 
                transform: translateY(0);
                opacity: 1;
              }
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes glowText {
              0% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
              50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
              100% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
            }

            .animate-slide-up {
              animation: slideUp 0.8s ease-out forwards;
            }

            .animate-fade-in {
              animation: fadeIn 0.8s ease-out forwards;
            }

            .animate-glow {
              animation: glowText 3s infinite;
            }
          `}
        </style>

        <div className="min-h-screen w-full fixed inset-0 overflow-hidden">
          <canvas
            id="agent-background"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              background: 'linear-gradient(135deg, #0F172A 0%, #164E63 50%, #0891B2 100%)',  // Dark blue to turquoise gradient
            }}
          />

          {/* Content container */}
          <div className="relative p-8" style={{ zIndex: 1 }}>
            {/* Add KPMG logo */}
            <div className="absolute top-4 left-4">
              <img 
                src={kpmgLogo} 
                alt="KPMG Logo" 
                style={{ 
                  height: '40px',
                  filter: 'brightness(0) invert(1)',  // Make logo white
                  opacity: 0.9
                }} 
              />
            </div>

            {/* Add Back to LEAP button */}
            <div className="fixed top-4 right-4 z-50">
              <button
                onClick={() => onNavigate('leap')}
                className="bg-gradient-to-r from-blue-600/90 to-blue-500/90 
                  text-white px-6 py-3 rounded-lg font-medium text-lg
                  hover:from-blue-700 hover:to-blue-600 transition-all duration-300 
                  shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/10
                  hover:-translate-y-0.5"
              >
                Back to LEAP
              </button>
            </div>

            <h1 className="text-3xl font-bold text-center mb-8 text-gray-100 animate-glow">
              Agentic Workflow
            </h1>

            <Xwrapper>
              {/* Add the chat input box */}
              <div className="mb-8 flex justify-center">
                <DraggableChatInput
                  position={positions.chatInput}
                  onPositionChange={(pos) => updatePosition('chatInput', null, pos)}
                />
              </div>

              {/* Add the connection arrow from chat input to first agent */}
              <Xarrow
                start="chat-output-circle"
                end="input-circle-0"
                startAnchor="right"
                endAnchor="left"
                color={visibleAgents.includes(0) ? "#3b82f6" : "transparent"}
                strokeWidth={0.8}
                path="smooth"
                headSize={5}
                curveness={0.2}
                animateDrawing={visibleAgents[visibleAgents.length - 1] === 0 ? 3 : false}
                showHead={visibleAgents.includes(0)}
                SVGcanvasStyle={{
                  filter: visibleAgents.includes(0) ? "drop-shadow(0 0 6px #3b82f6)" : "none"
                }}
              />

              <div className="flex items-start justify-center gap-4 relative">
                {agents.map((agent, index) => (
                  <div key={agent.title} className="flex flex-col items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div>
                        <DraggableExplanationBox 
                          title={agent.title}
                          description={agent.description}
                          position={positions.explanations[`explanation-${index}`] || { x: 0, y: 0 }}
                          onPositionChange={(pos) => updatePosition('explanations', `explanation-${index}`, pos)}
                        />
                      </div>
                      <div className="relative">
                        <DraggableAgent 
                          title={agent.title} 
                          index={index}
                          Icon={agent.Icon}
                          iconBg={agent.iconBg}
                          position={positions.agents[`agent-${index}`] || { x: 0, y: 0 }}
                          onPositionChange={(pos) => updatePosition('agents', `agent-${index}`, pos)}
                          visibleAgents={visibleAgents}
                          onHover={handleAgentHover}
                        />
                      </div>
                    </div>
                    {agent.tools && (
                      <div className="flex gap-4">
                        {agent.tools.map((tool, toolIndex) => (
                          <div
                            key={tool.name}
                            id={`tool-${index}-${toolIndex}`}
                          >
                            <DraggableToolBox 
                              name={tool.name} 
                              Icon={tool.Icon}
                              extraField={tool.extraField}
                              position={positions.tools[`tool-${index}-${toolIndex}`] || { x: 0, y: 0 }}
                              onPositionChange={(pos) => updatePosition('tools', `tool-${index}-${toolIndex}`, pos)}
                              toolId={`tool-${index}-${toolIndex}`}
                              agentIndex={index}
                              hoveredAgent={visibleAgents.includes(index) ? index : null}
                              isVisible={visibleAgents.includes(index)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
      
              {/* Agent-to-agent arrows */}
              {agents.slice(0, -1).map((_, index) => (
                <Xarrow
                  key={`arrow-${index}`}
                  start={`output-circle-${index}`}
                  end={`input-circle-${index + 1}`}
                  startAnchor="right"
                  endAnchor="left"
                  color={visibleAgents.includes(index) || visibleAgents.includes(index + 1) ? "#3b82f6" : "transparent"}
                  strokeWidth={0.8}
                  path="smooth"
                  headSize={5}
                  curveness={0.2}
                  animateDrawing={visibleAgents[visibleAgents.length - 1] === index || visibleAgents[visibleAgents.length - 1] === index + 1 ? 3 : false}
                  showHead={visibleAgents.includes(index) || visibleAgents.includes(index + 1)}
                  SVGcanvasStyle={{
                    filter: visibleAgents.includes(index) || visibleAgents.includes(index + 1) ? "drop-shadow(0 0 6px #3b82f6)" : "none"
                  }}
                />
              ))}
      
              {/* Tool arrows */}
              {agents.map((agent, agentIndex) => 
                agent.tools?.map((_, toolIndex) => (
                  <Xarrow
                    key={`tool-arrow-${agentIndex}-${toolIndex}`}
                    start={`tools-circle-${agentIndex}`}
                    end={`tool-circle-tool-${agentIndex}-${toolIndex}`}
                    startAnchor="bottom"
                    endAnchor="top"
                    color={visibleAgents.includes(agentIndex) ? "#3b82f6" : "transparent"}
                    strokeWidth={0.8}
                    path="smooth"
                    headSize={5}
                    curveness={0.2}
                    animateDrawing={visibleAgents[visibleAgents.length - 1] === agentIndex ? 3 : false}
                    showHead={visibleAgents.includes(agentIndex)}
                    SVGcanvasStyle={{
                      filter: visibleAgents.includes(agentIndex) ? "drop-shadow(0 0 6px #3b82f6)" : "none"
                    }}
                  />
                ))
              )}

              {/* Add the output box */}
              <div className="mt-8 flex justify-center">
                <DraggableOutputBox
                  position={positions.outputBox}
                  onPositionChange={(pos) => updatePosition('outputBox', null, pos)}
                  isVisible={visibleAgents.includes(agents.length - 1)}
                />
              </div>

              {/* Add connection from last agent to output box */}
              <Xarrow
                start={`output-circle-${agents.length - 1}`}
                end="output-box-input-circle"
                startAnchor="right"
                endAnchor="left"
                color={visibleAgents.includes(agents.length - 1) ? "#3b82f6" : "transparent"}
                strokeWidth={0.8}
                path="smooth"
                headSize={5}
                curveness={0.2}
                animateDrawing={visibleAgents[visibleAgents.length - 1] === agents.length - 1 ? 3 : false}
                showHead={visibleAgents.includes(agents.length - 1)}
                SVGcanvasStyle={{
                  filter: visibleAgents.includes(agents.length - 1) ? "drop-shadow(0 0 6px #3b82f6)" : "none"
                }}
              />
            </Xwrapper>
      
            <button
              onClick={() => {
                localStorage.removeItem('agentWorkflowPositions');
                setPositions({
                  agents: {
                    'agent-0': { x: -124, y: -22 },
                    'agent-1': { x: 40, y: 91 },
                    'agent-2': { x: -42, y: -80 }
                  },
                  explanations: {
                    'explanation-0': { x: -68, y: -137 },
                    'explanation-1': { x: 383, y: -25 },
                    'explanation-2': { x: 417, y: -141 }
                  },
                  tools: {
                    'tool-0-0': { x: -119, y: 25 },
                    'tool-0-1': { x: -50, y: 36 },
                    'tool-0-2': { x: -430, y: -189 },
                    'tool-1-0': { x: -80, y: 45 },
                    'tool-1-1': { x: -207, y: -214 },
                    'tool-2-0': { x: 376, y: 24 },
                    'tool-2-1': { x: -112, y: 21 },
                    'tool-2-2': { x: -88, y: 42 }
                  },
                  chatInput: { x: 8, y: -5 },
                  outputBox: { x: 826, y: -527 }
                });
                setVisibleAgents([]);
              }}
              className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm"
            >
              Reset Positions
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default AgentWorkflow;