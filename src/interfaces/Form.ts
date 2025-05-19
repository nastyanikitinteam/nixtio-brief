import type { Form as ProductForm } from "@/app/product/interfaces/Form";
import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";

export interface Form<
  T extends ProductForm["initialValues"] | BrandingForm["initialValues"],
> {
  form: ProductForm | BrandingForm;
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
