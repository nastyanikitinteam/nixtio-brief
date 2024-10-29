"use server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import type { BriefFormProps } from "./types/form";
import EmailTemplate from "./app/_shared/components/tempalate/Template";
interface State {
  error: string | null;
  success: boolean;
}

export const sendEmail = async (prevState: State, formData: BriefFormProps) => {
  const { email, pdf } = formData;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = await render(EmailTemplate({ email }));

    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kibkalo.work@gmail.com",
      subject: "Hello World",
      html,
      attachments: [
        {
          filename: "form_submission.pdf",
          content: pdf,
        },
      ],
    });

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: (error as Error).message,
      success: false,
    };
  }
};
