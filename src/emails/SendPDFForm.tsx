import {
  Html,
  Head,
  Heading,
  Container,
  Text,
  Body,
  Row,
  Column,
  Img,
  Link,
} from "@react-email/components";

export default function SendPDFForm({
  name,
  isProductForm,
}: {
  name: string;
  isProductForm: boolean;
}) {
  return (
    <Html lang="en">
      <Head />

      <Body
        style={{
          margin: 0,
          paddingRight: 50,
          paddingLeft: 10,
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#000",
        }}
      >
        <Heading>{`Hi ${name}!`}</Heading>

        <Container
          align="left"
          style={{ maxWidth: 500, borderCollapse: "collapse" }}
        >
          <Text>
            Boom!{" "}
            {isProductForm
              ? `We've received your brief and are eager to get started! 🚀`
              : "Your branding brief has landed in our hands, and we couldn't be more excited to dive in. 🚀"}
          </Text>

          <Text>
            Attached, you&apos;ll find a PDF copy of your completed brief —{" "}
            {isProductForm
              ? "your guide to a standout product"
              : "your roadmap to an incredible brand transformation"}
            . Our team is already reviewing the details, and we&apos;ll be in
            touch if we need any extra insights.
          </Text>

          <Text>
            Got any last-minute ideas or updates? Just hit reply - we&apos;re
            all ears! We can&apos;t wait to bring your vision to life.
          </Text>

          <Text>Let&apos;s create something amazing together!</Text>
        </Container>

        <Row align="left" style={{ marginTop: 22, borderCollapse: "collapse" }}>
          <Column>
            <Row align="left" style={{ borderCollapse: "collapse" }}>
              <Column align="left" style={{ fontSize: 12, lineHeight: "16px" }}>
                Regards,
              </Column>
            </Row>
            <Row align="left" style={{ borderCollapse: "collapse" }}>
              <Column style={{ paddingTop: 12 }}>
                <Img
                  style={{ display: "block", maxWidth: 75, width: "100%" }}
                  src="https://maksim.nikitinteam.com/nikitin-signs/img/sign-logo.png"
                  alt="logo"
                />
              </Column>
            </Row>
            <Row align="left" style={{ borderCollapse: "collapse" }}>
              <Column
                style={{
                  paddingTop: 10,
                  fontSize: 14,
                  lineHeight: "18px",
                  fontWeight: "bold",
                }}
              >
                Arsen
              </Column>
            </Row>
            <Row align="left" style={{ borderCollapse: "collapse" }}>
              <Column
                style={{ paddingTop: 4, fontSize: 12, lineHeight: "16px" }}
              >
                Chief Communications Officer
              </Column>
            </Row>
            <Row align="left" style={{ borderCollapse: "collapse" }}>
              <Column
                style={{ paddingTop: 12, fontSize: 12, lineHeight: "16px" }}
              >
                <Link
                  href="tel:+16072140079"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  +16 072 140 079
                </Link>
                <Link href="https://t.me/+48577612187" target="_blank">
                  <Img
                    style={{
                      display: "inline",
                      maxWidth: 16,
                      width: "100%",
                      verticalAlign: "middle",
                      marginLeft: 3,
                      marginBottom: 4,
                    }}
                    src="https://maksim.nikitinteam.com/nikitin-signs/img/telegram.png"
                    alt="telegram"
                  />
                </Link>
                <Link href="https://wa.me/+48577612187" target="_blank">
                  <Img
                    style={{
                      display: "inline",
                      maxWidth: 16,
                      width: "100%",
                      verticalAlign: "middle",
                      marginLeft: 3,
                      marginBottom: 4,
                    }}
                    src="https://maksim.nikitinteam.com/nikitin-signs/img/phone.png"
                    alt="phone"
                  />
                </Link>
              </Column>
            </Row>
            <Row align="left" style={{ borderCollapse: "collapse" }}>
              <Column
                style={{
                  paddingTop: 4,
                  paddingBottom: 32,
                  fontSize: 12,
                  lineHeight: "14px",
                }}
              >
                <Link
                  href="https://nixtio.com"
                  target="_blank"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  nixtio.com
                </Link>
              </Column>
            </Row>
          </Column>
        </Row>
      </Body>
    </Html>
  );
}
