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
  }

  const check = ()=> {
    console.log(`Phantom present? ${(window as any).phantom?.solana?.isPhantom}`)
  }

  const tryConnect = async () => {
    try {
      const response = await (window as any).phantom.solana.request({ method: "connect" });
      (window as any).phantom.solana.on("connect", () => console.log("connected!"))
      console.log((window as any).phantom.solana.isConnected)
      console.log("pubkey", response)
    } 
    catch(err) {
      console.log(err)
    }
  }


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
        // <button onClick={tryConnect}>
        //   Try Connect
        // </button>
      )}
      <div>
          <button onClick={check}>
            check if present
          </button>

      </div>
 
    </div>
  );
}

export default ConnectToPhantom;
