import { Form } from "@/app/product/interfaces/Form";

export function getContentData(content: Form["initialValues"]["content"]) {
  return [
    {
      label: "Do you have content?:",
      value: content.is_content,
    },
    {
      label: "Content URL:",
      value: content.content_url,
    },
    {
      label: "Content pages:",
      value: content.content_pages,
    },
  ];
}
