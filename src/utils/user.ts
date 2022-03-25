import React, { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "pages/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "request/http";
import { User } from "pages/project-list/search-panel";
export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users", { data: cleanObj(param || {}) }));
  }, [param]);
  return result;
};
