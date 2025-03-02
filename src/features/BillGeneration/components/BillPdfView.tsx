import { Page, View, StyleSheet, Document, Text } from "@react-pdf/renderer";
import { Bill } from "../types/bill";

const styles = StyleSheet.create({
  page: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    margin: "4px",
    border: "1px solid black",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface IBillPdfView {
  bill: Bill;
}

export default function BillPdfView({ bill }: IBillPdfView) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>{bill.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>{bill.email}</Text>
        </View>
      </Page>
    </Document>
  );
}
