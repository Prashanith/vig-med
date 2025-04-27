import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Sale } from "../types/sale";
import Button from "../../../../components/button/button";
import { db } from "../../../../services/firebase";

const PAGE_SIZE = 5;

const ViewSales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async (nextPage = false) => {
    setLoading(true);
    setError(null);

    try {
      const salesRef = collection(db, "sales");

      const q = nextPage
        ? query(
            salesRef,
            orderBy("date", "desc"),
            startAfter(lastDoc!),
            limit(PAGE_SIZE)
          )
        : query(salesRef, orderBy("date", "desc"), limit(PAGE_SIZE));

      const snapshot = await getDocs(q);
      const newSales = snapshot.docs.map((doc) => doc.data() as Sale);

      if (!snapshot.empty) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setSales((prev) => (nextPage ? [...prev, ...newSales] : newSales));
        setHasMore(snapshot.docs.length === PAGE_SIZE);
      } else {
        if (!nextPage) setSales([]);
        setHasMore(false);
      }
    } catch (err: any) {
      console.error("🔥 Error fetching sales:", err);
      setError("Failed to load sales. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className='pagePadding'>
      <h2 className='text-2xl font-bold mb-4'>Sales History</h2>

      {error && <div className='text-red-600 mb-4'>{error}</div>}

      <div className='space-y-4'>
        {sales.map((sale, idx) => (
          <div key={idx} className='border p-4 rounded shadow-sm bg-white'>
            <div className='font-semibold text-lg'>Date: {sale.date}</div>
            <div>Net Amount: ₹{sale.netAmount}</div>
            <div>Medicine: ₹{sale.categoryBreakdown.medicine}</div>
            <div>General: ₹{sale.categoryBreakdown.general}</div>
          </div>
        ))}
      </div>

      {loading && <p className='mt-4 text-gray-500'>Loading...</p>}

      {hasMore && !loading && !error && (
        <Button className='mt-6' onClick={() => fetchSales(true)}>
          Load More
        </Button>
      )}

      {!hasMore && !loading && sales.length > 0 && (
        <p className='mt-6 text-gray-500'>No more records.</p>
      )}
    </div>
  );
};

export default ViewSales;
