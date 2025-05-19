'use client';
import { useState } from "react";

import Form from "@/app/components/Form/Form";

import { APPLICATION_LOCAL_STORAGE_KEY } from "@/const/APPLICATION_LOCAL_STORAGE_KEY";

import { applicationFormConfig as form } from "@/app/application/config/applicationForm.config";
import type { ApplicationForm } from "@/app/application/interfaces/ApplicationForm";

export default function ApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const getUpdatedValues = (values: ApplicationForm["initialValues"]) => {
    const {} = values;

    const updatedValues = { ...values,};


    return updatedValues;
  };

  const getBody = (updatedValues: ApplicationForm["initialValues"]) => {
    return {
      type: "branding",
      name: updatedValues.product_details.name,
      email: updatedValues.product_details.email,
      company: updatedValues.product_details.product_name,
      values: updatedValues,
    };
  };


  return (
    <Form
      form={form}
      LOCAL_STORAGE_KEY={APPLICATION_LOCAL_STORAGE_KEY}
      getUpdatedValues={getUpdatedValues}
      getBody={getBody}
      setIsLoading={setIsLoading}
      isBranding={true}
    >
      Test
      {isLoading && <div>Loading...</div>}
    </Form>
  );
}
