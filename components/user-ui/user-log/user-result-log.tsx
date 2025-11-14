"use client";

import { useQuery } from "@tanstack/react-query";

import { useUser } from "@clerk/nextjs";
import { DataTableUserResultLog } from "@/components/datatable/data-tableUserResultLog";
import { DatatableColumnUserResultLog } from "@/components/datatable/datatableColumnUserResultLog";

const UserResultLog = () => {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["dataResultLogs"],
    queryFn: async () => {
      try {
        return await fetch(
          `/api/get-user-result/${user?.emailAddresses[0]?.emailAddress}`
        )
          .then((res: any) => res.json())
          .then((data: any) => data.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(data);
  return (
    <div>
      {" "}
      <div className="mb-5 font-semibold">
        To accept or reject the evaluation score, you can navigate with your
        name, below where your status indicates{" "}
        <span className="bg-orange-500 w-24 text-white rounded-md p-1">
          TREATED
        </span>{" "}
      </div>
      <DataTableUserResultLog
        data={!data ? [] : data}
        columns={DatatableColumnUserResultLog}
      />{" "}
    </div>
  );
};

export default UserResultLog;
