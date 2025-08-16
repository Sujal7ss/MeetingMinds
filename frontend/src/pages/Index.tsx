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
    
    // Simulate AI generation (replace with actual AI API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI-generated summary
    const mockSummary = `# Meeting Summary

## Key Decisions Made
- Approved the new product roadmap for Q2 2024
- Selected React and TypeScript for the frontend architecture
- Agreed to implement the MVC pattern for better code organization

## Action Items
- **John Smith**: Prepare technical specifications by March 15th
- **Sarah Johnson**: Set up development environment by March 10th
- **Mike Chen**: Review security requirements by March 12th

## Important Discussions
The team discussed the importance of scalable architecture and decided to use Supabase for backend services. There was consensus on implementing proper error handling and user authentication from the start.

## Next Steps
1. Begin development phase
2. Schedule weekly check-ins
3. Set up CI/CD pipeline

**Meeting Duration**: 45 minutes  
**Participants**: John Smith, Sarah Johnson, Mike Chen, Lisa Wang  
**Date**: ${new Date().toLocaleDateString()}`;

    setSummary(mockSummary);
    setIsGenerating(false);
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