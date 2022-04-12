import React, { useCallback, useEffect } from "react";
import { useHttp } from "request/http";
import { useQuery } from "react-query";
import { TaskType } from "types/task-type";

export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
