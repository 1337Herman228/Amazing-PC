import "../styles/style.scss";
import Navbar from "../components/navbar/Navbar";

export const metadata = {
  title: "Amazing PC",
  description: "Website about personal computer hardware",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
