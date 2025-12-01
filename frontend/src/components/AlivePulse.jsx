import React from 'react';

const AlivePulse = ({ url, message }) => {
  return (
    <div className="bg-purgatory-darker border-2 border-ghost-green p-8 rounded-lg shadow-lg max-w-md mx-auto animate-[fadeIn_0.5s_ease-in]">
      <div className="text-center">
        {/* Pulsing Heart */}
        <div className="text-8xl mb-4 animate-pulse">
          💚
        </div>
        
        {/* Status */}
        <div className="text-3xl font-bold mb-4 pulse-glow text-ghost-green">
          STILL ALIVE
        </div>
        
        {/* URL */}
        <div className="text-ghost-green-dim text-sm mb-4 break-all font-mono">
          {url}
        </div>
        
        {/* Divider */}
        <div className="border-t border-ghost-green-dim my-4"></div>
        
        {/* Message */}
        <div className="text-ghost-green text-sm italic mb-4">
          "{message}"
        </div>
        
        {/* Warning */}
        <div className="text-xs text-ghost-green-dim mt-6">
          ⚠️ But all things must eventually rest...
        </div>
      </div>
    </div>
  );
};

export default AlivePulse;
