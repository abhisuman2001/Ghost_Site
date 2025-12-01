import React, { useState } from 'react';
import { scanURL } from '../services/api';

const URLScanner = ({ onScanComplete }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL to scan');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🎃 Initiating scan...');
      const result = await scanURL(url);
      console.log('👻 Scan complete:', result);
      
      onScanComplete(result);
      setUrl(''); // Clear input after successful scan
    } catch (err) {
      console.error('💀 Scan failed:', err);
      setError(err.error?.message || 'Failed to scan URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Field */}
        <div>
          <label htmlFor="url-input" className="block text-ghost-green text-sm mb-2 tracking-wide">
            ENTER URL TO SCAN:
          </label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={loading}
            className="w-full bg-purgatory-darker border-2 border-ghost-green text-ghost-green px-4 py-3 rounded font-mono focus:outline-none focus:border-ghost-green focus:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all disabled:opacity-50"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-400 px-4 py-3 rounded">
            <div className="flex items-center">
              <span className="text-2xl mr-2">💀</span>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="ghost-button w-full py-4 text-lg relative overflow-hidden"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="spinner mr-3"></span>
              SCANNING THE GRAVEYARD...
            </span>
          ) : (
            <span>🔍 SCAN FOR DEAD LINKS</span>
          )}
        </button>
      </form>

      {/* Instructions */}
      <div className="mt-8 text-center text-ghost-green-dim text-xs">
        <p>Enter a URL to check if it's among the living or the dead.</p>
        <p className="mt-2">The spirits will reveal its fate...</p>
      </div>
    </div>
  );
};

export default URLScanner;
