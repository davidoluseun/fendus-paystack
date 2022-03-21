import * as React from "react";
import { Box, Grid, useColorMode } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { AppContext } from "../common/AppContext";
import AccountNav from "../common/AccountNav";
import UserProfile from "./UserProfile";
import ProfileForm from "./ProfileForm";
import { upload } from "../../services/imageUploadService";
import { saveUser, saveUserPhoto } from "../../services/userService";

const Profile = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [onEdit, setOnEdit] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const { colorMode } = useColorMode();

  const handleProfileEdit = () => setOnEdit(true);

  const handlePhotoURLChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    const regex = /\.(jpe?g|png)$/i;

    if (file) {
      if (regex.test(file.name)) {
        setLoading(true);

        try {
          const { data } = await upload(file);

          const request = { img: data.secure_url };
          await saveUserPhoto(request);
          dispatch({ type: "SET_PROFILE_PHOTO", payload: data.secure_url });
        } catch (ex) {}

        setLoading(false);
      } else
        colorMode === "light"
          ? toast.dark("Please select a valid jpeg or png file.")
          : toast("Please select a valid jpeg or png file.");
    }
  };

  const handleSubmit = async (info: SaveUserTypes) => {
    try {
      const { data } = await saveUser(info);

      dispatch({ type: "SET_USER", payload: data });
      setOnEdit(false);

      return true;
    } catch (ex) {
      return false;
    }
  };

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        {!onEdit ? (
          <UserProfile
            user={state.user}
            photo={state.profilePhoto}
            photoLoading={isLoading}
            onPhotoChange={handlePhotoURLChange}
            onEdit={handleProfileEdit}
          />
        ) : (
          <ProfileForm user={state.user} doSubmit={handleSubmit} />
        )}
      </Grid>
    </Box>
  );
};

export default Profile;
