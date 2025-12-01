import React, { useState, useEffect, useRef } from 'react';
import { startSeance, sendSeanceMessage } from '../services/api';

const SeanceModal = ({ graveyardId, url, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState(null);
  const [typingMessage, setTypingMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  /**
   * Types out a message character by character
   * @param {string} fullMessage - The complete message to type
   * @param {function} onComplete - Callback when typing is complete
   */
  const typeMessage = (fullMessage, onComplete) => {
    let currentIndex = 0;
    setTypingMessage('');

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setTypingMessage(fullMessage.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        setTypingMessage(null);
        onComplete();
      }
    }, 30); // 30ms per character for spooky typing effect
  };

  // Initialize séance on mount
  useEffect(() => {
    const initSeance = async () => {
      try {
        console.log('🕯️ Opening séance portal...');
        const response = await startSeance(graveyardId);
        
        // Add welcome message
        setMessages([{
          type: 'system',
          content: response.data.welcomeMessage,
          timestamp: new Date()
        }]);
      } catch (err) {
        console.error('💀 Failed to start séance:', err);
        setError(err.error?.message || 'Failed to open the portal');
      }
    };

    initSeance();
  }, [graveyardId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || loading) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setError(null);

    // Add user message to display
    setMessages(prev => [...prev, {
      type: 'user',
      content: userMsg,
      timestamp: new Date()
    }]);

    setLoading(true);

    try {
      console.log('👻 Sending message to ghost...');
      const response = await sendSeanceMessage(graveyardId, userMsg, conversationHistory);
      
      // Update conversation history
      setConversationHistory(response.data.conversationHistory);

      // Type out the ghost response character by character
      const ghostResponse = response.data.ghostResponse;
      typeMessage(ghostResponse, () => {
        // Add complete ghost response to messages after typing finishes
        setMessages(prev => [...prev, {
          type: 'ghost',
          content: ghostResponse,
          timestamp: new Date()
        }]);
        setLoading(false);
      });

    } catch (err) {
      console.error('💀 Ghost communication failed:', err);
      setError(err.error?.message || 'The spirit has gone silent...');
      
      // Add error message
      setMessages(prev => [...prev, {
        type: 'error',
        content: '[CONNECTION LOST] The spirit has vanished into the void...',
        timestamp: new Date()
      }]);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-purgatory-darker border-2 border-ghost-green rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,255,65,0.3)]">
        
        {/* Header */}
        <div className="border-b border-ghost-green p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold glow-text">🕯️ THE SÉANCE 🕯️</h2>
            <p className="text-xs text-ghost-green-dim mt-1 font-mono break-all">
              Channeling: {url}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-ghost-green hover:text-red-500 text-2xl transition-colors"
            title="Close séance"
          >
            ✕
          </button>
        </div>

        {/* Messages Area - Ouija Board Style */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black bg-opacity-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`animate-[fadeIn_0.3s_ease-in] ${
                msg.type === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              {msg.type === 'system' && (
                <div className="text-center text-ghost-green-dim text-sm italic whitespace-pre-line">
                  {msg.content}
                </div>
              )}

              {msg.type === 'user' && (
                <div className="inline-block bg-ghost-green bg-opacity-20 border border-ghost-green px-4 py-2 rounded-lg max-w-[80%]">
                  <div className="text-xs text-ghost-green-dim mb-1">YOU</div>
                  <div className="text-ghost-green">{msg.content}</div>
                </div>
              )}

              {msg.type === 'ghost' && (
                <div className="inline-block bg-tombstone-gray border border-red-500 px-4 py-2 rounded-lg max-w-[80%] flicker">
                  <div className="text-xs text-red-400 mb-1 flex items-center">
                    <span className="mr-2">👻</span>
                    GHOST
                  </div>
                  <div className="text-red-400 whitespace-pre-line font-mono text-sm">
                    {msg.content}
                  </div>
                </div>
              )}

              {msg.type === 'error' && (
                <div className="text-center text-red-400 text-sm italic">
                  {msg.content}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator or typing message */}
          {loading && !typingMessage && (
            <div className="text-center">
              <div className="inline-block bg-tombstone-gray border border-ghost-green px-4 py-2 rounded-lg flicker">
                <div className="text-ghost-green-dim text-sm flex items-center">
                  <span className="spinner mr-2"></span>
                  The spirit is manifesting...
                </div>
              </div>
            </div>
          )}

          {/* Ghost typing effect */}
          {typingMessage && (
            <div className="text-left animate-[fadeIn_0.3s_ease-in]">
              <div className="inline-block bg-tombstone-gray border border-red-500 px-4 py-2 rounded-lg max-w-[80%] flicker">
                <div className="text-xs text-red-400 mb-1 flex items-center">
                  <span className="mr-2">👻</span>
                  GHOST
                </div>
                <div className="text-red-400 whitespace-pre-line font-mono text-sm">
                  {typingMessage}
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-ghost-green p-4">
          {error && (
            <div className="mb-3 text-red-400 text-sm text-center">
              💀 {error}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Speak to the spirit..."
              disabled={loading}
              className="flex-1 bg-purgatory-dark border border-ghost-green text-ghost-green px-4 py-3 rounded font-mono text-sm focus:outline-none focus:border-ghost-green focus:shadow-[0_0_15px_rgba(0,255,65,0.5)] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="ghost-button px-6 py-3 text-sm"
            >
              {loading ? '...' : 'SEND'}
            </button>
          </form>

          <div className="mt-3 text-center text-ghost-green-dim text-xs">
            <p>💀 Ask the ghost about its past life... if you dare 💀</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeanceModal;
