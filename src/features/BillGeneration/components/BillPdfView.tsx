import { Page, View, StyleSheet, Document, Text } from "@react-pdf/renderer";
import { Bill } from "../types/bill";
import { Product } from "../types/product";
import {
  accountNumber,
  address,
  brand,
  IFSC,
  mobile,
} from "../utils/billUtils";

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
  meta: {
    width:"100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottom: "1px solid #ccc",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  cell: {
    width: "30%",
    textAlign: "center",
  },
});

interface IBillPdfView {
  bill: Bill;
}

export default function BillPdfView({ bill }: IBillPdfView) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.meta}>
          <View>
            <Text>{brand}</Text>
          </View>
          <View>
            <Text>{brand}</Text>
            <Text>{mobile}</Text>
            <Text>{address}</Text>
            <Text>{accountNumber}</Text>
            <Text>{IFSC}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text>{bill.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>{bill.email}</Text>
        </View>
        {bill.products.map((product: Product, index: number) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{product.id}</Text>
            <Text style={styles.cell}>{product.name}</Text>
            <Text style={styles.cell}>{product.hsn}</Text>
            <Text style={styles.cell}>{product.batchNumber}</Text>
            <Text style={styles.cell}>{product.expiry}</Text>
            <Text style={styles.cell}>{product.mrp}</Text>
            <Text style={styles.cell}>{product.quantity}</Text>
            <Text style={styles.cell}>{product.freeQuantity}</Text>
            <Text style={styles.cell}>{product.rate}</Text>
            <Text style={styles.cell}>{product.amount}</Text>
            <Text style={styles.cell}>{product.discount}</Text>
            <Text style={styles.cell}>{product.cgst}</Text>
            <Text style={styles.cell}>{product.sgst}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
