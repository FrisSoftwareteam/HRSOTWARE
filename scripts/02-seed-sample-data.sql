-- Sample data for HR Appraisal System
-- This script populates the database with sample data for testing

-- Insert sample users
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@company.com', '$2b$10$example_hash', 'Admin User', 'admin'),
('sarah.johnson@company.com', '$2b$10$example_hash', 'Sarah Johnson', 'manager'),
('michael.chen@company.com', '$2b$10$example_hash', 'Michael Chen', 'employee'),
('emily.rodriguez@company.com', '$2b$10$example_hash', 'Emily Rodriguez', 'manager'),
('david.kim@company.com', '$2b$10$example_hash', 'David Kim', 'employee'),
('lisa.thompson@company.com', '$2b$10$example_hash', 'Lisa Thompson', 'employee');

-- Insert sample departments
INSERT INTO departments (name, description, status) VALUES
('Human Resources', 'Manages employee relations, recruitment, and organizational development', 'active'),
('Engineering', 'Software development, system architecture, and technical innovation', 'active'),
('Sales', 'Revenue generation, client relationships, and market expansion', 'active'),
('Marketing', 'Brand management, digital marketing, and customer acquisition', 'active'),
('Finance', 'Financial planning, accounting, and budget management', 'active');

-- Insert sample employees
INSERT INTO employees (user_id, employee_id, department_id, position, phone, join_date, status) VALUES
(2, 'EMP001', 1, 'HR Director', '+1 (555) 123-4567', '2023-01-15', 'active'),
(3, 'EMP002', 2, 'Senior Developer', '+1 (555) 234-5678', '2022-08-20', 'active'),
(4, 'EMP003', 3, 'Sales Manager', '+1 (555) 345-6789', '2023-03-10', 'active'),
(5, 'EMP004', 4, 'Marketing Specialist', '+1 (555) 456-7890', '2023-06-01', 'active'),
(6, 'EMP005', 5, 'Financial Analyst', '+1 (555) 567-8901', '2022-11-15', 'active');

-- Update departments with heads
UPDATE departments SET head_of_department_id = 1 WHERE id = 1;
UPDATE departments SET head_of_department_id = 2 WHERE id = 2;
UPDATE departments SET head_of_department_id = 3 WHERE id = 3;
UPDATE departments SET head_of_department_id = 4 WHERE id = 4;
UPDATE departments SET head_of_department_id = 5 WHERE id = 5;

-- Insert sample appraisal forms
INSERT INTO appraisal_forms (title, description, department_id, created_by, status) VALUES
('Annual Performance Review 2025', 'Comprehensive annual performance evaluation for all employees', 1, 1, 'active'),
('Leadership Development Assessment', 'Assessment form for leadership development program participants', 1, 1, 'draft'),
('Quarterly Goal Review', 'Quarterly review of individual and team goals', 3, 1, 'active');

-- Insert sample workflows
INSERT INTO workflows (title, description, created_by, status) VALUES
('Standard Performance Review Workflow', 'Standard workflow for annual performance reviews', 1, 'active'),
('Leadership Assessment Workflow', 'Workflow for leadership development assessments', 1, 'active');

-- Insert workflow steps
INSERT INTO workflow_steps (workflow_id, step_order, level, designation) VALUES
(1, 1, 'Entry Level', 'Employee'),
(1, 2, 'Manager Level', 'Manager'),
(1, 3, 'Director Level', 'Director'),
(1, 4, 'Executive Level', 'VP'),
(2, 1, 'Manager Level', 'Manager'),
(2, 2, 'Director Level', 'Director'),
(2, 3, 'Executive Level', 'VP'),
(2, 4, 'Executive Level', 'CEO');

-- Insert sample appraisals
INSERT INTO appraisals (form_id, workflow_id, appraisee_id, appraisee_status, hod_status, divisional_head_status, group_head_status, score, reasons) VALUES
(1, 1, 2, 'submitted', 'submitted', 'pending', 'submitted', 30, 'Leadership Development Program'),
(1, 1, 3, 'submitted', 'submitted', 'pending', 'submitted', 30, 'Promotion');

-- Insert sample HR metrics
INSERT INTO hr_metrics (metric_type, metric_value, metric_date, department_id) VALUES
('employee_count', 301, CURRENT_DATE, NULL),
('new_hires', 20, CURRENT_DATE, NULL),
('turnover_rate', 2.7, CURRENT_DATE, NULL),
('satisfaction_score', 8.1, CURRENT_DATE, NULL),
('department_count', 85, CURRENT_DATE, 2),
('department_count', 45, CURRENT_DATE, 3),
('department_count', 38, CURRENT_DATE, 1),
('department_count', 32, CURRENT_DATE, 4),
('department_count', 25, CURRENT_DATE, 5);
