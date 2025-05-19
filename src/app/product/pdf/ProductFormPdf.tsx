/* eslint-disable jsx-a11y/alt-text */
import path from "path";

import {
  Page,
  Text,
  Image,
  View,
  Document,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

import { getBase64Image } from "@/lib/getBase64Image";

import { getProductDetailsData } from "./components/getProductDetailsData";
import { getDesignData } from "./components/getDesignData";
import { getContentData } from "./components/getContentData";
import { getFrontendData } from "./components/getFrontendData";
import { getBackendData } from "./components/getBackendData";
import { getHostingServicesData } from "./components/getHostingServicesData";
import { getAdditionsData } from "./components/getAdditionsData";

import type { Form } from "@/app/product/interfaces/Form";

Font.register({
  family: "Arial",
  src: path.join(process.cwd(), "public", "fonts", "arial-regular.ttf"),
  fontWeight: "normal",
});

Font.register({
  family: "Arial",
  src: path.join(process.cwd(), "public", "fonts", "arial-bold.ttf"),
  fontWeight: "bold",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    position: "relative",
    padding: 50,
    fontFamily: "Arial",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  logo: {
    width: 26,
    height: 23,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    lineHeight: "40pt",
  },
  "data-block": {
    display: "flex",
    gap: 10,
  },
  "data-item": {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 25,
    fontSize: 15,
    lineHeight: "20pt",
  },
  "data-item-non-str": {
    display: "flex",
    gap: 10,
  },
  label: {
    width: 150,
    fontWeight: "bold",
  },
  value: {
    width: 320,
    marginLeft: "auto",
  },
});

function Header({ subtitle }: { subtitle: string }) {
  return (
    <View style={styles.header} fixed>
      <Text
        style={{
          ...styles.subtitle,
          lineHeight: subtitle === "Brief" ? "25pt" : "35pt",
        }}
      >
        {subtitle}
      </Text>
      <Image style={styles.logo} source={{ uri: getBase64Image("logo.png") }} />
    </View>
  );
}

// Create Document Component
export default function ProductFormPdf({
  values,
}: {
  values: Form["initialValues"];
}) {
  const {
    product_details,
    design,
    content,
    frontend,
    backend,
    hosting_services,
    additions,
  } = values;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header subtitle="Brief" />

        <Text style={styles.title}>{"Product Requirement\nDocument"}</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Product Details" />

        <View style={styles["data-block"]}>
          {getProductDetailsData(product_details).map(
            (item) =>
              (Array.isArray(item.value)
                ? item.value.length > 0
                : item.value) && (
                <View
                  key={item.label}
                  style={{
                    ...styles["data-item"],
                    flexDirection: Array.isArray(item.value) ? "column" : "row",
                    gap: Array.isArray(item.value) ? 10 : 25,
                  }}
                >
                  <Text style={styles.label}>{item.label}</Text>

                  {Array.isArray(item.value) ? (
                    item.value.map((subItem, index) => (
                      <View key={index}>
                        {[
                          ["Name/URL Link:", subItem.name_or_url],
                          subItem.likes_dislikes && [
                            "Likes or dislikes:",
                            subItem.likes_dislikes,
                          ],
                        ].map(([label, value], index) => (
                          <View key={index} style={styles["data-item"]}>
                            <Text
                              style={{
                                ...styles.label,
                                fontWeight: "normal",
                              }}
                            >
                              {label}
                            </Text>
                            <Text style={styles.value}>{value}</Text>
                          </View>
                        ))}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.value}>{item.value}</Text>
                  )}
                </View>
              )
          )}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Design" />

        <View style={styles["data-block"]}>
          {getDesignData(design).map(
            (item) =>
              (Array.isArray(item.value)
                ? item.value.length > 0
                : item.value) && (
                <View
                  key={item.label}
                  style={{
                    ...styles["data-item"],
                    flexDirection: Array.isArray(item.value) ? "column" : "row",
                    gap: Array.isArray(item.value) ? 10 : 25,
                  }}
                >
                  <Text style={styles.label}>{item.label}</Text>

                  {Array.isArray(item.value) ? (
                    item.value.map((subItem, index) => (
                      <View key={index}>
                        {[
                          "style_example" in subItem
                            ? ["Style example:", subItem.style_example]
                            : ["Name/URL Link:", subItem.name_or_url],
                          subItem.likes_dislikes && [
                            "Likes or dislikes:",
                            subItem.likes_dislikes,
                          ],
                        ].map(([label, value], index) => (
                          <View key={index} style={styles["data-item"]}>
                            <Text
                              style={{
                                ...styles.label,
                                fontWeight: "normal",
                              }}
                            >
                              {label}
                            </Text>

                            {"style_example" in subItem &&
                            label.includes("Style example") ? (
                              <Image
                                style={{
                                  ...styles.value,
                                  marginBottom: 10,
                                }}
                                source={{
                                  uri: getBase64Image(value),
                                }}
                              />
                            ) : (
                              <Text style={styles.value}>{value}</Text>
                            )}
                          </View>
                        ))}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.value}>{item.value}</Text>
                  )}
                </View>
              )
          )}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Content" />

        <View style={styles["data-block"]}>
          {getContentData(content).map(
            (item) =>
              (Array.isArray(item.value)
                ? item.value.length > 0
                : item.value) && (
                <View
                  key={item.label}
                  style={{
                    ...styles["data-item"],
                    flexDirection: Array.isArray(item.value) ? "column" : "row",
                    gap: Array.isArray(item.value) ? 10 : 25,
                  }}
                >
                  <Text style={styles.label}>{item.label}</Text>

                  {Array.isArray(item.value) ? (
                    item.value.map((subItem, index) => (
                      <View key={index}>
                        {[
                          ["Page:", subItem.page],
                          ["Brief description:", subItem.description],
                        ].map(([label, value], index) => (
                          <View key={index} style={styles["data-item"]}>
                            <Text
                              style={{
                                ...styles.label,
                                fontWeight: "normal",
                              }}
                            >
                              {label}
                            </Text>
                            <Text style={styles.value}>{value}</Text>
                          </View>
                        ))}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.value}>{item.value}</Text>
                  )}
                </View>
              )
          )}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Front—End" />

        <View style={styles["data-block"]}>
          {getFrontendData(frontend).map(
            (item) =>
              item.value && (
                <View key={item.label} style={styles["data-item"]}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              )
          )}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Back—End" />

        <View style={styles["data-block"]}>
          {getBackendData(backend).map(
            (item) =>
              item.value && (
                <View key={item.label} style={styles["data-item"]}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              )
          )}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Hosting Services" />

        <View style={styles["data-block"]}>
          {getHostingServicesData(hosting_services).map(
            (item) =>
              item.value && (
                <View key={item.label} style={styles["data-item"]}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              )
          )}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Header subtitle="Additions" />

        <View style={styles["data-block"]}>
          {getAdditionsData(additions).map(
            (item) =>
              item.value && (
                <View key={item.label} style={styles["data-item"]}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              )
          )}
        </View>
      </Page>
    </Document>
  );
}
