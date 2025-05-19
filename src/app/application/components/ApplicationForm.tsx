import { useState } from "react";

import Form from "@/app/components/Form/Form";

import { APPLICATION_LOCAL_STORAGE_KEY } from "@/const/APPLICATION_LOCAL_STORAGE_KEY";

import type { Form as ApplicationForm } from "@/app/application/interfaces/ApplicationForm";

export default function ApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const getUpdatedValues = (values: ApplicationForm["initialValues"]) => {
    const {} = values;

    const updatedValues = {};

    return updatedValues;
  };

  const getBody = (updatedValues: ApplicationForm["initialValues"]) => {
    return {};
  };

  return (
    <Form
      form={form}
      LOCAL_STORAGE_KEY={APPLICATION_LOCAL_STORAGE_KEY}
      getUpdatedValues={getUpdatedValues}
      getBody={getBody}
      setIsLoading={setIsLoading}
      isBranding={true}
    ></Form>
  );
}
