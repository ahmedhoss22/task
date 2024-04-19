import { Toaster } from "react-hot-toast";
import TableComponent from "./pages/Table";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        gutter={8}
        containerStyle={{ margin: "12px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />
      <TableComponent/>

    </>
  );
}

export default App;
