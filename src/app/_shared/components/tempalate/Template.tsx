import { Html, Heading, Text } from "@react-email/components";
const Template = ({ email }: { email: string }) => {
  return (
    <Html lang="en">
      <Heading as="h1">New Form Submission</Heading>
      <Text>You just submitted a form. Here are the details:</Text>
      <Text>Email: {email}</Text>
    </Html>
  );
};
export default Template;
