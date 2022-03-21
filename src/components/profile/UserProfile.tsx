import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Grid,
  Icon,
  Input,
  FormLabel,
  Button,
  keyframes,
  useColorMode,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { FaUser } from "react-icons/fa";
import { IoIosCamera } from "react-icons/io";
import DefaultUser from "../../images/user.webp";

type UserProfileProps = {
  user: UserTypes;
  photo: string | undefined;
  photoLoading: boolean;
  onEdit: () => void;
  onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UserProfile = (props: UserProfileProps) => {
  const { user, photo, onEdit, photoLoading, onPhotoChange } = props;
  const { colorMode } = useColorMode();

  const spin = keyframes`
  0%{ transform: rotate(0deg);}  
  100% { transform: rotate(360deg);}
`;

  const animation = `${spin} infinite 600ms linear `;

  return (
    <Box>
      <Flex as="section" justify="space-between">
        <Flex align="center">
          <Icon
            as={FaUser}
            boxSize={{ base: "18px", sm: "20px", lg: "24px" }}
            color="primary"
          />
          <Heading
            as="h1"
            ml={{ base: "1", sm: "2" }}
            fontSize={{ base: "18px", sm: "24px" }}
          >
            Profile
          </Heading>
        </Flex>

        <Button
          bg="primary"
          color="#fff"
          _hover={{ bg: "primary", color: "#fff" }}
          _active={{ bg: "primary", color: "#fff" }}
          fontSize={{ base: "14px", sm: "1rem" }}
          onClick={onEdit}
        >
          Edit Profile
        </Button>
      </Flex>

      <Box
        mt="6"
        p="4"
        as="section"
        borderRadius="md"
        maxW={{ sm: "450px" }}
        justifySelf={{ sm: "start" }}
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Flex
          align="center"
          fontSize={{ base: "16px", sm: "18px" }}
          direction={{ base: "column", sm: "row" }}
        >
          <Flex align="flex-end" position="relative">
            <Image
              w="100px"
              h="100px"
              borderRadius="full"
              alt="Profile photo"
              src={
                photo
                  ? photo.replace(
                      "upload/",
                      "upload/c_thumb,g_face,w_300,h_300/"
                    )
                  : DefaultUser
              }
            />

            <FormLabel
              mr="0"
              mb="0"
              ml="-8"
              minW="40px"
              minH="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="rgb(227, 233, 239)"
              htmlFor="profile-image"
              cursor="pointer"
            >
              <Icon color="rgb(15, 52, 96)" boxSize="22px" as={IoIosCamera} />
            </FormLabel>

            <Input
              id="profile-image"
              type="file"
              accept="image/png, image/jpeg"
              display="none"
              onChange={onPhotoChange}
            />
            <Box
              w="40px"
              h="40px"
              left="30px"
              top="30px"
              borderRadius="50%"
              position="absolute"
              animation={animation}
              display={photoLoading ? "block" : "none"}
              border="3px solid rgb(15, 52, 96)"
              borderTopColor="transparent"
            ></Box>
          </Flex>

          {user && (
            <Box
              ml={{ sm: "4" }}
              mt={{ base: "3", sm: "0" }}
              alignSelf="center"
            >
              <Heading
                as="h2"
                fontSize={{ sm: "18px" }}
                textAlign={{ base: "center", sm: "left" }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Heading>
              <Text>{user.email}</Text>
            </Box>
          )}
        </Flex>
      </Box>

      <Grid
        mt="6"
        p="4"
        gridGap="3"
        borderRadius="md"
        fontSize={{ base: "14px", md: "16px" }}
        gridTemplateColumns={{
          sm: "1fr 1fr 1fr 1fr",
        }}
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
        bg={colorMode === "light" ? "#fff" : "surfaceDarkBg"}
      >
        <Flex direction="column">
          <Box
            fontSize={{ base: "12px", md: "14px" }}
            color={colorMode === "light" ? "rgb(84 97 125)" : "light"}
          >
            First name
          </Box>
          <Box>{user?.firstName}</Box>
        </Flex>

        <Flex direction="column">
          <Box
            fontSize={{ base: "12px", md: "14px" }}
            color={colorMode === "light" ? "rgb(84 97 125)" : "light"}
          >
            Last name
          </Box>
          <Box>{user?.lastName}</Box>
        </Flex>

        <Flex direction="column">
          <Box
            fontSize={{ base: "12px", md: "14px" }}
            color={colorMode === "light" ? "rgb(84 97 125)" : "light"}
          >
            Phone number
          </Box>
          <Box>{user?.phone}</Box>
        </Flex>

        <Flex direction="column">
          <Box
            fontSize={{ base: "12px", md: "14px" }}
            color={colorMode === "light" ? "rgb(84 97 125)" : "light"}
          >
            Date of Birth
          </Box>
          <Box>{user?.dob && format(parseISO(user.dob), "dd/MM/yyyy")}</Box>
        </Flex>
      </Grid>
    </Box>
  );
};

export default UserProfile;
