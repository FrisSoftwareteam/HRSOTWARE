export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

export interface User {
  id: number
  email: string
  name: string
  role: string
  created_at: Date
}

export interface Employee {
  id: number
  user_id: number
  employee_id: string
  department_id: number
  position: string
  phone: string
  join_date: Date
  status: string
  reporting_manager_id?: number
}

export interface Department {
  id: number
  name: string
  description: string
  head_of_department_id?: number
  status: string
  created_at: Date
}

export interface AppraisalForm {
  id: number
  title: string
  description: string
  department_id: number
  created_by: number
  status: string
  created_at: Date
}

export interface Workflow {
  id: number
  title: string
  description: string
  created_by: number
  status: string
  created_at: Date
}

export interface WorkflowStep {
  id: number
  workflow_id: number
  step_order: number
  level: string
  designation: string
}

export interface Appraisal {
  id: number
  form_id: number
  workflow_id: number
  appraisee_id: number
  appraisee_status: string
  hod_status: string
  divisional_head_status: string
  group_head_status: string
  committee_status: string
  score?: number
  reasons?: string
  created_at: Date
}

// Mock database functions for demonstration
// In a real application, these would connect to an actual database

export class DatabaseService {
  private static instance: DatabaseService
  private connected = false

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  async connect(config: DatabaseConfig): Promise<void> {
    // Mock connection logic
    console.log("[v0] Connecting to database:", config.host)
    this.connected = true
  }

  async disconnect(): Promise<void> {
    this.connected = false
  }

  isConnected(): boolean {
    return this.connected
  }

  // User operations
  async createUser(userData: Omit<User, "id" | "created_at">): Promise<User> {
    // Mock user creation
    return {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      created_at: new Date(),
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    // Mock user lookup
    return null
  }

  async getUserById(id: number): Promise<User | null> {
    // Mock user lookup
    return null
  }

  // Employee operations
  async createEmployee(employeeData: Omit<Employee, "id">): Promise<Employee> {
    return {
      id: Math.floor(Math.random() * 1000),
      ...employeeData,
    }
  }

  async getEmployeesByDepartment(departmentId: number): Promise<Employee[]> {
    return []
  }

  async getAllEmployees(): Promise<Employee[]> {
    return []
  }

  // Department operations
  async createDepartment(departmentData: Omit<Department, "id" | "created_at">): Promise<Department> {
    return {
      id: Math.floor(Math.random() * 1000),
      ...departmentData,
      created_at: new Date(),
    }
  }

  async getAllDepartments(): Promise<Department[]> {
    return []
  }

  // Appraisal Form operations
  async createAppraisalForm(formData: Omit<AppraisalForm, "id" | "created_at">): Promise<AppraisalForm> {
    return {
      id: Math.floor(Math.random() * 1000),
      ...formData,
      created_at: new Date(),
    }
  }

  async getAppraisalFormsByDepartment(departmentId: number): Promise<AppraisalForm[]> {
    return []
  }

  // Workflow operations
  async createWorkflow(workflowData: Omit<Workflow, "id" | "created_at">): Promise<Workflow> {
    return {
      id: Math.floor(Math.random() * 1000),
      ...workflowData,
      created_at: new Date(),
    }
  }

  async createWorkflowStep(stepData: Omit<WorkflowStep, "id">): Promise<WorkflowStep> {
    return {
      id: Math.floor(Math.random() * 1000),
      ...stepData,
    }
  }

  async getWorkflowSteps(workflowId: number): Promise<WorkflowStep[]> {
    return []
  }

  // Appraisal operations
  async createAppraisal(appraisalData: Omit<Appraisal, "id" | "created_at">): Promise<Appraisal> {
    return {
      id: Math.floor(Math.random() * 1000),
      ...appraisalData,
      created_at: new Date(),
    }
  }

  async getAppraisalsByEmployee(employeeId: number): Promise<Appraisal[]> {
    return []
  }

  async updateAppraisalStatus(appraisalId: number, statusType: string, status: string): Promise<void> {
    // Mock status update
    console.log("[v0] Updating appraisal status:", { appraisalId, statusType, status })
  }

  // Analytics operations
  async getHRMetrics(startDate: Date, endDate: Date): Promise<any[]> {
    return []
  }

  async getDepartmentMetrics(departmentId: number): Promise<any[]> {
    return []
  }

  // Audit operations
  async logAction(
    userId: number,
    action: string,
    tableName: string,
    recordId: number,
    oldValues?: any,
    newValues?: any,
  ): Promise<void> {
    console.log("[v0] Audit log:", { userId, action, tableName, recordId })
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance()
