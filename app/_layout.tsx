import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Important: don't put queryclient in the component.
const queryClient = new QueryClient();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setIsInitialized(true);
    });

    return data.subscription.unsubscribe;
  }, [supabase]);

  useEffect(() => {
    if (!isInitialized) return;
    const isInProtected = segments[0] === "(protected)";

    if (isInProtected && !session) {
      router.replace(`/`);
    } else if (!isInProtected && session) {
      router.replace(`/(protected)`);
    }
  }, [segments, router, isInitialized, session]);
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
