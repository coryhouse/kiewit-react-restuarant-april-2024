import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Tag, tagSchema } from "./types";

const TAG = "tag";
const FULL_TEXT_SEARCH = "fullTextSearch";

export function useMenuSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function parseTag(tag: string | null) {
    if (tag === null) return "";
    const parsed = tagSchema.safeParse(tag);
    if (parsed.success) return parsed.data;
    console.log("Invalid tag:", parsed.error.message);

    // If the tag is invalid, ignore it.
    return "";
  }

  const fullTextSearch =
    z.string().nullable().parse(searchParams.get(FULL_TEXT_SEARCH)) ?? "";
  const tag = parseTag(searchParams.get(TAG));

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
