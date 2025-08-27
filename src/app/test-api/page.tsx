"use client";

import React, { useState } from "react";

const TestApiPage = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/health");
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: `test${Date.now()}@example.com`,
          password: "password123",
          phone: "1234567890",
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testBackendConnection}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Test Backend Health
          </button>
          
          <button
            onClick={testRegistration}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg ml-4"
          >
            Test User Registration
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-blue-600">Testing...</div>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Current Configuration:</h3>
          <p><strong>Backend URL:</strong> http://localhost:5001/api</p>
          <p><strong>Frontend URL:</strong> http://localhost:3000</p>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL}</p>
        </div>
      </div>
    </div>
  );
};

export default TestApiPage;
