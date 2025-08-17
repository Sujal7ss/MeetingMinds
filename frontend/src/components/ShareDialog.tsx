import { useState } from 'react';
import { X, Mail, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { emailService } from '@/services/api';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
}

export const ShareDialog = ({ isOpen, onClose, summary }: ShareDialogProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addRecipient = () => {
    const email = emailInput.trim().toLowerCase();
    if (email && isValidEmail(email) && !recipients.includes(email)) {
      setRecipients([...recipients, email]);
      setEmailInput('');
    } else if (recipients.includes(email)) {
      toast({
        title: "Email already added",
        description: "This email is already in the recipient list.",
        variant: "destructive",
      });
    } else if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRecipient();
    }
  };

  const shareViaEmail = async () => {
    if (recipients.length === 0) {
      toast({
        title: "No recipients",
        description: "Please add at least one email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    
    try {
      await emailService.sendSummaryEmail(
        recipients,
        'Meeting Summary',
        summary
      );
      
      toast({
        title: "Summary shared successfully!",
        description: `Sent to ${recipients.length} recipient${recipients.length > 1 ? 's' : ''}.`,
      });
      
      setRecipients([]);
      onClose();
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "There was an error sending the summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface-elevated border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Share Summary</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Add Recipients</label>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-surface border-border focus:border-primary"
              />
              <Button
                onClick={addRecipient}
                variant="outline"
                className="border-border hover:border-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Recipients List */}
          {recipients.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Recipients</label>
              <div className="flex flex-wrap gap-2">
                {recipients.map((email) => (
                  <Badge 
                    key={email} 
                    variant="secondary" 
                    className="bg-surface border-border text-foreground"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    {email}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRecipient(email)}
                      className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Summary Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Summary Preview</label>
            <div className="max-h-40 overflow-y-auto p-3 bg-surface rounded-lg border border-border">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {summary.length > 200 ? `${summary.substring(0, 200)}...` : summary}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-border hover:border-primary"
            >
              Cancel
            </Button>
            <Button
              onClick={shareViaEmail}
              disabled={recipients.length === 0 || isSharing}
              className="bg-ai-gradient hover:opacity-90 text-primary-foreground"
            >
              {isSharing ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Summary
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};