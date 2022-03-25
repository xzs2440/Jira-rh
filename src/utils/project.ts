import React, { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "pages/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "request/http";
export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("projects", { data: cleanObj(param || {}) }));
  }, [param]);
  return result;
};
