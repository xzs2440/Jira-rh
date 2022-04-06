import React, { useCallback, useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "pages/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "request/http";
import { useMutation, useQuery, useQueryClient } from "react-query";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObj(param || {}) }),
  //   [param, client]
  // );
  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param, run, fetchProjects]); // param变化的时候会触发
  // return result;
  // param变化的时候会触发
};
// 编辑list
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "PATCH" }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, { data: params, method: "PATCH" })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};
// 添加list
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { data: params, method: "POST" }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, { data: params, method: "POST" })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

// 获取list详情
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }], // id变化的时候，触发
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id), // ===!!id  只有当id有值的时候，才会触发这个useProject函数
    }
  );
};
