-- Create storage bucket for prompt submission attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('prompt-attachments', 'prompt-attachments', true);

-- Allow anyone to upload files to the bucket
CREATE POLICY "Anyone can upload prompt attachments"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'prompt-attachments');

-- Allow anyone to view uploaded attachments
CREATE POLICY "Anyone can view prompt attachments"
ON storage.objects
FOR SELECT
USING (bucket_id = 'prompt-attachments');

-- Add attachment_urls column to prompt_submissions table
ALTER TABLE public.prompt_submissions
ADD COLUMN attachment_urls TEXT[] DEFAULT '{}';