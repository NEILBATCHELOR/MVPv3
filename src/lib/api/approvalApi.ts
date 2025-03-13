import { v4 as uuidv4 } from "uuid";

// Types for the API
export interface Approver {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  approved: boolean;
  timestamp?: string;
}

export interface RedemptionRequest {
  id: string;
  requestDate: string;
  tokenAmount: number;
  tokenType: string;
  redemptionType: string;
  status: "Pending" | "Approved" | "Processing" | "Completed" | "Rejected";
  sourceWalletAddress: string;
  destinationWalletAddress: string;
  conversionRate: number;
  investorName?: string;
  investorId?: string;
  isBulkRedemption?: boolean;
  investorCount?: number;
  approvers: Approver[];
  requiredApprovals: number;
}

// Mock data store
let redemptionRequests: RedemptionRequest[] = [
  {
    id: "RDM-12345",
    requestDate: "2023-06-15T10:30:00Z",
    tokenAmount: 5000,
    tokenType: "ERC-20",
    redemptionType: "Standard",
    status: "Pending",
    sourceWalletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    destinationWalletAddress: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t",
    conversionRate: 0.85,
    investorName: "John Smith",
    investorId: "INV-78901",
    approvers: [
      {
        id: "1",
        name: "Jane Cooper",
        role: "Fund Manager",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=jane",
        approved: false,
        timestamp: "",
      },
      {
        id: "2",
        name: "Robert Fox",
        role: "Compliance Officer",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=robert",
        approved: false,
        timestamp: "",
      },
      {
        id: "3",
        name: "Esther Howard",
        role: "Treasury Manager",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=esther",
        approved: false,
      },
      {
        id: "4",
        name: "Cameron Williamson",
        role: "Board Member",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=cameron",
        approved: false,
      },
    ],
    requiredApprovals: 3,
  },
  {
    id: "RDM-67890",
    requestDate: "2023-06-10T14:45:00Z",
    tokenAmount: 10000,
    tokenType: "ERC-721",
    redemptionType: "Express",
    status: "Approved",
    sourceWalletAddress: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    destinationWalletAddress: "0x8a7b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s",
    conversionRate: 1.2,
    investorName: "Sarah Johnson",
    investorId: "INV-45678",
    approvers: [
      {
        id: "1",
        name: "Jane Cooper",
        role: "Fund Manager",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=jane",
        approved: true,
        timestamp: "2023-06-12T09:30:00Z",
      },
      {
        id: "2",
        name: "Robert Fox",
        role: "Compliance Officer",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=robert",
        approved: true,
        timestamp: "2023-06-12T11:45:00Z",
      },
      {
        id: "3",
        name: "Esther Howard",
        role: "Treasury Manager",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=esther",
        approved: true,
        timestamp: "2023-06-13T10:15:00Z",
      },
      {
        id: "4",
        name: "Cameron Williamson",
        role: "Board Member",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=cameron",
        approved: false,
      },
    ],
    requiredApprovals: 3,
  },
];

// API functions

// Get all redemption requests
export const getAllRedemptionRequests = async (): Promise<
  RedemptionRequest[]
> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return redemptionRequests;
};

// Get a specific redemption request by ID
export const getRedemptionRequestById = async (
  id: string,
): Promise<RedemptionRequest | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const request = redemptionRequests.find((req) => req.id === id);
  return request || null;
};

// Create a new redemption request
export const createRedemptionRequest = async (
  request: Omit<RedemptionRequest, "id">,
): Promise<RedemptionRequest> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newRequest: RedemptionRequest = {
    ...request,
    id: `RDM-${Math.floor(10000 + Math.random() * 90000)}`,
  };

  redemptionRequests.push(newRequest);
  return newRequest;
};

// Update a redemption request status
export const updateRedemptionStatus = async (
  id: string,
  status: RedemptionRequest["status"],
): Promise<RedemptionRequest | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const index = redemptionRequests.findIndex((req) => req.id === id);
  if (index === -1) return null;

  redemptionRequests[index] = {
    ...redemptionRequests[index],
    status,
  };

  return redemptionRequests[index];
};

// Approve a redemption request
export const approveRedemptionRequest = async (
  requestId: string,
  approverId: string,
): Promise<RedemptionRequest | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const requestIndex = redemptionRequests.findIndex(
    (req) => req.id === requestId,
  );
  if (requestIndex === -1) return null;

  const request = redemptionRequests[requestIndex];
  const approverIndex = request.approvers.findIndex(
    (app) => app.id === approverId,
  );
  if (approverIndex === -1) return null;

  // Update the approver
  const updatedApprovers = [...request.approvers];
  updatedApprovers[approverIndex] = {
    ...updatedApprovers[approverIndex],
    approved: true,
    timestamp: new Date().toISOString(),
  };

  // Check if we've reached the required approvals
  const approvedCount = updatedApprovers.filter((app) => app.approved).length;
  let updatedStatus = request.status;

  if (
    approvedCount >= request.requiredApprovals &&
    request.status === "Pending"
  ) {
    updatedStatus = "Approved";
  }

  // Update the request
  redemptionRequests[requestIndex] = {
    ...request,
    approvers: updatedApprovers,
    status: updatedStatus,
  };

  return redemptionRequests[requestIndex];
};

// Reject a redemption request
export const rejectRedemptionRequest = async (
  requestId: string,
  approverId: string,
  reason: string,
): Promise<RedemptionRequest | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const requestIndex = redemptionRequests.findIndex(
    (req) => req.id === requestId,
  );
  if (requestIndex === -1) return null;

  // Update the request status to rejected
  redemptionRequests[requestIndex] = {
    ...redemptionRequests[requestIndex],
    status: "Rejected",
    rejectionReason: reason,
    rejectedBy: approverId,
    rejectionTimestamp: new Date().toISOString(),
  } as any;

  return redemptionRequests[requestIndex];
};

// Get all approvers
export const getAllApprovers = async (): Promise<Approver[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Return a unique list of all approvers from all requests
  const approvers = new Map<string, Approver>();

  redemptionRequests.forEach((request) => {
    request.approvers.forEach((approver) => {
      if (!approvers.has(approver.id)) {
        approvers.set(approver.id, {
          ...approver,
          approved: false,
          timestamp: undefined,
        });
      }
    });
  });

  return Array.from(approvers.values());
};

// Get pending approvals for an approver
export const getPendingApprovalsForApprover = async (
  approverId: string,
): Promise<RedemptionRequest[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return redemptionRequests.filter((request) => {
    // Find the approver in this request
    const approver = request.approvers.find((app) => app.id === approverId);
    // Include this request if the approver exists, hasn't approved yet, and the request is pending
    return approver && !approver.approved && request.status === "Pending";
  });
};

// Get approval history for an approver
export const getApprovalHistoryForApprover = async (
  approverId: string,
): Promise<RedemptionRequest[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return redemptionRequests.filter((request) => {
    // Find the approver in this request
    const approver = request.approvers.find((app) => app.id === approverId);
    // Include this request if the approver exists and has approved
    return approver && approver.approved;
  });
};
