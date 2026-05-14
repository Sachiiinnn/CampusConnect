import { useState } from 'react';
import { MessageSquare, Send, Trash2 } from 'lucide-react'; // Added Trash2
import { eventsApi } from '../services/eventsApi';
import { toast } from 'sonner';
import { useAuth } from '../../auth/context/AuthContext';

export function FAQSection({ event, onFaqAdded }) {
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, isAdmin } = useAuth(); // Extracted isAdmin

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setSubmitting(true);
    try {
      await eventsApi.addFaq(event._id, question);
      toast.success('Question added successfully!');
      setQuestion('');
      if (onFaqAdded) onFaqAdded();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add question');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFaq = async (faqId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await eventsApi.deleteFaq(event._id, faqId);
      toast.success("Question deleted");
      if (onFaqAdded) onFaqAdded(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Failed to delete");
    }
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-xl font-semibold mb-4">Discussions & FAQs</h3>
      
      <div className="space-y-4 mb-6">
        {!event.faqs || event.faqs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg border border-dashed text-muted-foreground">
            <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
            <p>No questions yet. Start a discussion!</p>
          </div>
        ) : (
          event.faqs.map((faq, index) => {
            // Check if the current user is the author of this specific FAQ
            const isAuthor = user?.id === faq.author?._id || user?.id === faq.author;
            const canDelete = isAdmin || isAuthor;

            return (
              <div key={faq._id || index} className="p-4 bg-muted/20 rounded-lg border relative group pr-12">
                <p className="font-medium">{faq.question}</p>
                {/* Optional: Show who asked the question */}
                {faq.author && faq.author.username && (
                  <p className="text-xs text-muted-foreground mt-1">Asked by {faq.author.username}</p>
                )}
                
                {/* Delete Button */}
                {canDelete && (
                  <button
                    onClick={() => handleDeleteFaq(faq._id)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question (be specific)..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || !question.trim()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {submitting ? '...' : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}