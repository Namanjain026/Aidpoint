-- Create feedback table in Supabase
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert feedback
CREATE POLICY "Users can insert feedback" ON feedback
    FOR INSERT WITH CHECK (true);

-- Policy to allow viewing feedback (you can restrict this later)
CREATE POLICY "Anyone can view feedback" ON feedback
    FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS feedback_category_idx ON feedback(category);
CREATE INDEX IF NOT EXISTS feedback_rating_idx ON feedback(rating);