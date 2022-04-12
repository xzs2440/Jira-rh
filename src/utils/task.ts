import React, { useCallback, useEffect } from "react";
import { useHttp } from "request/http";
import { useQuery } from "react-query";
import { Task } from "types/task";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
