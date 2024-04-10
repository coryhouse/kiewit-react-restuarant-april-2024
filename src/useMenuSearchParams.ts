import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Tag, tagSchema } from "./types";

const TAG = "tag";
const FULL_TEXT_SEARCH = "fullTextSearch";

export function useMenuSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const fullTextSearch =
    z.string().nullable().parse(searchParams.get(FULL_TEXT_SEARCH)) ?? "";
  const tag = searchParams.get(TAG)
    ? tagSchema.parse(searchParams.get(TAG))
    : "";

  return {
    fullTextSearch,
    tag,
    setTag: (tag: Tag | "") => {
      if (tag !== "") tagSchema.parse(tag);
      setSearchParams((prev) => {
        tag === "" ? prev.delete(TAG) : prev.set(TAG, tag);
        return prev;
      });
    },
    setFullTextSearch: (fullTextSearch: string) => {
      setSearchParams((prev) => {
        fullTextSearch === ""
          ? prev.delete(FULL_TEXT_SEARCH)
          : prev.set(FULL_TEXT_SEARCH, fullTextSearch);
        return prev;
      });
    },
  };
}
