import React, { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { Project } from "types/Project";
import { cleanObj } from "utils";
import { useHttp } from "request/http";
import { User } from "types/User";
import { useQuery } from "react-query";

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
