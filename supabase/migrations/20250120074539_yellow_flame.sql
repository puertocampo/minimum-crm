/*
  # Beauty Clinic CRM Schema

  1. New Tables
    - `visitors`
      - `id` (text, primary key)
      - `name` (text)
      - `birthday` (date)
    - `operations`
      - `id` (text, primary key)
      - `name` (text)
      - `time_minutes` (integer)
      - `price` (integer)
    - `reservations`
      - `id` (text, primary key)
      - `start_at` (timestamptz)
      - `end_at` (timestamptz)
      - `operation_id` (text, foreign key)
      - `visitor_id` (text, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and modify data
*/

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id text PRIMARY KEY,
  name text NOT NULL,
  birthday date NOT NULL
);

-- Create operations table
CREATE TABLE IF NOT EXISTS operations (
  id text PRIMARY KEY,
  name text NOT NULL,
  time_minutes integer NOT NULL,
  price integer NOT NULL
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id text PRIMARY KEY,
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  operation_id text REFERENCES operations(id) NOT NULL,
  visitor_id text REFERENCES visitors(id) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON visitors
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON operations
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON reservations
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON visitors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON operations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON reservations
  FOR INSERT WITH CHECK (true);

-- Insert initial data
INSERT INTO visitors (id, name, birthday)
VALUES ('visitor_1', 'メディカル太郎', '2000-01-01');

INSERT INTO operations (id, name, time_minutes, price)
VALUES ('operation_1', 'ヒゲ脱毛', 60, 10000);

INSERT INTO reservations (id, start_at, end_at, operation_id, visitor_id)
VALUES (
  'reservation_1',
  '2025-01-01 10:00:00.000000+00',
  '2025-01-01 11:00:00.000000+00',
  'operation_1',
  'visitor_1'
);