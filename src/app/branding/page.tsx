import Page from "../components/Page/Page";
import BrandingForm from "./components/BrandingForm";

export default function BrandingBrief() {
  return (
    <Page
      title={`Logo & Branding\nDesign`}
      description="This brief will help us prepare for the job 
      and do it in the best way for you. The clarity of your brief 
      determines the speed of our work and our understanding of the task"
      Form={BrandingForm}
    />
  );
}
