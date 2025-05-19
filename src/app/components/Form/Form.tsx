"use client";

import { useState, useEffect } from "react";

import { useFormik, FormikProvider } from "formik";

import Modal from "@/ui/Modal/Modal";

import type { Form } from "@/interfaces/Form";
import type { Form as ProductForm } from "@/app/product/interfaces/Form";
import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";
import type { ApplicationForm } from "@/app/application/interfaces/ApplicationForm";

export default function Form<
  T extends ProductForm["initialValues"] | BrandingForm["initialValues"] | ApplicationForm["initialValues"],
>({
  form,
  LOCAL_STORAGE_KEY,
  getUpdatedValues,
  getBody,
  setIsLoading,
  isBranding,
  children,
}: Form<T>) {
  const [storedData, setStoredData] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    setStoredData(data ? (JSON.parse(data) as T) : null);
  }, [LOCAL_STORAGE_KEY]);

  const formik = useFormik<T>({
    ...form,
    initialValues: {
      ...form.initialValues,
      ...(storedData as T),
    },
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      setIsLoading(true);

      const updatedValues = getUpdatedValues(values);

      try {
        await fetch("/api/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getBody(updatedValues)),
        });

        actions.resetForm({ values: form.initialValues as T });
        setStoredData(null);
        setIsModalOpen(true);
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formik.values));
  }, [LOCAL_STORAGE_KEY, formik.values]);

  return (
    <FormikProvider value={formik}>
      <form style={{ display: "flex", flexDirection: "column" }}>
        {children}

        {isModalOpen && (
          <Modal isBranding={isBranding} setIsModalOpen={setIsModalOpen} />
        )}
      </form>
    </FormikProvider>
  );
}
