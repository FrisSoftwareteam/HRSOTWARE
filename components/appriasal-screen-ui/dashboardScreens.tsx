"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableResultLogs } from "./Datatable/datatableUI";
import { DatatableColumnUserResultLog2 } from "@/components/datatable/datatableColumnUserResultLog2";
// import { EmployeeResultLog } from "@/components/employee-result-log";
// import { EmployeeDetails } from "@/components/employee-details";
// import { AssessmentCard } from "@/components/assessment-card";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useGetAnswerId } from "@/zustand/store";
import StepperForm from "../multi-steppper/multi-stepper";

export function DashboardGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ["dataResultLogs"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-all-answers`)
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { getAnsId, user, data: data1 } = useGetAnswerId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[800px]">
      {/* Left Column - Two Cards (40% width) */}
      <div className="lg:col-span-2 grid grid-rows-2 gap-6">
        {/* Employee Result Log Card */}
        <Card className="bg-card shadow-sm border-border overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Employee Result Log
            </CardTitle>
            <p className="text-sm text-muted-foreground">View result log(s)</p>
          </CardHeader>
          <CardContent className="p-2 h-[calc(100%-5rem)] overflow-hidden">
            {/* <EmployeeResultLog /> */}

            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-20 w-25 flex item-center animate-spin" />
              </div>
            ) : (
              <DataTableResultLogs
                data={!data ? [] : data}
                columns={DatatableColumnUserResultLog2}
                pageSize={6}
                searchPlaceholder="Search appraisal namme"
              />
            )}
          </CardContent>
        </Card>

        {/* Employee Details Card */}
        <Card className="bg-card shadow-sm border-border overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Employee Details
            </CardTitle>
            <p className="text-sm text-muted-foreground">View result log(s)</p>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-5rem)] overflow-hidden">
            {/* <EmployeeDetails /> */}
            <>Biodun</>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Assessment Card (60% width) */}
      <div className="lg:col-span-3">
        <Card className="bg-card shadow-sm border-border h-full overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Assessment
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              View the assessments
            </p>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-5rem)] overflow-hidden">
            {/* <AssessmentCard /> */}
            <StepperForm id={data1} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
