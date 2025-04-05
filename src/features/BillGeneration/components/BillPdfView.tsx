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

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2px solid #007BFF",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "flex-start",
  },
  brand: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
    fontWeight: "bold",
  },
  companyDetails: {
    fontSize: 13,
    color: "#333",
    marginBottom: 4,
    fontWeight: "medium",
  },
  invoiceTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 5,
    textAlign: "center",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  section: {
    marginVertical: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  headerRow: {
    backgroundColor: "#007BFF",
    flexDirection: "row",
    padding: "2px 6px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
    fontSize: 12,
  },
  cell: {
    flex: 1,
    textAlign: "left",
    padding: 4,
    borderRight: "1px solid #eee",
  },
  lastCell: {
    borderRight: "none",
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
  invoiceDetails: {
    marginBottom: 15,
    fontSize: 12,
    color: "#555",
  },
});

interface IBillPdfView {
  bill: Bill;
}

export default function BillPdfView({ bill }: IBillPdfView) {
  const totalAmount = bill.products.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              {/* Header */}
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
            {/* Invoice Details */}
            <View>
              <Text style={styles.companyDetails}>{bill.name}</Text>
              <Text style={styles.companyDetails}>{bill.email}</Text>
              <Text style={styles.companyDetails}>
                Invoice Number:{" "} {bill.invoiceNumber}
              </Text>
              <Text style={styles.companyDetails}>
                Date:{" "}{new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Product Table */}
          <View style={styles.table}>
            <View style={styles.headerRow}>
              {[
                "ID",
                "Name",
                "HSN",
                "Batch",
                "Expiry",
                "MRP",
                "Qty",
                "Free",
                "Rate",
                "Amount",
                "Discount",
                "CGST",
                "SGST",
              ].map((header, index) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    index === 11 || index === 12 ? styles.lastCell : {},
                  ]}
                >
                  {header}
                </Text>
              ))}
            </View>
            {bill.products.map((product: Product, index: number) => (
              <View key={index} style={styles.row}>
                {[
                  product.id,
                  product.name,
                  product.hsn,
                  product.batchNumber,
                  product.expiry,
                  product.mrp,
                  product.quantity,
                  product.freeQuantity,
                  product.rate,
                  product.amount,
                  product.discount,
                  product.cgst,
                  product.sgst,
                ].map((value, idx) => (
                  <Text
                    key={idx}
                    style={[
                      styles.cell,
                      idx === 11 || idx === 12 ? styles.lastCell : {},
                    ]}
                  >
                    {value}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* Summary Section */}
          <View style={styles.summary}>
            <Text>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
}
