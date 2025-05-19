import Page from "./components/Page/Page";
import ProductForm from "./product/components/ProductForm";

export default function ProductBrief() {
  return (
    <Page
      title={`Product Requirement\nDocument`}
      description="For us to start your project, we need minimal 
      information from you. By the way, answering the questions 
      below will give you a better understanding of your project"
      Form={ProductForm}
    />
  );
}
