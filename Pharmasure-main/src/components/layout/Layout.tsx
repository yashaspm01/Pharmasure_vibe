import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, useColorModeValue } from '@chakra-ui/react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      when: 'beforeChildren',
    }
  },
  exit: { 
    opacity: 0, 
    x: 0, 
    y: -100,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }
  },
};

export default function Layout({ children, title = 'PharmaSure', description = 'Your personal medication management assistant' }: LayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.900');

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      window.scrollTo(0, 0);
      setTimeout(() => setIsLoading(false), 300);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <Head>
        <title>{title} | PharmaSure</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0084ff" />
      </Head>

      <Navbar />

      <Box as="main" flex={1} position="relative" overflowX="hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            style={{ height: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <Footer />
    </Box>
  );
}
