import useSWR from "swr";
import fetcher from "../libs/axios";

const usePosts = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/posts", fetcher,{
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default usePosts;
