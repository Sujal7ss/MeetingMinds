import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface TranscriptUploadProps {
  onTranscriptSubmit: (transcript: string) => void;
  isLoading?: boolean;
}

export const TranscriptUpload = ({ onTranscriptSubmit, isLoading }: TranscriptUploadProps) => {
  const [transcript, setTranscript] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTranscript(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/json': ['.json']
    },
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
    setTranscript('');
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onTranscriptSubmit(transcript.trim());
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-surface-elevated border-border">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Upload Transcript</h2>
        
        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'border-primary bg-ai-gradient-subtle' 
              : 'border-border hover:border-primary/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop your transcript here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-foreground font-medium">Drag & drop a transcript file here</p>
              <p className="text-muted-foreground text-sm">or click to browse (.txt, .md, .json)</p>
            </div>
          )}
        </div>

        {/* Uploaded File Display */}
        {uploadedFile && (
          <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{uploadedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Or paste your transcript directly:</label>
          <Textarea
            placeholder="Paste your meeting transcript, notes, or any text content here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-[200px] bg-surface border-border focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!transcript.trim() || isLoading}
          className="w-full bg-ai-gradient hover:opacity-90 text-primary-foreground font-medium py-3"
        >
          {isLoading ? 'Processing...' : 'Generate Summary'}
        </Button>
      </div>
    </Card>
  );
};