import { useEffect} from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ListingDetailsPage() {
  const { id } = useParams();


  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch listing");
        const data = await res.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchListing();
  }, [id]);

  if (loading) return <Skeleton className="h-60 w-full" />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold">{listing?.title}</h1>
          <p className="text-gray-600 mt-2">{listing?.description}</p>
          <p className="text-lg font-semibold mt-4">Price: ${listing?.price}</p>
          <Button className="mt-4">Contact Seller</Button>
        </CardContent>
      </Card>
    </div>
  );
}
