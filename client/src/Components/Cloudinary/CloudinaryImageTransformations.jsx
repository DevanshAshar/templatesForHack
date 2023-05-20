import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export default function CloudinaryImageTransformations(
  publicID,
  options,
  height,
  width
) {
  const cloud = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
  });

  const img = cloud.image(publicID);

  if (options === "profilePic") {
    img
      .resize(
        thumbnail().height(height).width(width).gravity(focusOn(FocusOn.face()))
      )
      .roundCorners(max())
      .format("auto")
      .quality("auto");
  }

  return img;
}
