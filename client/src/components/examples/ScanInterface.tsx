import ScanInterface from '../ScanInterface';

export default function ScanInterfaceExample() {
  const handleScan = (query: string) => {
    console.log('Scan initiated for:', query);
  };
  
  return (
    <div className="p-4">
      <ScanInterface onScan={handleScan} />
    </div>
  );
}