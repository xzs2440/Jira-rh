import React, { useCallback, useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "types/Project";
import { cleanObj } from "utils";
import { useHttp } from "request/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "pages/project-list/util";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
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
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const queryClient = useQueryClient();
  // const [searchParams] = useProjectsSearchParams();
  // const queryKey = ["projects", useProjectsSearchParams()];
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: "PATCH" }),
    useEditConfig(queryKey)
    // {
    //   onSuccess: () => queryClient.invalidateQueries(queryKey),
    //   async onMutate(target) {
    //     const previousItems = queryClient.getQueryData(queryKey);
    //     queryClient.setQueryData(queryKey, (old?: Project[]) => {
    //       return (
    //         old?.map((project) =>
    //           project.id === target.id ? { ...project, ...target } : project
    //         ) || []
    //       );
    //     });
    //     return { previousItems };
    //   },
    //   onError(error, newItem, context: any) {
    //     queryClient.setQueryData(
    //       queryKey,
    //       context.previousItems // === (context as { previousItems: Project[] }).previousItems
    //     );
    //   },
    // }
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
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { data: params, method: "POST" }),
    useAddConfig(queryKey)
    // {
    //   onSuccess: () => queryClient.invalidateQueries("projects"),
    // }
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
// 删除list
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
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
