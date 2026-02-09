import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import BasicInputs from "@/components/bridge/BasicInputs";
import bridgeImage from "@/assets/bridge-cross-section.png";
const Index = () => {
  const [activeTab, setActiveTab] = useState("basic");
  return <div className="flex flex-col h-screen overflow-hidden">
      {/* Toolbar */}
      <div className="eng-toolbar flex items-center px-4 h-9 text-xs font-medium tracking-wide shrink-0">
        <span className="mr-6 font-bold text-sm">Group Design</span>
        
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Left Panel */}
        <div className="w-[520px] shrink-0 flex flex-col border-r border-border">
          <div className="eng-panel-header px-3 py-1.5 text-xs font-semibold shrink-0">
            Input Parameters
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="rounded-none border-b border-border bg-secondary h-8 px-2 shrink-0">
              <TabsTrigger value="basic" className="text-xs h-6 px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Basic Inputs
              </TabsTrigger>
              <TabsTrigger value="additional" className="text-xs h-6 px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Additional Inputs
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1">
              <TabsContent value="basic" className="p-3 mt-0">
                <BasicInputs />
              </TabsContent>
              <TabsContent value="additional" className="p-3 mt-0">
                <div className="eng-section">
                  <div className="eng-section-title">Additional Inputs</div>
                  <p className="text-xs text-muted-foreground italic">
                    This section is under development. Additional input parameters will be available in a future update.
                  </p>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="eng-panel-header px-3 py-1.5 text-xs font-semibold shrink-0">
            Bridge Cross-Section Image
          </div>
          <div className="flex-1 flex items-center justify-center p-6 bg-card">
            <img src={bridgeImage} alt="Bridge Cross-Section" className="max-w-full max-h-full object-contain border border-border rounded-sm" />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="eng-toolbar flex items-center px-4 h-6 text-[11px] shrink-0 border-t border-border">
        <span className="text-toolbar-foreground/50">Ready</span>
      </div>
    </div>;
};
export default Index;