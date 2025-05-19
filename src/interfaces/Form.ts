import type { Form as ProductForm } from "@/app/product/interfaces/Form";
import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";
import type { ApplicationForm } from "@/app/application/interfaces/ApplicationForm";

export interface Form<
  T extends ProductForm["initialValues"] | BrandingForm["initialValues"] | ApplicationForm["initialValues"],
> {
  form: ProductForm | BrandingForm | ApplicationForm;
  LOCAL_STORAGE_KEY: string;
  getUpdatedValues: (values: T) => T;
  getBody: (values: T) => {
    type: string;
    name: string;
    email: string;
    values: T;
  };
  setIsLoading: (loading: boolean) => void;
  isBranding: boolean;
  children: React.ReactNode;
}
