import { v4 as uuidv4 } from "uuid";

// Types for the API
export interface TransactionEvent {
  id: string;
  requestId: string;
  eventType:
    | "status_change"
    | "approval"
    | "blockchain_confirmation"
    | "rejection"
    | "creation";
  timestamp: string;
  data: any;
  actor?: string;
  actorRole?: string;
}

// Mock data store
let transactionEvents: TransactionEvent[] = [
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "creation",
    timestamp: "2023-06-15T10:30:00Z",
    data: {
      tokenAmount: 5000,
      tokenType: "ERC-20",
      redemptionType: "Standard",
      sourceWalletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      destinationWalletAddress: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t",
    },
    actor: "John Smith",
    actorRole: "Investor",
  },
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "status_change",
    timestamp: "2023-06-16T09:15:00Z",
    data: {
      oldStatus: "pending",
      newStatus: "approved",
    },
    actor: "System",
  },
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "approval",
    timestamp: "2023-06-16T09:15:00Z",
    data: {
      approverId: "1",
      approverName: "Jane Cooper",
      approverRole: "Fund Manager",
    },
    actor: "Jane Cooper",
    actorRole: "Fund Manager",
  },
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "approval",
    timestamp: "2023-06-17T14:30:00Z",
    data: {
      approverId: "2",
      approverName: "Robert Fox",
      approverRole: "Compliance Officer",
    },
    actor: "Robert Fox",
    actorRole: "Compliance Officer",
  },
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "status_change",
    timestamp: "2023-06-18T11:20:00Z",
    data: {
      oldStatus: "approved",
      newStatus: "processing",
    },
    actor: "System",
  },
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "blockchain_confirmation",
    timestamp: "2023-06-18T11:25:00Z",
    data: {
      transactionHash: "0x7d2b8c6a2b3d4e5f1a2b3c4d5e6f7a8b9c0d1e2f",
      blockNumber: 15243789,
      networkFee: "0.0025 ETH",
    },
    actor: "Blockchain",
  },
  {
    id: uuidv4(),
    requestId: "RDM-12345",
    eventType: "status_change",
    timestamp: "2023-06-18T11:30:00Z",
    data: {
      oldStatus: "processing",
      newStatus: "completed",
    },
    actor: "System",
  },
  // Events for RDM-67890
  {
    id: uuidv4(),
    requestId: "RDM-67890",
    eventType: "creation",
    timestamp: "2023-06-10T14:45:00Z",
    data: {
      tokenAmount: 10000,
      tokenType: "ERC-721",
      redemptionType: "Express",
      sourceWalletAddress: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      destinationWalletAddress: "0x8a7b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s",
    },
    actor: "Sarah Johnson",
    actorRole: "Investor",
  },
  {
    id: uuidv4(),
    requestId: "RDM-67890",
    eventType: "approval",
    timestamp: "2023-06-12T09:30:00Z",
    data: {
      approverId: "1",
      approverName: "Jane Cooper",
      approverRole: "Fund Manager",
    },
    actor: "Jane Cooper",
    actorRole: "Fund Manager",
  },
  {
    id: uuidv4(),
    requestId: "RDM-67890",
    eventType: "approval",
    timestamp: "2023-06-12T11:45:00Z",
    data: {
      approverId: "2",
      approverName: "Robert Fox",
      approverRole: "Compliance Officer",
    },
    actor: "Robert Fox",
    actorRole: "Compliance Officer",
  },
  {
    id: uuidv4(),
    requestId: "RDM-67890",
    eventType: "approval",
    timestamp: "2023-06-13T10:15:00Z",
    data: {
      approverId: "3",
      approverName: "Esther Howard",
      approverRole: "Treasury Manager",
    },
    actor: "Esther Howard",
    actorRole: "Treasury Manager",
  },
  {
    id: uuidv4(),
    requestId: "RDM-67890",
    eventType: "status_change",
    timestamp: "2023-06-13T10:20:00Z",
    data: {
      oldStatus: "pending",
      newStatus: "approved",
    },
    actor: "System",
  },
];

// API functions

// Get transaction history for a specific redemption request
export const getTransactionHistory = async (
  requestId: string,
): Promise<TransactionEvent[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Filter events for the specified request ID and sort by timestamp
  const events = transactionEvents
    .filter((event) => event.requestId === requestId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  return events;
};

// Add a new transaction event
export const addTransactionEvent = async (
  event: Omit<TransactionEvent, "id">,
): Promise<TransactionEvent> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newEvent: TransactionEvent = {
    ...event,
    id: uuidv4(),
  };

  transactionEvents.push(newEvent);
  return newEvent;
};

// Get all transaction events (for admin purposes)
export const getAllTransactionEvents = async (): Promise<
  TransactionEvent[]
> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Sort by timestamp (newest first)
  return [...transactionEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};

// Get transaction events by type
export const getTransactionEventsByType = async (
  eventType: TransactionEvent["eventType"],
): Promise<TransactionEvent[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Filter events by type and sort by timestamp
  const events = transactionEvents
    .filter((event) => event.eventType === eventType)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  return events;
};
