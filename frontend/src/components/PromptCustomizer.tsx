import { useState } from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PromptCustomizerProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const DEFAULT_PROMPTS = [
  {
    title: "Meeting Summary",
    prompt: "Summarize this meeting transcript with key decisions, action items, and important discussions. Include participant names and deadlines if mentioned."
  },
  {
    title: "Action Items Only",
    prompt: "Extract only the action items and tasks from this transcript. Format as a bulleted list with responsible parties and deadlines."
  },
  {
    title: "Key Decisions",
    prompt: "Focus on the key decisions made during this meeting. Include the reasoning behind each decision and any dissenting opinions."
  },
  {
    title: "Executive Summary",
    prompt: "Create a concise executive summary highlighting the most important points, outcomes, and next steps from this meeting."
  }
];

export const PromptCustomizer = ({ prompt, onPromptChange }: PromptCustomizerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-4 bg-surface-elevated border-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between text-foreground hover:bg-surface"
          >
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-primary" />
              <span>Customize Summary Instructions</span>
            </div>
            <Sparkles className="h-4 w-4 text-primary" />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4 mt-4">
          {/* Quick Templates */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quick Templates:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {DEFAULT_PROMPTS.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 border-border hover:border-primary"
                  onClick={() => onPromptChange(template.prompt)}
                >
                  <div>
                    <div className="font-medium text-foreground">{template.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {template.prompt}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Custom Instructions:</label>
            <Textarea
              placeholder="Describe how you want the AI to summarize your transcript..."
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              className="bg-surface border-border focus:border-primary"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};