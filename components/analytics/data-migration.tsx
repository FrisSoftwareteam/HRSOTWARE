"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Database, FileText } from "lucide-react";

export function DataMigration() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    // Mock upload process
    setTimeout(() => {
      console.log("[v0] Uploading file:", selectedFile.name);
      setIsUploading(false);
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            HR Project Management & Task
          </h1>
          <p className="text-muted-foreground">
            Data migration and organization tools
          </p>
        </div>
      </div>

      <Tabs defaultValue="reporting" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="view-chain">View Reporting Chain</TabsTrigger>
        </TabsList>

        <TabsContent value="reporting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Data Viewer & Organization Chart</CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload a CSV file to view, edit, and visualize data in an
                organization chart
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Choose File</p>
                    <p className="text-sm text-muted-foreground">
                      No file chosen
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload">
                    <Button
                      variant="outline"
                      className="cursor-pointer bg-transparent"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload CSV
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? "Processing..." : "Process File"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Save to Database
                </Button>
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Load Existing Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view-chain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporting Chain Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">No Data Available</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload CSV data to view the organizational reporting chain
                </p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
