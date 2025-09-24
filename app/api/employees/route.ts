import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Employee from "@/models/employees";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await connectToDatabase();
    const newEmployee = await Employee.create(data);

    return NextResponse.json(
      { message: "Employee created successfully", employee: newEmployee },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving employee:", error);
    return NextResponse.json(
      { error: "Failed to save employee" },
      { status: 500 }
    );
  }
}