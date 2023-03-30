import { useState, useEffect } from "react";

function ConnectToPhantom() {
  const [isConnected, setIsConnected] = useState(false);
  const [phantom, setPhantom] = useState(null);

  useEffect(() => {
    const checkPhantomInstalled = async () => {
      const isPhantomInstalled = (window as any).phantom?.solana?.isPhantom;
      if (isPhantomInstalled) {
        const provider =  (window as any).phantom?.solana
        await provider.connect();
        setPhantom(provider);
        setIsConnected(true);
      }
    };
    checkPhantomInstalled();
  }, []);


  const toggleConnection = async () => {
    if (!phantom) return;

    if (isConnected) {
      await phantom.disconnect();
      setIsConnected(false);
    } else {
      await phantom.connect();
      setIsConnected(true);
    }
  };

  return (
    <div>
      {phantom ? (
        <button onClick={toggleConnection}>
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      ) : (
        <a href="https://phantom.app/" target="_blank" rel="noreferrer">

          Activate Phantom
        </a>
      )}
    </div>
  );
}

export default ConnectToPhantom;
