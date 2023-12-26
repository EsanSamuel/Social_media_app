import useSWR from "swr";
import fetcher from "../libs/axios";

const usePosts = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/posts", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default usePosts;
