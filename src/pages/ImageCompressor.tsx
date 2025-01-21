import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          
          // Set the dimensions for the compressed image
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get compressed image as data URL
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select an image file.",
        });
        return;
      }
      setSelectedFile(file);
      setCompressedImage(null);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image first.",
      });
      return;
    }

    try {
      const compressed = await compressImage(selectedFile);
      setCompressedImage(compressed);
      toast({
        title: "Success",
        description: "Image compressed successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to compress image. Please try again.",
      });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Image Compressor</h1>
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button
            onClick={handleCompress}
            disabled={!selectedFile}
            className="w-full"
          >
            Compress Image
          </Button>
          {compressedImage && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Compressed Result:</h2>
              <img
                src={compressedImage}
                alt="Compressed"
                className="max-w-full rounded-lg"
              />
              <a
                href={compressedImage}
                download="compressed-image.jpg"
                className="block mt-4"
              >
                <Button className="w-full">Download Compressed Image</Button>
              </a>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageCompressor;