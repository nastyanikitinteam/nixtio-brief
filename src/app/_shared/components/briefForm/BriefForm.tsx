"use client";
import { Formik } from "formik";
import { initialBriefFormValues } from "@/config/form";
import type { BriefFormProps } from "@/types/form";
import { validationOrder } from "@/shemas/form";
import jsPDF from "jspdf";
import { useEffect, useActionState } from "react";
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
    const pdfContent = generatePDF(values);

    sendEmailAction({ ...values, pdf: pdfContent });
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
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik initialValues={initialBriefFormValues} validationSchema={validationOrder} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} onBlur={handleBlur} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} onBlur={handleBlur} />
            <input type="text" name="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
            <textarea name="message" placeholder="Message" onChange={handleChange} onBlur={handleBlur} />

            {errors.fullName && touched.fullName && <div>{errors.fullName}</div>}
            {errors.phoneNumber && touched.phoneNumber && <div>{errors.phoneNumber}</div>}
            {errors.email && touched.email && <div>{errors.email}</div>}
            {errors.message && touched.message && <div>{errors.message}</div>}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Basic;
