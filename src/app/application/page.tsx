import Page from "../components/Page/Page";
import ApplicationForm from "./components/ApplicationForm";

export default function ApplicationBrief() {
  return (
    <Page
      title="Application"
      description="For us to start your project, we need minimal 
      information from you. By the way, answering the questions 
      below will give you a better understanding of your project"
      Form={ApplicationForm}
    />
  );
}
