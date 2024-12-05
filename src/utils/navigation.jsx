'use client'; // Enforces that this is a client-side hook
import { useRouter } from 'next/navigation'; // In Next.js 14, 'next/navigation' is used instead of 'next/router'

const useNavigation = () => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path); // Handles navigation
  };

  return { navigate };
};

export default useNavigation;
