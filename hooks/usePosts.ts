import useSWR from "swr";
import fetcher from "../libs/axios";

const usePosts = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/posts", fetcher , {
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
  });

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default usePosts;
