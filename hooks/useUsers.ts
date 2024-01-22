"use client";
import useSWR from "swr";
import fetcher from "../libs/axios";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
