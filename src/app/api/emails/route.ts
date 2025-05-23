import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";

import BrandingFormPdf from "@/app/branding/pdf/BrandingFormPdf";
import ProductFormPdf from "@/app/product/pdf/ProductFormPdf";
import SendPDFForm from "@/emails/SendPDFForm";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
  const { type, name, email, company, values } = await request.json();

  const isProductForm = type === "product";

  try {
    const pdfBuffer = await renderToBuffer(
      isProductForm ? ProductFormPdf({ values }) : BrandingFormPdf({ values })
    );
    const pdfBase64 = pdfBuffer.toString("base64");

    // hello@nixtio.com

    await resend.emails.send({
      from: "noreply@nixtio.com",
      to: [email, "hello@nixtio.com", "kibkaloanastasiya@gmail.com"],
      subject: "Thanks for completing the brief!",
      react: SendPDFForm({ name, isProductForm }),
      attachments: [
        {
          filename: isProductForm
            ? "Product_Requirement_Document.pdf"
            : `Logo_Branding_Design_${company}.pdf`,
          content: pdfBase64,
          contentType: "application/pdf",
        },
      ],
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
};
