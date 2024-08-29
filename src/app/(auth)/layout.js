import "../../styles/style.scss";
import StoreProvider from "../StoreProvider";

export const metadata = {
  title: "Amazing PC",
  description: "Website about personal computer hardware",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <main className="main-body">
              {children}
          </main>
        </body>
      </StoreProvider>
    </html>
  );
}
