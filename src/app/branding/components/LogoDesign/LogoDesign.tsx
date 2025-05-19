import { useFormikContext } from "formik";

import Wrapper from "@/app/components/Wrapper/Wrapper";
import Input from "@/ui/Input/Input";
import Card from "@/ui/Card/Card";
import InputList from "@/ui/InputList/InputList";
import Tooltip from "@/ui/Tooltip/Tooltip";

import { inputs, cards } from "../../config/components/logoDesign.config";

import type { Form } from "@/app/branding/interfaces/BrandingForm";

import styles from "./LogoDesign.module.scss";

export default function LogoDesign() {
  const {
    values: { logo_design },
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <Wrapper title="Logo Design" label="5 min left">
      <div className={styles["block-1"]}>
        {inputs.map((input, i) => {
          const keys: (keyof typeof logo_design)[] = [
            "logo_character",
            "color",
            "logo_ideas",
            "unacceptable_things",
            "logo_restrictions",
            "logo_using",
            "logo_core_message",
            "company_reflection",
            "any_information",
          ];

          return (
            <div key={keys[i]}>
              <h3>{input.title}</h3>

              {i === 0 && (
                <p className={`${styles.subtitle} p2`}>
                  Minimalist, expressive, elegant, bold, modern, tech-focused…
                  or any other preferences?
                </p>
              )}

              <Input
                name={`logo_design.${keys[i]}`}
                value={logo_design[keys[i]] as string}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={input.placeholder}
                isTextArea={true}
                error={i !== 8 ? (errors.logo_design?.[keys[i]] as string) : ""}
                touched={
                  i !== 8 ? (touched.logo_design?.[keys[i]] as boolean) : false
                }
              />

              {i === 1 && (
                <div className={styles["block-2"]}>
                  <div className={styles["cards-block"]}>
                    <h3>
                      What type of logo best represents your brand&apos;s
                      desired image?
                    </h3>

                    <div className={styles.cards}>
                      {cards.map((card) => (
                        <Card
                          key={card.text}
                          img={`/branding/logo/${card.img}`}
                          name="logo_design.logo_types"
                          value={logo_design.logo_types}
                          text={card.text}
                          variant={1}
                          isMultiple={true}
                          error={errors.logo_design?.logo_types}
                          touched={touched.logo_design?.logo_types}
                        />
                      ))}

                      {touched.logo_design?.logo_types &&
                        errors.logo_design?.logo_types && (
                          <p className="error-message">
                            {errors.logo_design.logo_types}
                          </p>
                        )}
                    </div>
                  </div>

                  <InputList
                    title={<h3>Provide examples that you like</h3>}
                    style={{ marginTop: 20 }}
                    gap="lg"
                    name="logo_design.liked_examples"
                    value={logo_design.liked_examples}
                    multipleString={false}
                    placeholders={["What do you like here?"]}
                    isTextArea={true}
                    btnText="Add more examples"
                  />
                </div>
              )}

              {i === 5 && (
                <div className={styles["block-3"]}>
                  <InputList
                    title={
                      <h3>
                        Who&apos;s the competition?
                        <Tooltip
                          className={styles["tooltip-width"]}
                          content={
                            <p>
                              Defining the competition helps to clarify the
                              landscape. It also helps to clarify the strategy,
                              so the designer can make well-informed decisions
                              about how to stand out from the crowd.
                              <br /> Please attach the logos of your competitors
                              and answer the following questions:
                              <br /> - What are the advantages and disadvantages
                              of the logo?
                              <br /> - What would you like to include in your
                              own logo?
                            </p>
                          }
                        />
                      </h3>
                    }
                    style={{ marginTop: 20 }}
                    gap="lg"
                    name="logo_design.competitors"
                    value={logo_design.competitors}
                    multipleString={true}
                    placeholders={[
                      "Name/URL link (optional)",
                      "What do you like and don't like here?",
                    ]}
                    btnText="Add more competitor"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
