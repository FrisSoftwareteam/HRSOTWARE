
import mongoose, { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema(
  {
    staff_id: String,
    fullnames: String,
    date_of_birth: String,
    age: String,
    date_employed: String,
    yearofentry: String,
    grade: String,
    designate: String,
    category: String,
    department: String,
    educational_qualification: String,
    additional_qualification: String,
    date_confirmed: String,
    gender: String,
    lastdatepromoted: String,
    nextofkin: String,
    leavedays: String,
    genotype: String,
    blood: String,
    bank_num: String,
    bank_name: String,
    pfacustodian: String,
    pfa: String,
    pension_num: String,
    state: String,
    lga: String,
    religion: String,
    phone: String,
    town: String,
    address: String,
    EmailAddress: String,
    services: String,
    ranking: String,
  },
  { timestamps: true }
);

// Avoid model overwrite error in dev
const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;