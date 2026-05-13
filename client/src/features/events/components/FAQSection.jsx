import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { eventsApi } from '../services/eventsApi';
import { toast } from 'sonner';

export function FAQSection({ event, onFaqAdded }) {
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
          event.faqs.map((faq, index) => (
            <div key={faq._id || index} className="p-4 bg-muted/20 rounded-lg border">
              <p className="font-medium">{faq.question}</p>
            </div>
          ))
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
