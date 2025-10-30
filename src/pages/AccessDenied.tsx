// src/pages/AccessDenied.tsx
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Restricted
        </h1>

        <p className="text-gray-600 mb-6">
          This page is only available to <span className="font-semibold text-blue-600">Hospital Administrators</span>.
          <br />
          Patient accounts do not have permission to view patient records.
        </p>

        <div className="flex gap-3 justify-center">
          <Button asChild variant="default">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          If you believe this is an error, contact your hospital admin.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;