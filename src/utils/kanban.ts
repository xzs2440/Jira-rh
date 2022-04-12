import React, { useCallback, useEffect } from "react";
import { useHttp } from "request/http";
import { Kanban } from "types/kanban";
import { useQuery } from "react-query";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
