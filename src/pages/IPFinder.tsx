import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
}

const IPFinder = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchIPInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      setIpInfo(data);
      toast({
        title: "Success",
        description: "IP information retrieved successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch IP information. Please try again.",
      });
      setIpInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an IP address.",
      });
      return;
    }
    fetchIPInfo();
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">IP Address Finder</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter IP address..."
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Look Up"}
            </Button>
          </div>
        </form>

        {ipInfo && (
          <div className="mt-6 space-y-2">
            <h2 className="text-xl font-semibold mb-4">IP Information:</h2>
            <p><strong>IP:</strong> {ipInfo.ip}</p>
            <p><strong>City:</strong> {ipInfo.city}</p>
            <p><strong>Region:</strong> {ipInfo.region}</p>
            <p><strong>Country:</strong> {ipInfo.country}</p>
            <p><strong>Location:</strong> {ipInfo.loc}</p>
            <p><strong>Organization:</strong> {ipInfo.org}</p>
            <p><strong>Timezone:</strong> {ipInfo.timezone}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default IPFinder;