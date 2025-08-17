import { useState } from 'react';
import { Header } from '@/components/Header';
import { TranscriptUpload } from '@/components/TranscriptUpload';
import { PromptCustomizer } from '@/components/PromptCustomizer';
import { SummaryEditor } from '@/components/SummaryEditor';
import { ShareDialog } from '@/components/ShareDialog';

const Index = () => {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState(
    "Summarize this meeting transcript with key decisions, action items, and important discussions. Include participant names and deadlines if mentioned."
  );
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleTranscriptSubmit = async (transcriptText: string) => {
    setTranscript(transcriptText);
    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          transcript: transcriptText,
          prompt: prompt 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      // Fallback to a simple error message
      setSummary('# Error\n\nFailed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Upload Section */}
        <TranscriptUpload 
          onTranscriptSubmit={handleTranscriptSubmit}
          isLoading={isGenerating}
        />

        {/* Prompt Customization */}
        {transcript && (
          <PromptCustomizer 
            prompt={prompt}
            onPromptChange={setPrompt}
          />
        )}

        {/* Summary Section */}
        {(summary || isGenerating) && (
          <SummaryEditor
            summary={summary}
            onSummaryChange={setSummary}
            onShare={handleShare}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* Share Dialog */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        summary={summary}
      />
    </div>
  );
};

export default Index;