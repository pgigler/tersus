import CMS from "netlify-cms-app";
import "../assets/main.scss";

import ProductPagePreview from "./preview-templates/ProductPagePreview";
CMS.registerPreviewTemplate("products", ProductPagePreview);
