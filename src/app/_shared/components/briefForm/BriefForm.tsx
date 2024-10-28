"use client";
import { Formik } from "formik";
import { initialBriefFormValues } from "@/config/form";
import { validationOrder } from "@/shemas/form";
import jsPDF from "jspdf";

import styles from "./brief-form.module.scss";

const Basic = () => {
  const handleSubmit = async (values: any) => {
    const pdfContent = generatePDF(values); // Генерація PDF
    const base64PDF = btoa(pdfContent); // Перетворення PDF на base64

    // Надсилаємо запит на сервер
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailData: { ...values } }),
    });

    if (response.ok) {
      console.log("Email sent successfully!");
    } else {
      console.error("Failed to send email");
    }
  };

  const generatePDF = (values: any) => {
    const doc = new jsPDF();

    // Заголовок PDF
    doc.setFontSize(18);
    doc.text("Form Submission", 20, 20);

    // Додати значення полів форми
    doc.setFontSize(12);
    doc.text(`Full Name: ${values.fullName || ""}`, 20, 40);
    doc.text(`Phone Number: ${values.phoneNumber || ""}`, 20, 50);
    doc.text(`Email: ${values.email || ""}`, 20, 60);
    doc.text(`Message: ${values.message || ""}`, 20, 70);

    // Завантажити PDF
    doc.save("form_submission.pdf");
  };

  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik initialValues={initialBriefFormValues} validationSchema={validationOrder} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
