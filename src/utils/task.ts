import React, { useCallback, useEffect } from "react";
import { useHttp } from "request/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";
import { SortProps } from "./kanban";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, { data: params, method: "POST" }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(
    ["tasks", { id }], // id变化的时候，触发
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id), // ===!!id  只有当id有值的时候，才会触发这个useProject函数
    }
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, { data: params, method: "PATCH" }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
