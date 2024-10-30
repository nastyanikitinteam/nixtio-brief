"use client";
import { useEffect, useActionState } from "react";
import { Formik } from "formik";
import jsPDF from "jspdf";
import cn from "classnames";

import ProductDetails from "@components/briefForm/steps/ProductDetails";
import { initialBriefFormValues } from "@/config/form";
import type { BriefFormProps } from "@/types/form";
import { validationOrder } from "@/shemas/form";
import { sendEmail } from "@/actions";

import styles from "./brief-form.module.scss";

const Basic = () => {
  const [sendEmailState, sendEmailAction] = useActionState(sendEmail, {
    error: null,
    success: false,
  });
  useEffect(() => {
    if (sendEmailState.success) {
      alert("Email sent!");
    }
    if (sendEmailState.error) {
      alert("Error sending email!");
    }
  }, [sendEmailState]);

  const handleSubmit = async (values: BriefFormProps) => {
    console.log(values);
    // const pdfContent = generatePDF(values);
    // sendEmailAction({ ...values, pdf: pdfContent });
  };

  const generatePDF = (values: BriefFormProps) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Form Submission", 20, 20);

    doc.setFontSize(12);
    doc.text(`Full Name: ${values.fullName || ""}`, 20, 40);
    doc.text(`Phone Number: ${values.phoneNumber || ""}`, 20, 50);
    doc.text(`Email: ${values.email || ""}`, 20, 60);
    doc.text(`Message: ${values.message || ""}`, 20, 70);

    return doc.output("datauristring").split(",")[1];
  };

  return (
    <Formik initialValues={initialBriefFormValues} validationSchema={validationOrder} onSubmit={handleSubmit} className={styles.form_container}>
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <ProductDetails />
          <div className={styles.container}>
            <div className={styles.info}></div>
            <div className={styles.main}>
              <button type="submit" disabled={isSubmitting} className={cn(styles.button, "default-button")}>
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Basic;
