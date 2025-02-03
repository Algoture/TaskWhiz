import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "TaskWhiz",
  description: "A simple task management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
