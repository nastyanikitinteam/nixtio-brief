"use client";
import { useEffect, useActionState } from "react";
import { Formik, Form, Field } from "formik";
import jsPDF from "jspdf";

import { initialBriefFormValues } from "@/config/form";
import type { BriefFormProps } from "@/types/form";
import { validationOrder } from "@/shemas/form";
import { sendEmail } from "@/actions";

import FormInput from "@components/formElements/formInput/FormInput";
import FormPhoneInput from "@components/formElements/formInput/FormPhoneInput";
import FormTextarea from "@components/formElements/formTextarea/FormTextarea";

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
    <div className={styles.container}>
      <Formik initialValues={initialBriefFormValues} validationSchema={validationOrder} onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field type="text" name="fullName" placeholder="Full Name" component={FormInput} />
            <Field type="text" name="phoneNumber" placeholder="Phone Number" component={FormPhoneInput} />
            <Field type="email" name="email" placeholder="Email" component={FormInput} />
            <Field type="text" name="message" placeholder="Message" component={FormTextarea} />

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
