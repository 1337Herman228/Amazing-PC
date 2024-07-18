import "../styles/style.scss";
import './layout.scss';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Amazing PC",
  description: "Website about personal computer hardware",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <Navbar />
          <main className="main-body">
              {children}
          </main>
          <Footer/>
        </body>
      </StoreProvider>
    </html>
  );
}
