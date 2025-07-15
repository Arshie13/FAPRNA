"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUploadForm } from "@/components/admin/ImageUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  getCurrentWinners,
  getPreviousWinners,
  uploadWinner,
  deleteWinner,
} from "@/lib/actions/luminance-actions";
import { Plus, Trash2, RefreshCw, Search, Star } from "lucide-react";
import { useEdgeStore } from "@/lib/libstore/libstore-config";
import { checkLuminanceEventStatus, luminanceEventAction } from "@/lib/actions/luminance-actions";

interface LuminanceWinner {
  id: string;
  name: string;
  fileUrl: string;
  isCurrent: boolean;
}

export default function LuminanceDashboard() {
  const [winners, setWinners] = useState<LuminanceWinner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [newWinnerName, setNewWinnerName] = useState("");
  const [newWinnerImage, setNewWinnerImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLuminanceActive, setIsLuminanceActive] = useState<boolean | null>(null)
  const { edgestore } = useEdgeStore();

  const fetchWinners = async () => {
    setIsLoading(true);
    try {
      const data =
        activeTab === "current"
          ? await getCurrentWinners()
          : await getPreviousWinners();
      setWinners(data);
    } catch {
      toast("Failed to fetch winners");
    } finally {
      setIsLoading(false);
    }
  };

  const startLuminance = async () => {
    await luminanceEventAction("start");
  }

  const endLuminanceEvent = async () => {
    await luminanceEventAction("end")
  }

  const fetchLuminanceStatus = async () => {
    try {
      setIsLoading(true);
      const isActive = await checkLuminanceEventStatus();
      setIsLuminanceActive(isActive!.hasStarted);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Promise.all([fetchWinners(), fetchLuminanceStatus()])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddWinner = async () => {
    await edgestore.publicFiles.confirmUpload({
      url: newWinnerImage,
    });

    if (!newWinnerName) {
      toast("Image name is required");
      return;
    }
    setIsSubmitting(true);
    try {
      await uploadWinner(
        newWinnerName,
        newWinnerImage,
        activeTab === "current"
      );
      toast("Winner added successfully");
      setNewWinnerName("");
      setNewWinnerImage("");
      setResetKey((k) => k + 1);
      setIsDialogOpen(false);
      fetchWinners();
    } catch {
      toast("Failed to add winner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWinner = async (fileUrl: string, fileName: string) => {
    try {
      await edgestore.publicFiles.delete({
        url: fileUrl,
      });

      await deleteWinner(fileName);

      toast("Winner deleted successfully");
      fetchWinners();
    } catch {
      toast("Failed to delete winner");
    }
  };

  const filteredWinners = winners.filter((winner) =>
    winner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="w-full py-4 sm:py-6 md:py-8 lg:py-12 min-h-screen px-4 sm:px-6 md:px-8"
      style={{ background: "#003366" }}
    >
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg">
            Luminance Awards Management
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-2 sm:mt-3 font-semibold drop-shadow">
            Manage Luminance Award winners and their images
          </p>
        </div>
      </div>

      <Card className="p-2 sm:p-3 md:p-4">
        <CardHeader className="pb-4 sm:pb-5 md:pb-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            Luminance Awards Dashboard
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
            View, add, or remove Luminance Award winners. Only one
            &quot;current&quot; winner is allowed at a time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6">
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
              <Input
                placeholder="Search winners..."
                className="pl-10 sm:pl-12 md:pl-14 h-10 sm:h-11 md:h-12 text-sm sm:text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={fetchWinners}
                className="gap-2 sm:gap-3 h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg order-2 sm:order-1"
              >
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <div className="text-sm sm:text-base md:text-lg font-semibold">
              Event Status:{" "}
              <span
                className={`${isLuminanceActive ? "text-green-600" : "text-red-600"
                  } font-bold`}
              >
                {isLuminanceActive === null ? "Checking..." : isLuminanceActive ? "Active" : "Inactive"}
              </span>
            </div>
            <Button
              variant={isLuminanceActive ? "destructive" : "default"}
              onClick={async () => {
                if (isLuminanceActive) {
                  await endLuminanceEvent();
                  toast("Luminance event ended.");
                } else {
                  await startLuminance();
                  toast("Luminance event started.");
                }
                fetchLuminanceStatus();
              }}
              className="h-10 sm:h-11 md:h-12 px-4 sm:px-6 text-sm sm:text-base md:text-lg"
            >
              {isLuminanceActive ? "End Luminance Event" : "Start Luminance Event"}
            </Button>
          </div>


          <Tabs
            defaultValue="current"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6 sm:mb-8 grid w-full grid-cols-2 h-10 sm:h-12 md:h-14">
              <TabsTrigger
                value="current"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Current Winners
              </TabsTrigger>
              <TabsTrigger
                value="previous"
                className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
              >
                Previous Winners
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg sm:rounded-xl border shadow-sm overflow-hidden">
                {/* Add Winner Form */}
                <div className="p-4 border-b">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 sm:gap-3 h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg bg-[#003366] text-white font-semibold hover:bg-[#002244] hover:text-white transition-all duration-300 rounded-xl shadow-lg">
                        <Plus className="h-4 w-4" />
                        Add Winner
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add a New Winner</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Image name"
                          value={newWinnerName}
                          onChange={(e) => setNewWinnerName(e.target.value)}
                        />
                        <ImageUploadForm
                          setImageUrl={setNewWinnerImage}
                          resetKey={resetKey}
                        />
                      </div>
                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                          onClick={handleAddWinner}
                          disabled={isSubmitting}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Winners Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">
                          Image
                        </TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4">
                          Name
                        </TableHead>
                        <TableHead className="text-sm md:text-base lg:text-lg font-bold py-3 md:py-4 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl"
                          >
                            Loading winners...
                          </TableCell>
                        </TableRow>
                      ) : filteredWinners.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="h-24 sm:h-32 text-center text-base sm:text-lg md:text-xl"
                          >
                            No winners found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredWinners.map((winner) => (
                          <TableRow key={winner.id}>
                            <TableCell className="py-3 md:py-4">
                              {winner.fileUrl ? (
                                <Image
                                  src={winner.fileUrl}
                                  alt={winner.name}
                                  width={64}
                                  height={64}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                  <Star className="h-8 w-8" />
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="py-3 md:py-4 font-semibold text-lg md:text-xl lg:text-2xl">
                              {winner.name}
                            </TableCell>
                            <TableCell className="py-3 md:py-4 align-middle text-center relative">
                              <div className="flex items-center gap-2 justify-end absolute right-4 top-1/2 -translate-y-1/2">
                                <div className="flex-shrink-0">
                                  {winner.fileUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className=""
                                      onClick={() =>
                                        window.open(winner.fileUrl, "_blank")
                                      }
                                    >
                                      View Image
                                    </Button>
                                  )}
                                </div>
                                <div className="flex-shrink-0">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                      >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="max-w-sm">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-lg">
                                          Delete Winner
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm">
                                          Are you sure you want to delete &quot;
                                          {winner.name}&quot;?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter className="gap-2">
                                        <AlertDialogCancel className="text-sm px-4 py-2">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-600 text-white hover:bg-red-700 text-sm px-4 py-2"
                                          onClick={() =>
                                            handleDeleteWinner(
                                              winner.fileUrl,
                                              winner.name
                                            )
                                          }
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                {/* Mobile Cards View */}
                <div className="block md:hidden p-4">
                  {isLoading ? (
                    <div className="text-center py-8">Loading winners...</div>
                  ) : filteredWinners.length === 0 ? (
                    <div className="text-center py-8">No winners found.</div>
                  ) : (
                    <div className="space-y-4">
                      {filteredWinners.map((winner) => (
                        <Card
                          key={winner.id}
                          className="p-3 flex items-center gap-4"
                        >
                          {winner.fileUrl ? (
                            <Image
                              src={winner.fileUrl}
                              alt={winner.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              <Star className="h-6 w-6" />
                            </div>
                          )}
                          <div className="flex-1 font-semibold">
                            {winner.name}
                          </div>
                          {/* View Image Button for mobile */}
                          {winner.fileUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() =>
                                window.open(winner.fileUrl, "_blank")
                              }
                            >
                              View Image
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-sm">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg">
                                  Delete Winner
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm">
                                  Are you sure you want to delete &quot;
                                  {winner.name}&quot;?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="gap-2">
                                <AlertDialogCancel className="text-sm px-4 py-2">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 text-white hover:bg-red-700 text-sm px-4 py-2"
                                  onClick={() =>
                                    handleDeleteWinner(
                                      winner.fileUrl,
                                      winner.name
                                    )
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
