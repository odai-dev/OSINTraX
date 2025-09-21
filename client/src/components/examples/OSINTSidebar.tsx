import OSINTSidebar from '../OSINTSidebar';
import { useState } from 'react';

export default function OSINTSidebarExample() {
  const [activeModule, setActiveModule] = useState('profile');
  
  return (
    <div className="h-screen w-64">
      <OSINTSidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
      />
    </div>
  );
}