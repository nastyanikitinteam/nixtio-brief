import { NextResponse } from "next/server";
import mailgun from "mailgun-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const emailData = await req.json();

  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY, // ваш API-ключ
    domain: process.env.MAILGUN_DOMAIN, // ваш домен
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Ваша електронна пошта
    to: `${emailData.email}, ${process.env.EMAIL_USER}`, // Електронна пошта користувача та ваша
    subject: "Form Submission",
    text: "Here is your submitted form.",
    attachment: [
      {
        data: Buffer.from(emailData.pdfContent, "base64"), // Додайте PDF в якості вкладення
        filename: "form_submission.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const response = await mg.messages().send(mailOptions);
    console.log(response);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
  }
}
