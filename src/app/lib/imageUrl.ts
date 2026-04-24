import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

export function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}

export function fileUrl(source: any) {
  if (!source?.asset?._ref)
    return {
      url: "#",
    };

  const { projectId, dataset } = client.config();
  const ref = source.asset._ref;
  // ref format: file-{id}-{extension}
  const parts = ref.split("-");
  const id = parts.slice(1, -1).join("-");
  const extension = parts[parts.length - 1];
  const filename = source.asset.originalFilename;

  return {
    url: `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`,
    filename,
  };
}
