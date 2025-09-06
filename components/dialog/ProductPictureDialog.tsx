import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
interface ProductPictureDialog {
  isOpen: boolean;
  handleDialog: () => void;
  images: string[];
}

const ProductPictureDialog = ({
  handleDialog,
  isOpen,
  images,
}: ProductPictureDialog) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gambar Produk</DialogTitle>
          <DialogDescription>Gambar produk</DialogDescription>
        </DialogHeader>
        <section className="mx-auto">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {images.map((value, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <Image
                          key={index}
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${value}`}
                          alt="picture"
                          width={500}
                          height={500}
                          className="max-h-[60vh] object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <DialogFooter>
          <Button>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPictureDialog;
