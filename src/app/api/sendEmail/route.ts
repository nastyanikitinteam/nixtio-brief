import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const emailData = await req.json();

  // Налаштування транспорту
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // false для порту 587
    auth: {
      user: "postmaster@sandbox3d1d0e7a10604dada9d0f75578506f2a.mailgun.org", // Ваш SMTP-ім'я користувача
      pass: "00f83a6082eefa18215d2c0e1be082d8-72e4a3d5-ba7645d6", // Ваш пароль
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Ваша електронна пошта
    to: `${emailData.email}, ${process.env.EMAIL_USER}`, // Електронна пошта користувача та ваша
    subject: "Form Submission",
    text: "Here is your submitted form.",
    attachments: [
      {
        filename: "form_submission.pdf",
        content: emailData.pdfContent,
        encoding: "base64",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ message: "Error sending email", error: error.message }, { status: 500 });
    }
    console.error("Error sending email: Unknown error");
    return NextResponse.json({ message: "Error sending email", error: "Unknown error" }, { status: 500 });
  }
}
