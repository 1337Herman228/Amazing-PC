
// export default function AuthLayout({ children }) {
//     return(
//         <div>
//             {children}
//         </div>
//     )
// }

// import "../styles/style.scss";
// import './layout.scss';

export const metadata = {
  title: "Amazing PC",
  description: "Website about personal computer hardware",
};

export default function RootLayout({ children }) {
  return (
    <div className="main-body">
        {children}
    </div>
  );
}
