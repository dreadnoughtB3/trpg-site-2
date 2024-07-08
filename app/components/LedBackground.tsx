import React, { useEffect, useRef } from 'react';

const LEDLCDBackground: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) {
      const text = 'Welcome';

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          terminal.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, Math.random() * 50 + 10);
        }
      };
      typeWriter();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden">
      {/* LED grid effect */}
      <div className="absolute inset-0 bg-black opacity-20" 
           style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '4px 4px'}} />
      
      {/* Terminal window */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-3/4 h-1/2 bg-black bg-opacity-80 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gray-800 p-2 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div ref={terminalRef} className="p-4 font-mono text-green-400 text-sm whitespace-pre-wrap" />
      </div>

      {/* Scan line effect */}
      <div className="scanline absolute top-0 left-0 w-full h-2 bg-white opacity-10 
                      animate-scanline pointer-events-none" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-scanline {
          animation: scanline 5s linear infinite;
        }
        .bg-radial-gradient {
          background: radial-gradient(circle, transparent 20%, black 90%);
        }
      `}</style>
    </div>
  );
};

export default LEDLCDBackground;