import ScanningAnimation from '../ScanningAnimation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ScanningAnimationExample() {
  const [isScanning, setIsScanning] = useState(false);
  
  return (
    <div className="p-4 space-y-4">
      <Button 
        onClick={() => setIsScanning(!isScanning)}
        variant={isScanning ? "destructive" : "default"}
      >
        {isScanning ? 'Stop Scan' : 'Start Demo Scan'}
      </Button>
      <ScanningAnimation 
        isActive={isScanning} 
        scanTarget="alex.richardson@techcorp.com" 
      />
    </div>
  );
}