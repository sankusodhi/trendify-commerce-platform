
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ApiKeyModalProps {
  open: boolean;
  onClose: () => void;
}

const ApiKeyModal = ({ open, onClose }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    localStorage.setItem("runware_api_key", apiKey);
    toast.success("API key saved successfully");
    window.location.reload(); 
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Runware AI API Key</DialogTitle>
          <DialogDescription>
            To generate AI images for products, you need to provide your Runware AI API key.
            You can get an API key by signing up at <a href="https://runware.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">Runware.ai</a>.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Input
            placeholder="Enter your Runware API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
