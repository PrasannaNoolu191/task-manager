import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import styles from "../../styles/styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../../utils/validations";
import FormInputField from "../../hooks/form-input-field";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../context/toast-context";
import { RootState } from "../../store";
import { updateUser } from "../../api/auth";
import { setUser } from "../../store/slices/auth-slice";
import { getAvatarUrl, getInitials } from "../../utils/functions";
const EditUserDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.username || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(editUserSchema),
    mode: "onChange",
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (user?.avatar) {
      setAvatar(getAvatarUrl(user.avatar));
    } else {
      setAvatar(null);
    }
  }, [user]);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      if (user?.id !== undefined && user?.id !== null) {
        formData.append("id", String(user.id));
      }
      formData.append("username", data.userName);
      formData.append("email", data.email);
      formData.append("currentPassword", data.currentPassword);
      formData.append("newPassword", data.newPassword);
      if (fileInputRef.current?.files?.[0]) {
        formData.append("avatar", fileInputRef.current.files[0]);
      }
      const response = await updateUser(formData);
      if (response.success) {
        dispatch(
          setUser({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            avatar: response.user.avatar,
          }),
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            avatar: response.user.avatar,
          }),
        );
        showToast("Profile updated successfully", "success");
      }
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Update failed", "error");
    }
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography fontWeight={600} variant="h6">
                Edit User Details
              </Typography>
            </Grid>
            <Grid container spacing={2} size={{ xs: 12 }}>
              <Grid size={{ xs: 3, sm: 3, md: 3 }}>
                <Box
                  sx={styles.flexColumnTwoGapBox}
                  justifyContent={"center"}
                  alignItems={"center"}>
                  <Avatar sx={{ width: 150, height: 150, fontSize: 32 }}>
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Profile"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      getInitials("Joe")
                    )}
                  </Avatar>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={handleAvatarClick}>
                    Change Avatar
                  </Box>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                </Box>
              </Grid>
              <Grid container size={{ xs: 9, sm: 9, md: 9 }} spacing={2}>
                <Grid size={{ xs: 5, sm: 5, md: 5 }}>
                  <Box sx={styles.flexColumnTwoGapBox}>
                    <FormInputField
                      name="userName"
                      label="Username"
                      placeholder="Enter Username"
                      control={control}
                      errors={errors}
                      // size="small"
                    />
                    <FormInputField
                      name="currentPassword"
                      label="Current Password"
                      placeholder="Enter Current Password"
                      control={control}
                      errors={errors}
                      // size="small"
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 5, sm: 5, md: 5 }}>
                  <Box sx={styles.flexColumnTwoGapBox}>
                    <FormInputField
                      name="email"
                      label="Email"
                      placeholder="Enter Email"
                      control={control}
                      errors={errors}
                      // size="small"
                    />
                    <FormInputField
                      name="newPassword"
                      label="New Password"
                      placeholder="Enter New Password"
                      control={control}
                      errors={errors}
                      // size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button type="submit" variant="contained" sx={{ ...styles.button }}>
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default EditUserDetails;
