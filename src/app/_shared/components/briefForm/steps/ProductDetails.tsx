import { useState } from "react";
import { Field } from "formik";
import cn from "classnames";

import FormInput from "@components/formElements/formInput/FormInput";
import FormRadio from "@/app/_shared/components/formElements/formRadio/FormRadio";
import FormCheckbox from "@/app/_shared/components/formElements/formCheckbox/FormCheckbox";
import FormTextarea from "../../formElements/formTextarea/FormTextarea";
import FormRangeSlider from "@/app/_shared/components/formElements/formRangeSlider/FormRangeSlider";

import ImageNewWebsite from "@images/main/img-New-website.svg";
import ImageRedisign from "@images/main/img-Website-redesign.svg";

import styles from "../brief-form.module.scss";

const ProductDetails = () => {
  const [audienceAge, setAudienceAge] = useState<[number, number]>([18, 50]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2 className={cn(styles.title, "title-h2")}>Product Details</h2>
        <div className={cn("tag", styles.tag)}>10 min left</div>
      </div>
      <div className={styles.main}>
        <div className={styles.group}>
          <div className={styles.items}>
            <Field type="text" name="fullName" placeholder="Your name" component={FormInput} />
            <Field type="email" name="email" placeholder="Your email" component={FormInput} />
          </div>
          <Field type="text" name="nameOfProduct" placeholder="Name of the product (optional)" component={FormInput} />
          <div className={styles.items}>
            <Field type="radio" name="website" value="new_website" component={FormRadio} withIcon>
              <ImageNewWebsite />
              <p>New website</p>
            </Field>
            <Field type="radio" name="website" value="website_redesign" component={FormRadio} withIcon>
              <ImageRedisign />
              <p>Website redesign </p>
            </Field>
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.group_item}>
            <h4 className={styles.group_item_label}>Website type</h4>
            <div className={styles.blocks}>
              <Field type="checkbox" name="website_type" value="ecommerce" component={FormCheckbox}>
                <p>E-commerce</p>
              </Field>
              <Field type="checkbox" name="website_type" value="blog" component={FormCheckbox}>
                <p>Blog</p>
              </Field>
              <Field type="checkbox" name="website_type" value="portfolio" component={FormCheckbox}>
                <p>Portfolio</p>
              </Field>
            </div>
          </div>
          <Field
            type="text"
            name="websity_type-description"
            placeholder="A short and general description about the product"
            component={FormTextarea}
          />
        </div>
        <div className={styles.group}>
          <div className={styles.group_item}>
            <h4 className={styles.group_item_label}>What problems does your product solve for a potential customer/user?</h4>
            <Field type="text" name="what-problem" placeholder="Write here (optional)" component={FormTextarea} />
          </div>
        </div>
        <div className={styles.group}>
          <h3 className={cn(styles.group_title, "title-h3")}>Target Audience</h3>
          <div className={styles.group_item}>
            <Field type="text" name="target-audience" placeholder="Briefly describe the target audience (optional)" component={FormTextarea} />
          </div>

          <FormRangeSlider min={0} max={70} step={1} value={audienceAge} onChange={(value) => setAudienceAge(value)} label="Age" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
