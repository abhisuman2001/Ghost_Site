import React from 'react';

const Tombstone = ({ url, causeOfDeath, statusCode, graveyardId, onSummonSpirit }) => {
  return (
    <div className="tombstone-hover flicker bg-tombstone-gray border-2 border-ghost-green p-6 rounded-lg shadow-lg max-w-md mx-auto animate-[fadeIn_0.5s_ease-in]">
      <div className="text-center">
        {/* Tombstone Top */}
        <div className="text-6xl mb-4">⚰️</div>
        
        {/* RIP Header */}
        <div className="text-2xl font-bold mb-4 glow-text">
          R.I.P.
        </div>
        
        {/* URL */}
        <div className="engraved-text text-sm mb-4 break-all font-mono">
          {url}
        </div>
        
        {/* Divider */}
        <div className="border-t border-ghost-green-dim my-4"></div>
        
        {/* Cause of Death */}
        <div className="text-ghost-green-dim text-xs mb-2">
          Cause of Death:
        </div>
        <div className="text-ghost-green text-sm italic">
          "{causeOfDeath}"
        </div>
        
        {/* Status Code */}
        {statusCode > 0 && (
          <div className="mt-4 text-xs text-ghost-green-dim">
            HTTP {statusCode}
          </div>
        )}
        
        {/* Decorative Elements */}
        <div className="mt-6 text-2xl">
          🕯️ 💀 🕯️
        </div>

        {/* Summon Spirit Button */}
        {graveyardId && onSummonSpirit && (
          <div className="mt-6">
            <button
              onClick={onSummonSpirit}
              className="ghost-button px-6 py-3 text-sm pulse-glow"
            >
              🔮 SUMMON SPIRIT 🔮
            </button>
            <p className="text-xs text-ghost-green-dim mt-2">
              Dare to speak with the dead?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tombstone;
