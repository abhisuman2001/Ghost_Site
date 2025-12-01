import React, { useState } from 'react'
import URLScanner from './components/URLScanner'
import Tombstone from './components/Tombstone'
import AlivePulse from './components/AlivePulse'
import SeanceModal from './components/SeanceModal'

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [spookyStatus, setSpookyStatus] = useState('The graveyard awaits...');
  const [seanceOpen, setSeanceOpen] = useState(false);

  const handleScanComplete = (result) => {
    console.log('📊 Scan result received:', result);
    setScanResult(result.data);
    setSpookyStatus(result.spooky_status);
  };

  const handleReset = () => {
    setScanResult(null);
    setSpookyStatus('The graveyard awaits...');
    setSeanceOpen(false);
  };

  const handleSummonSpirit = () => {
    console.log('🕯️ Opening séance portal...');
    setSeanceOpen(true);
    setSpookyStatus('The séance begins...');
  };

  const handleCloseSeance = () => {
    console.log('👻 Closing séance portal...');
    setSeanceOpen(false);
    setSpookyStatus('The spirit has departed...');
  };

  return (
    <div className="min-h-screen bg-purgatory-dark text-ghost-green crt-effect scanline-effect">
      <div className="container mx-auto px-4 pb-12">
        {/* Header */}
        <header className="py-8 text-center">
          <h1 className="text-6xl font-bold pulse-glow mb-2">
            👻 DIGITAL PURGATORY 👻
          </h1>
          <p className="text-ghost-green-dim text-sm tracking-widest">
            [ HAUNTED OS v1.0 - WHERE DEAD LINKS REST ]
          </p>
        </header>
        
        {/* Main Content */}
        <main className="py-12">
          {!scanResult ? (
            // Scanner Form
            <URLScanner onScanComplete={handleScanComplete} />
          ) : (
            // Results Display
            <div className="space-y-8">
              {scanResult.status === 'DEAD' ? (
                <Tombstone 
                  url={scanResult.url}
                  causeOfDeath={scanResult.causeOfDeath}
                  statusCode={scanResult.statusCode}
                  graveyardId={scanResult.graveyardId}
                  onSummonSpirit={handleSummonSpirit}
                />
              ) : (
                <AlivePulse 
                  url={scanResult.url}
                  message={scanResult.message}
                />
              )}

              {/* Scan Another Button */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="ghost-button px-8 py-3"
                >
                  🔍 SCAN ANOTHER URL
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Séance Modal */}
        {seanceOpen && scanResult?.graveyardId && (
          <SeanceModal
            graveyardId={scanResult.graveyardId}
            url={scanResult.url}
            onClose={handleCloseSeance}
          />
        )}

        {/* Footer with Spooky Status */}
        <footer className="fixed bottom-0 left-0 right-0 bg-purgatory-darker border-t border-ghost-green py-3">
          <div className="container mx-auto px-4">
            <p className="text-center text-ghost-green-dim text-xs flicker">
              {spookyStatus}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
