import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const { toast } = useToast();

  const generateQR = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text or URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          text
        )}`
      );
      setQrCode(response.url);
      toast({
        title: "Success",
        description: "QR Code generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-muted-foreground">Generate QR codes for any text or URL</p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL..."
        />
        <Button onClick={generateQR} className="w-full">
          Generate QR Code
        </Button>
      </div>

      {qrCode && (
        <div className="flex justify-center">
          <img
            src={qrCode}
            alt="Generated QR Code"
            className="border rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default QRGenerator;