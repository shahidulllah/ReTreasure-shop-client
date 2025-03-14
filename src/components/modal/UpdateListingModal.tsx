import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IListing } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const UpdateListingModal = ({
  listing,
  isOpen,
  onClose,
  onSave,
}: {
  listing: IListing;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<IListing>) => void;
}) => {
  const [formData, setFormData] = useState<Partial<IListing>>(listing);

  useEffect(() => {
    setFormData(listing);
  }, [listing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Update Listing</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>location</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Condition</Label>
            <Input
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <Button onClick={() => onSave(formData)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
