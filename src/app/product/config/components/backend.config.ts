const getCMSOptions = (types: string[]) => {
  return types.includes("E-commerce")
    ? ["WooCommerce", "Webflow", "OpenCart", "Shopify", "Other"]
    : ["Wordpress CMS", "Custom CMS", "Other"];
};

export const getItems = (types: string[]) => {
  return [
    {
      key: "CMS",
      title: "Which CMS would you like to use?",
      options: getCMSOptions(types),
    },
    {
      key: "SEO_settings",
      title:
        "Do you need basic SEO settings (title, description, thumbnail & keyphrases)?",
      options: ["Yes", "No"],
    },
    {
      key: "security_settings",
      title: "What are the security settings are preffered?",
      options: ["Basic free", "Paid plugin with firewall"],
    },
  ];
};

export const baseServices = [
  "Payment gateways",
  "Fundraising tools",
  "Review system",
  "Accountin software",
  "Inventory system",
  "Membership system",
  "Promotions, banners, ect",
  "Blog",
  "Google API",
  "YouTube API",
  "Other",
  "I don't know",
];
