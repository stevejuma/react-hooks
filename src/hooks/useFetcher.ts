import { useEffect, useState } from "../React";
type Options = { [key: string]: any };
type ErrorMessage = string | null;

export const useFetcher = (
  initialUrl: string,
  options?: Options | undefined,
) => {
  let [url, setUrl] = useState<string>(initialUrl);
  let [data, setData] = useState<any>(null);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [error, setError] = useState<ErrorMessage>();

  const setLoading = (isLoading: boolean = true) => {
    setIsLoading(isLoading);
    if (isLoading === true) {
      setError(null);
      setData(null);
    }
  };

  const fetchData = async (): Promise<[ErrorMessage, any]> => {
    try {
      const res = await fetch(url, options);
      if (!res.ok)
        throw new Error(`Unexpected error occurred (status ${res.status})`);

      const data = await res.json();
      return [null, data];
    } catch (e: any) {
      const { errorMessage = "Unexpected error eccurred" } = e;
      return [errorMessage, null];
    }
  };

  const handleUrlChange = async (currentUrl: string) => {
    setLoading(true);

    const [err, response] = await fetchData();
    if (currentUrl !== url) return;

    if (err) {
      setLoading(false);
      setError(err);
      return;
    }

    setLoading(false);
    setData(response);
  };

  useEffect(() => {
    handleUrlChange(url);
  }, [url]);

  return {
    get data() {
      return data;
    },
    get loading() {
      return isLoading;
    },
    get error() {
      return error;
    },
    get url() {
      return url;
    },
    set url(newUrl: any) {
      if (url !== newUrl) {
        setUrl(newUrl);
      }
    },
  };
};

export default useFetcher;
