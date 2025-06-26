
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ApiKeyModal from "@/components/ApiKeyModal";

const ApiKeyProvider = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem("runware_api_key");
    setHasApiKey(!!apiKey);
  }, []);

  if (hasApiKey) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setShowModal(true)}>
        Set AI Image API Key
      </Button>
      <ApiKeyModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default ApiKeyProvider;
