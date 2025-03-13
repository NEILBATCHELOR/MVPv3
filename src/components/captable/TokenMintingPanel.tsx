import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Coins, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface TokenSummary {
  tokenType: string;
  totalAmount: number;
  confirmedAmount: number;
  status: string;
  readyToMint: boolean;
}

interface TokenMintingPanelProps {
  tokenSummaries: TokenSummary[];
  onMintTokens: (tokenTypes: string[]) => void;
  isLoading: boolean;
}

const TokenMintingPanel = ({
  tokenSummaries = [],
  onMintTokens,
  isLoading,
}: TokenMintingPanelProps) => {
  const [selectedTokenTypes, setSelectedTokenTypes] = useState<string[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle token type selection
  const handleTokenTypeSelection = (tokenType: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTokenTypes((prev) => [...prev, tokenType]);
    } else {
      setSelectedTokenTypes((prev) =>
        prev.filter((type) => type !== tokenType),
      );
    }
  };

  // Handle select all
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedTokenTypes(
        tokenSummaries
          .filter((summary) => summary.readyToMint)
          .map((summary) => summary.tokenType),
      );
    } else {
      setSelectedTokenTypes([]);
    }
  };

  // Handle mint tokens
  const handleMintTokens = async () => {
    if (!confirmationChecked || selectedTokenTypes.length === 0) return;

    try {
      setIsMinting(true);
      await onMintTokens(selectedTokenTypes);
      setSelectedTokenTypes([]);
      setConfirmationChecked(false);
    } catch (error) {
      console.error("Error minting tokens:", error);
    } finally {
      setIsMinting(false);
    }
  };

  // Filter token types that are ready to mint
  const mintableTokenTypes = tokenSummaries.filter(
    (summary) => summary.readyToMint,
  );

  // Calculate progress percentage
  const calculateProgress = (confirmed: number, total: number) => {
    if (total === 0) return 0;
    return Math.min(Math.round((confirmed / total) * 100), 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          <span>Token Minting</span>
        </CardTitle>
        <CardDescription>
          Review and mint tokens for confirmed allocations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tokenSummaries.length === 0 ? (
          <div className="text-center py-10">
            <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Token Types Available</h3>
            <p className="text-sm text-muted-foreground mt-2">
              No token types have been defined for this project yet.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Available Token Types</h3>
              {mintableTokenTypes.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={
                      selectedTokenTypes.length === mintableTokenTypes.length &&
                      mintableTokenTypes.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                  <Label htmlFor="select-all" className="text-sm">
                    Select All Ready to Mint
                  </Label>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {tokenSummaries.map((summary) => (
                <div
                  key={summary.tokenType}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {summary.readyToMint && (
                        <Checkbox
                          id={`token-${summary.tokenType}`}
                          checked={selectedTokenTypes.includes(
                            summary.tokenType,
                          )}
                          onCheckedChange={(checked) =>
                            handleTokenTypeSelection(
                              summary.tokenType,
                              !!checked,
                            )
                          }
                        />
                      )}
                      <div>
                        <h4 className="font-medium">{summary.tokenType}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(summary.totalAmount)}
                        </p>
                      </div>
                    </div>
                    {summary.readyToMint ? (
                      <Badge className="bg-green-100 text-green-800">
                        Ready to Mint
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Pending Confirmation
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confirmation Progress</span>
                      <span>
                        {calculateProgress(
                          summary.confirmedAmount,
                          summary.totalAmount,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={calculateProgress(
                        summary.confirmedAmount,
                        summary.totalAmount,
                      )}
                      className="h-2"
                    />
                  </div>

                  {!summary.readyToMint && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-md text-sm text-yellow-800">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        Allocations need to be confirmed before minting can
                        proceed.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {mintableTokenTypes.length > 0 && (
              <div className="flex items-start space-x-2 pt-4 border-t">
                <Checkbox
                  id="mint-confirmation"
                  checked={confirmationChecked}
                  onCheckedChange={(checked) =>
                    setConfirmationChecked(!!checked)
                  }
                  disabled={selectedTokenTypes.length === 0}
                />
                <Label
                  htmlFor="mint-confirmation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm that I want to mint these tokens. This action
                  requires multi-signature approval and cannot be undone.
                </Label>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleMintTokens}
          disabled={
            !confirmationChecked ||
            selectedTokenTypes.length === 0 ||
            isMinting ||
            isLoading
          }
        >
          {isMinting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting Tokens...
            </>
          ) : (
            <>
              <Coins className="mr-2 h-4 w-4" />
              Mint Selected Tokens
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenMintingPanel;
