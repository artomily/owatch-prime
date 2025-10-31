"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef,
} from "react";

// Types
interface WalletState {
  isConnected: boolean;
  address: string;
  balance: number;
  isConnecting: boolean;
  error: string | null;
  // Hedera/HashPack related flags
  hashpackAvailable?: boolean;
  hashconnectAvailable?: boolean;
  showDummyOption?: boolean;
}

type WalletAction =
  | { type: "CONNECT_START" }
  | {
      type: "CONNECT_SUCCESS";
      payload: { address: string; balance: number; provider?: string };
    }
  | { type: "CONNECT_ERROR"; payload: string }
  | { type: "DISCONNECT" }
  | { type: "UPDATE_BALANCE"; payload: number }
  | { type: "SET_HASHPACK_AVAILABLE"; payload: boolean }
  | { type: "SET_HASHCONNECT_AVAILABLE"; payload: boolean }
  | { type: "SHOW_DUMMY_OPTION"; payload: boolean };

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  connectDummy: () => Promise<void>;
  disconnect: () => void;
  updateBalance: (balance: number) => void;
}

// Initial state
const initialState: WalletState = {
  isConnected: false,
  address: "",
  balance: 0,
  isConnecting: false,
  error: null,
  hashpackAvailable: undefined,
  hashconnectAvailable: undefined,
  showDummyOption: false,
};

// Reducer
function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case "CONNECT_START":
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    case "CONNECT_SUCCESS":
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        address: action.payload.address,
        balance: action.payload.balance,
        error: null,
      };
    case "SET_HASHPACK_AVAILABLE":
      return { ...state, hashpackAvailable: action.payload };
    case "SET_HASHCONNECT_AVAILABLE":
      return { ...state, hashconnectAvailable: action.payload };
    case "SHOW_DUMMY_OPTION":
      return { ...state, showDummyOption: action.payload };
    case "CONNECT_ERROR":
      return {
        ...state,
        isConnecting: false,
        error: action.payload,
      };
    case "DISCONNECT":
      return {
        ...initialState,
      };
    case "UPDATE_BALANCE":
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
}

// Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const hashConnectRef = useRef<any>(null);

  // On mount, detect whether HashPack extension is available in production and whether
  // the optional HashConnect library is present (for development flows).
  useEffect(() => {
    const win: any = typeof window !== "undefined" ? window : undefined;
    const hasHashpack = !!(win && (win.hashpack || win.hedera || win.Hedera));
    dispatch({ type: "SET_HASHPACK_AVAILABLE", payload: hasHashpack });

    (async () => {
      try {
        // Import using a constructed string to avoid bundlers statically
        // resolving the optional package when it's not installed.
        const pkg = ["@hashgraph", "hashconnect"].join("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mod = await import(pkg);
        if (mod && (mod.HashConnect || mod.default)) {
          dispatch({ type: "SET_HASHCONNECT_AVAILABLE", payload: true });
        } else {
          dispatch({ type: "SET_HASHCONNECT_AVAILABLE", payload: false });
        }
      } catch (e) {
        // If the package isn't installed or import fails, mark as unavailable
        dispatch({ type: "SET_HASHCONNECT_AVAILABLE", payload: false });
      }
    })();
  }, []);

  const connect = async () => {
    dispatch({ type: "CONNECT_START" });

    try {
      const isDev = process.env.NODE_ENV === "development";
      const win: any = typeof window !== "undefined" ? window : undefined;

      // Development: prefer HashConnect (library-driven flow) if present
      if (isDev) {
        try {
          const pkg = ["@hashgraph", "hashconnect"].join("/");
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const mod = await import(pkg);
          const HashConnect = mod.HashConnect || mod.default;
          const hc = new HashConnect();
          hashConnectRef.current = hc;

          const appMetadata = {
            name: "owatch-prime (dev)",
            description: "owatch-prime development app",
            icon: "",
          };

          try {
            // Attempt a minimal init/connect. Full integration should follow HashConnect docs.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await hc.init(appMetadata, true);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await hc.connect();

            const pairedAccount = (hc as any).pairedAccounts?.[0] || null;
            const address =
              pairedAccount ||
              `hashdev:${Math.random().toString(36).slice(2, 10)}`;
            const mockBalance = Math.floor(Math.random() * 10000);

            dispatch({
              type: "CONNECT_SUCCESS",
              payload: {
                address,
                balance: mockBalance,
                provider: "hashconnect",
              },
            });
            return;
          } catch (hcErr) {
            console.warn(
              "HashConnect init/connect failed, falling back to mock dev wallet",
              hcErr
            );
            const mockAddress = `hashdev:${Math.random()
              .toString(36)
              .slice(2, 10)}`;
            const mockBalance = Math.floor(Math.random() * 10000);
            dispatch({
              type: "CONNECT_SUCCESS",
              payload: {
                address: mockAddress,
                balance: mockBalance,
                provider: "mock-dev",
              },
            });
            return;
          }
        } catch (e) {
          // hashconnect library not present — use a mock dev wallet
          const mockAddress = `hashdev:${Math.random()
            .toString(36)
            .slice(2, 10)}`;
          const mockBalance = Math.floor(Math.random() * 10000);
          dispatch({
            type: "CONNECT_SUCCESS",
            payload: {
              address: mockAddress,
              balance: mockBalance,
              provider: "mock-dev",
            },
          });
          return;
        }
      }

      // Production: prefer HashPack (browser extension). If not available, show dummy option.
      const hasHashpack = !!(win && (win.hashpack || win.hedera || win.Hedera));
      if (hasHashpack) {
        try {
          const provider = win.hashpack;
          if (provider && typeof provider.connect === "function") {
            const result = await provider.connect();
            const address =
              result?.account ||
              result?.accountId ||
              result?.address ||
              String(result) ||
              `hash:${Math.random().toString(36).slice(2, 10)}`;
            const mockBalance = Math.floor(Math.random() * 10000);
            dispatch({
              type: "CONNECT_SUCCESS",
              payload: { address, balance: mockBalance, provider: "hashpack" },
            });
            return;
          }

          const addressGuess =
            provider?.selectedAccount ||
            provider?.account ||
            provider?.accountId ||
            undefined;
          if (addressGuess) {
            const mockBalance = Math.floor(Math.random() * 10000);
            dispatch({
              type: "CONNECT_SUCCESS",
              payload: {
                address: String(addressGuess),
                balance: mockBalance,
                provider: "hashpack",
              },
            });
            return;
          }

          dispatch({ type: "SHOW_DUMMY_OPTION", payload: true });
          dispatch({
            type: "CONNECT_ERROR",
            payload:
              "HashPack found but automatic connect failed; please use the wallet UI.",
          });
          return;
        } catch (err) {
          console.warn("Error connecting to HashPack", err);
          dispatch({ type: "SHOW_DUMMY_OPTION", payload: true });
          dispatch({
            type: "CONNECT_ERROR",
            payload: "Failed to connect to HashPack",
          });
          return;
        }
      } else {
        // HashPack not present in production: offer dummy wallet option in UI
        dispatch({ type: "SHOW_DUMMY_OPTION", payload: true });
        dispatch({ type: "CONNECT_ERROR", payload: "HashPack not detected" });
        return;
      }
    } catch (error) {
      dispatch({
        type: "CONNECT_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to connect wallet",
      });
    }
  };

  const connectDummy = async () => {
    dispatch({ type: "CONNECT_START" });
    await new Promise((r) => setTimeout(r, 500));
    const dummy = `dummy:${Math.random().toString(36).slice(2, 10)}`;
    const mockBalance = Math.floor(Math.random() * 10000);
    dispatch({
      type: "CONNECT_SUCCESS",
      payload: { address: dummy, balance: mockBalance, provider: "dummy" },
    });
  };

  const disconnect = () => {
    dispatch({ type: "DISCONNECT" });
  };

  const updateBalance = (balance: number) => {
    dispatch({ type: "UPDATE_BALANCE", payload: balance });
  };

  const value: WalletContextType = {
    ...state,
    connect,
    connectDummy,
    disconnect,
    updateBalance,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

// Hook to use wallet context
export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
}
