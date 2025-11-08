import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  IconButton, 
  useColorMode, 
  useColorModeValue, 
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  VStack,
  Divider,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/firebase';
import { auth } from '@/firebase/config';

const Navbar = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadow = useColorModeValue('sm', 'dark-lg');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Medications', path: '/medications' },
    { name: 'Reminders', path: '/reminders' },
    { name: 'Health', path: '/health' },
  ];

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box 
      as="header" 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={1000}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow={scrolled ? shadow : 'none'}
      transition="all 0.2s"
    >
      <Flex 
        maxW="7xl" 
        mx="auto" 
        px={{ base: 4, md: 6, lg: 8 }} 
        h="16" 
        alignItems="center" 
        justifyContent="space-between"
      >
        {/* Logo */}
        <Flex alignItems="center">
          <Link href="/" passHref>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
              cursor="pointer"
            >
              PharmaSure
            </Text>
          </Link>
        </Flex>

        {/* Desktop Navigation */}
        <Box display={{ base: 'none', md: 'block' }}>
          <HStack spacing={8}>
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <Text
                  as="span"
                  fontSize="md"
                  fontWeight={router.pathname === item.path ? 'semibold' : 'medium'}
                  color={router.pathname === item.path ? 'brand.500' : 'gray.600'}
                  _dark={{ color: router.pathname === item.path ? 'brand.300' : 'gray.300' }}
                  _hover={{
                    color: 'brand.500',
                    _dark: { color: 'brand.300' },
                  }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  {item.name}
                </Text>
              </Link>
            ))}
          </HStack>
        </Box>

        {/* Right side actions */}
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />
          
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="ghost"
                cursor="pointer"
                minW={0}
                p={0}
              >
                <Avatar
                  size="sm"
                  name={user.displayName || 'User'}
                  src={user.photoURL || ''}
                />
              </MenuButton>
              <MenuList zIndex={1500}>
                <VStack px={4} py={2} spacing={1} alignItems="flex-start">
                  <Text fontWeight="semibold">{user.displayName || 'User'}</Text>
                  <Text fontSize="sm" color="gray.500">{user.email}</Text>
                </VStack>
                <Divider my={1} />
                <MenuItem icon={<FiUser size={16} />}>Profile</MenuItem>
                <MenuItem icon={<FiSettings size={16} />}>Settings</MenuItem>
                <Divider my={1} />
                <MenuItem 
                  icon={<FiLogOut size={16} />} 
                  color="red.500"
                  onClick={handleSignOut}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/login')}
                display={{ base: 'none', sm: 'inline-flex' }}
              >
                Sign In
              </Button>
              <Button 
                colorScheme="brand" 
                size="sm" 
                onClick={() => router.push('/signup')}
                display={{ base: 'none', sm: 'inline-flex' }}
              >
                Get Started
              </Button>
            </>
          )}

          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <FiX /> : <FiMenu />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <VStack 
              p={4} 
              spacing={4} 
              borderTop="1px" 
              borderColor={borderColor}
              bg={bg}
            >
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Text
                    as="span"
                    display="block"
                    w="full"
                    px={4}
                    py={2}
                    borderRadius="md"
                    fontWeight={router.pathname === item.path ? 'semibold' : 'medium'}
                    color={router.pathname === item.path ? 'brand.500' : 'gray.600'}
                    _dark={{ color: router.pathname === item.path ? 'brand.300' : 'gray.300' }}
                    _hover={{
                      bg: 'gray.100',
                      _dark: { bg: 'gray.700' },
                    }}
                    onClick={onToggle}
                  >
                    {item.name}
                  </Text>
                </Link>
              ))}
              
              {!user && (
                <HStack w="full" spacing={4} pt={2}>
                  <Button 
                    variant="outline" 
                    w="full"
                    onClick={() => {
                      onToggle();
                      router.push('/login');
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    colorScheme="brand" 
                    w="full"
                    onClick={() => {
                      onToggle();
                      router.push('/signup');
                    }}
                  >
                    Get Started
                  </Button>
                </HStack>
              )}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
