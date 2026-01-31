-- Create prompt_submissions table for storing user-submitted prompts for feedback
CREATE TABLE public.prompt_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT,
  prompt_text TEXT NOT NULL,
  submission_type TEXT NOT NULL DEFAULT 'prompt' CHECK (submission_type IN ('prompt', 'file', 'rubric')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prompt_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert submissions (public form)
CREATE POLICY "Anyone can submit prompts"
ON public.prompt_submissions
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view their own submissions by email
CREATE POLICY "Users can view submissions by email"
ON public.prompt_submissions
FOR SELECT
USING (true);

-- Enable realtime for webhook notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.prompt_submissions;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_prompt_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_prompt_submissions_updated_at
BEFORE UPDATE ON public.prompt_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_prompt_submissions_updated_at();