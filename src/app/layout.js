import "../styles/style.scss";
import './layout.scss';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export const metadata = {
  title: "Amazing PC",
  description: "Website about personal computer hardware",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <Navbar />
          <main className="main-body">
              {children}
          </main>
          <Footer/>
        </body>
    </html>
  );
}
