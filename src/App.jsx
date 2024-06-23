import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { loginRequest } from "./auth-config";

const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <AuthenticatedTemplate>
          {activeAccount && (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Authenticated Successfully
              </p>
              <p className="text-gray-600">
                Welcome, {activeAccount.username}!
              </p>
            </div>
          )}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleRedirect}
          >
            Sign Up
          </button>
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrappedView />
    </MsalProvider>
  );
};
export default App;
