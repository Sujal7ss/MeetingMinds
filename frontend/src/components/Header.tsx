import { Bot, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-border bg-surface-elevated/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-ai-gradient rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-ai-gradient p-2 rounded-lg">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MeetingMind</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Meeting Summarizer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};