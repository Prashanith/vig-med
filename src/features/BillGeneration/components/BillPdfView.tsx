import { Page, View, StyleSheet, Document, Text } from "@react-pdf/renderer";
import { Bill } from "../types/bill";
import { Product } from "../types/product";
import {
  accountNumber,
  address,
  brand,
  GSTIN,
  IFSC,
  mobile,
} from "../utils/billUtils";

const columns = [
  { label: "ID", key: "id", flex: 1 },
  { label: "NAME", key: "name", flex: 2.5 },
  { label: "HSN", key: "hsn", flex: 1.5 },
  { label: "Batch", key: "batchNumber", flex: 1.5 },
  { label: "EXP", key: "expiry", flex: 1 },
  { label: "M.R.P", key: "mrp", flex: 1 },
  { label: "QTY", key: "quantity", flex: 1 },
  { label: "Free", key: "freeQuantity", flex: 1 },
  { label: "AMT", key: "amount", flex: 1.5 },
  { label: "DISC", key: "discount", flex: 1 },
  { label: "CGST", key: "cgst", flex: 1 },
  { label: "SGST", key: "sgst", flex: 1 },
];

const styles = StyleSheet.create({
  page: { padding: 10, backgroundColor: "#f5f5f5" },
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2px solid #007BFF",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  brand: { fontSize: 13, color: "#333", marginBottom: 6, fontWeight: "bold" },
  companyDetails: { fontSize: 12, color: "#333", marginBottom: 4 },
  invoiceTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 5,
    textAlign: "center",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
    width: "100%",
  },
  headerRow: {
    backgroundColor: "#007BFF",
    flexDirection: "row",
    padding: 4,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 8,
    flexWrap: "wrap", // Enables wrapping
  },
  row: {
    flexDirection: "row",
    padding: 4,
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
    fontSize: 8,
    flexWrap: "wrap", // Enables wrapping
  },
  cell: {
    padding: 2,
    borderRight: "1px solid #eee",
    textAlign: "center",
    fontSize: 8,
    minWidth: 17,
    flexShrink: 0,
    overflow: "hidden",
    flexGrow: 1,
    textOverflow: "ellipsis",
    wordBreak: "break-word",
  },
  summary: {
    marginTop: 20,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    borderTop: "2px solid #007BFF",
    paddingTop: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#888",
  },
});

interface IBillPdfView {
  bill: Bill;
}

export default function BillPdfView({ bill }: IBillPdfView) {
  const totalAmount = bill.products.reduce(
    (acc, product) => acc + (product.amount || 0),
    0
  );

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>{brand.toUpperCase()}</Text>
              <Text style={styles.companyDetails}>{address}</Text>
              <Text style={styles.companyDetails}>Phone: {mobile}</Text>
              <Text style={styles.companyDetails}>IFSC: {IFSC}</Text>
              <Text style={styles.companyDetails}>
                Account No.: {accountNumber}
              </Text>
              <Text style={styles.companyDetails}>GSTIN: {GSTIN}</Text>
              <Text style={styles.invoiceTitle}>Invoice</Text>
            </View>

            <View>
              <Text style={styles.companyDetails}>{bill.name}</Text>
              <Text style={styles.companyDetails}>{bill.email}</Text>
              <Text style={styles.companyDetails}>
                Invoice Number: {bill.invoiceNumber}
              </Text>
              <Text style={styles.companyDetails}>
                Date: {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.headerRow}>
              {columns.map((col, index) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    { flex: col.flex },
                    index === columns.length - 1 ? { borderRight: "none" } : {},
                  ]}
                >
                  {col.label}
                </Text>
              ))}
            </View>

            {bill.products.map((product: Product, index: number) => (
              <View key={index} style={styles.row}>
                {columns.map((col) => (
                  <Text
                    key={col.key}
                    style={[
                      styles.cell,
                      { flex: col.flex },
                      index === columns.length - 1
                        ? { borderRight: "none" }
                        : {},
                    ]}
                  >
                    {product[col.key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.summary}>
            <Text>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
          </View>

          <Text style={styles.footer}>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
}
