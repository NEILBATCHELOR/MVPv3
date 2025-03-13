import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard/Dashboard";
import InvestorsList from "./components/investors/InvestorsList";
import ReportsDashboard from "./components/reports/ReportsDashboard";
import TokenBuilder from "./components/tokens/TokenBuilder";
import TokenAdministration from "./components/tokens/TokenAdministration";
import MainLayout from "./components/layout/MainLayout";
import CapTableManagerNew from "./components/captable/CapTableManagerNew";
import RuleManagementDashboard from "./components/rules/RuleManagementDashboard"; // Import rule management component
import RoleManagementDashboard from "./components/UserManagement/RoleManagementDashboard"; // Import Role Management
import RedemptionDashboard from "./components/redemption/RedemptionDashboard"; // Import Redemption Management


import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        {/* Main routes with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Home />} />

          {/* Global Cap Table routes */}
          <Route
            path="/captable"
            element={<CapTableManagerNew section="overview" />}
          />
          <Route
            path="/captable/investors"
            element={<CapTableManagerNew section="investors" />}
          />
          <Route
            path="/captable/subscriptions"
            element={<CapTableManagerNew section="subscriptions" />}
          />
          <Route
            path="/captable/allocations"
            element={<CapTableManagerNew section="allocations" />}
          />
          <Route
            path="/captable/distributions"
            element={<CapTableManagerNew section="distributions" />}
          />
          <Route
            path="/captable/compliance"
            element={<CapTableManagerNew section="compliance" />}
          />
          <Route
            path="/captable/reports"
            element={<CapTableManagerNew section="reports" />}
          />
          <Route
            path="/captable/documents"
            element={<CapTableManagerNew section="documents" />}
          />
          <Route
            path="/captable/minting"
            element={<CapTableManagerNew section="minting" />}
          />

          {/* Project-specific Cap Table routes */}
          <Route
            path="/projects/:projectId/captable"
            element={<CapTableManagerNew />}
          />
          <Route
            path="/projects/:projectId/captable/investors"
            element={<CapTableManagerNew section="investors" />}
          />
          <Route
            path="/projects/:projectId/captable/subscriptions"
            element={<CapTableManagerNew section="subscriptions" />}
          />
          <Route
            path="/projects/:projectId/captable/allocations"
            element={<CapTableManagerNew section="allocations" />}
          />
          <Route
            path="/projects/:projectId/captable/distributions"
            element={<CapTableManagerNew section="distributions" />}
          />
          <Route
            path="/projects/:projectId/captable/minting"
            element={<CapTableManagerNew section="minting" />}
          />
		  <Route 
		    path="/redemption" 
		    element={<RedemptionDashboard />} 
		  />
          {/* Other routes */}
          <Route
            path="/rule-management"
            element={<RuleManagementDashboard />}
          />
          <Route
            path="/role-management"
            element={<RoleManagementDashboard />}
          />
          <Route path="/investors" element={<InvestorsList />} />
          <Route path="/reports" element={<ReportsDashboard />} />
          <Route
            path="/projects/:projectId/tokens"
            element={<TokenBuilder />}
          />
          <Route
            path="/projects/:projectId/token-admin"
            element={<TokenAdministration />}
          />
        </Route>

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
