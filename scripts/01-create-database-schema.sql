-- HR Appraisal System Database Schema
-- This script creates all necessary tables for the HR management system

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    head_of_department_id INTEGER,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department_id INTEGER REFERENCES departments(id),
    position VARCHAR(255),
    phone VARCHAR(50),
    join_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    reporting_manager_id INTEGER REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint for department head
ALTER TABLE departments 
ADD CONSTRAINT fk_department_head 
FOREIGN KEY (head_of_department_id) REFERENCES employees(id);

-- Appraisal forms table
CREATE TABLE IF NOT EXISTS appraisal_forms (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id INTEGER REFERENCES departments(id),
    created_by INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workflows table
CREATE TABLE IF NOT EXISTS workflows (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workflow steps table
CREATE TABLE IF NOT EXISTS workflow_steps (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER REFERENCES workflows(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    level VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appraisals table
CREATE TABLE IF NOT EXISTS appraisals (
    id SERIAL PRIMARY KEY,
    form_id INTEGER REFERENCES appraisal_forms(id),
    workflow_id INTEGER REFERENCES workflows(id),
    appraisee_id INTEGER REFERENCES employees(id),
    appraisee_status VARCHAR(50) DEFAULT 'pending',
    hod_status VARCHAR(50) DEFAULT 'pending',
    divisional_head_status VARCHAR(50) DEFAULT 'pending',
    group_head_status VARCHAR(50) DEFAULT 'pending',
    committee_status VARCHAR(50) DEFAULT 'pending',
    score INTEGER,
    reasons TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appraisal responses table
CREATE TABLE IF NOT EXISTS appraisal_responses (
    id SERIAL PRIMARY KEY,
    appraisal_id INTEGER REFERENCES appraisals(id) ON DELETE CASCADE,
    reviewer_id INTEGER REFERENCES employees(id),
    reviewer_type VARCHAR(50), -- 'appraisee', 'hod', 'divisional_head', etc.
    comments TEXT,
    rating INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    submitted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics and metrics table
CREATE TABLE IF NOT EXISTS hr_metrics (
    id SERIAL PRIMARY KEY,
    metric_type VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2),
    metric_date DATE NOT NULL,
    department_id INTEGER REFERENCES departments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_manager ON employees(reporting_manager_id);
CREATE INDEX IF NOT EXISTS idx_appraisals_appraisee ON appraisals(appraisee_id);
CREATE INDEX IF NOT EXISTS idx_appraisals_form ON appraisals(form_id);
CREATE INDEX IF NOT EXISTS idx_workflow_steps_workflow ON workflow_steps(workflow_id);
CREATE INDEX IF NOT EXISTS idx_hr_metrics_date ON hr_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);
