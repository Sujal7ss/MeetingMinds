import { useState, useEffect } from 'react';
import { Save, Share, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SummaryEditorProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
  onShare: () => void;
  isGenerating?: boolean;
}

export const SummaryEditor = ({ 
  summary, 
  onSummaryChange, 
  onShare, 
  isGenerating 
}: SummaryEditorProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const { toast } = useToast();

  // Auto-save simulation (in real app, this would save to backend)
  useEffect(() => {
    if (summary && !isGenerating) {
      setAutoSaveStatus('saving');
      const timer = setTimeout(() => {
        setAutoSaveStatus('saved');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [summary, isGenerating]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Summary has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your summary is being downloaded.",
    });
  };

  if (isGenerating) {
    return (
      <Card className="p-6 bg-surface-elevated border-border">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="animate-pulse h-4 w-4 bg-primary rounded-full"></div>
            <h2 className="text-xl font-semibold text-foreground">Generating Summary...</h2>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-surface rounded animate-pulse"></div>
            <div className="h-4 bg-surface rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-surface rounded animate-pulse w-3/5"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4 bg-surface-elevated border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-foreground">Generated Summary</h2>
          <span className={`text-xs px-2 py-1 rounded-full ${
            autoSaveStatus === 'saved' 
              ? 'bg-success/20 text-success' 
              : autoSaveStatus === 'saving'
              ? 'bg-warning/20 text-warning'
              : 'bg-muted/20 text-muted-foreground'
          }`}>
            {autoSaveStatus === 'saved' && 'Saved'}
            {autoSaveStatus === 'saving' && 'Saving...'}
            {autoSaveStatus === 'unsaved' && 'Unsaved'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="border-border hover:border-primary"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadSummary}
            className="border-border hover:border-primary"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            onClick={onShare}
            className="bg-ai-gradient hover:opacity-90 text-primary-foreground"
            size="sm"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Textarea
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        placeholder="Your AI-generated summary will appear here..."
        className="min-h-[300px] bg-surface border-border focus:border-primary resize-none"
      />
    </Card>
  );
};