-- Add task_id column and make submitter_name have a default
ALTER TABLE public.prompt_submissions 
ADD COLUMN task_id TEXT;

-- Update submitter_name to have a default value so it's not required
ALTER TABLE public.prompt_submissions 
ALTER COLUMN submitter_name SET DEFAULT 'Anonymous';