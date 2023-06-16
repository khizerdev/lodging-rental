'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster
        position="top-right"
        toastOptions={{
            duration: 5000,
            // Default options for specific types
            success: {
                style: {
                    background: '#388e3c',
                    color: '#fff',
                },
                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: '#fff',
                    secondary: '#388e3c',
                },
            },
            error: {
                style: {
                    background: '#d32f2f',
                    color: '#fff',
                },
                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: '#fff',
                    secondary: '#d32f2f',
                },
            },
        }}
    />
   );
}
 
export default ToasterProvider;
