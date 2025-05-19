"use client";

import { useRef, useState } from "react";

import Form from "@/app/components/Form/Form";
import ProductDetails from "./ProductDetails/ProductDetails";
import Design from "./Design/Design";
import Content from "./Content/Content";
import Frontend from "./Frontend/Frontend";
import Backend from "./Backend/Backend";
import HostingServices from "./HostingServices/HostingServices";
import Additions from "./Additions/Additions";

import { productForm } from "@/app/product/config/productForm.config";
import { getFilteredInputList, getFilteredItems } from "@/lib/helpers";
import { PRODUCT_LOCAL_STORAGE_KEY } from "@/const/PRODUCT_LOCAL_STORAGE_KEY";

import type { Form as ProductForm } from "@/app/product/interfaces/Form";

export default function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const isBrandingRef = useRef(false);

  const getUpdatedValues = (values: ProductForm["initialValues"]) => {
    isBrandingRef.current = values.design.branding.includes("Yes, we have");

    const { product_details, design, content } = values;

    const updatedValues = {
      ...values,
      product_details: {
        ...product_details,
        competitors: getFilteredInputList(product_details.competitors),
      },
      design: {
        ...design,
        style_references: getFilteredItems(
          design.style_references,
          "likes_dislikes"
        ),
        own_style_references: getFilteredInputList(design.own_style_references),
      },
      content: {
        ...content,
        content_pages: getFilteredItems(content.content_pages, "description"),
      },
    };

    return updatedValues;
  };

  const getBody = (updatedValues: ProductForm["initialValues"]) => {
    return {
      type: "product",
      name: updatedValues.product_details.name,
      email: updatedValues.product_details.email,
      values: updatedValues,
    };
  };

  return (
    <Form
      form={productForm}
      LOCAL_STORAGE_KEY={PRODUCT_LOCAL_STORAGE_KEY}
      getUpdatedValues={getUpdatedValues}
      getBody={getBody}
      setIsLoading={setIsLoading}
      isBranding={isBrandingRef.current}
    >
      <ProductDetails />
      <Design />
      <Content />
      <Frontend />
      <Backend />
      <HostingServices />
      <Additions isLoading={isLoading} />
    </Form>
  );
}
