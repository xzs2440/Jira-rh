import React, { useCallback, useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "pages/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "request/http";
export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObj(param || {}) }),
    [param, client]
  );
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, fetchProjects]); // param变化的时候会触发
  return result;
};
// 编辑list
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, { data: params, method: "PATCH" })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
// 添加list
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, { data: params, method: "POST" })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
