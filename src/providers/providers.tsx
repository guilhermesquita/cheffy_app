"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { CustomTheme } from "@/theme/CustomTheme";
import { Toaster } from "react-hot-toast";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CustomTheme>
          {children}
          <Toaster />
        </CustomTheme>
      </SessionProvider>
    </QueryClientProvider>
  );
}