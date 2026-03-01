// Listing creation screen with live data + backend submission.

import React, { useMemo, useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

import { useLocalStoreContext } from "../common/providers/localStore";
import { useQueryContext } from "../common/providers/queryContext";
import { useAuthContext } from "../common/providers/authContext";
import {
  createAdvert,
  uploadFile,
} from "../common/utils/commonCalls";

const validationSchema = Yup.object({
  major: Yup.string().required("Select a major"),
  course: Yup.string().required("Select a class"),
  description: Yup.string().required("Add a short description"),
  price: Yup.number().typeError("Enter a valid price").positive("Price must be positive").required("Price is required"),
  location: Yup.string().required("Location is required"),
});

export default function ListingCreation() {
  const navigate = useNavigate();
  const { categories, courses } = useLocalStoreContext();
  const { queryClient } = useQueryContext();
  const { state } = useAuthContext();

  const uploadMutation = useMutation({
    mutationFn: (formData) => uploadFile(queryClient, formData),
  });

  const advertMutation = useMutation({
    mutationFn: (payload) => createAdvert(queryClient, payload),
    onSuccess: () => {
      toast.success("Listing submitted!");
      navigate("/listing_creation/thankyou");
    },
    onError: () => {
      toast.error("Unable to submit your listing right now.");
    },
  });

  const categoryOptions = useMemo(() => {
    if (!categories?.data) return [];
    const uniqueNames = Array.from(new Set(categories.data.map((cat) => cat.name)));
    return uniqueNames;
  }, [categories]);

  const courseOptionsForMajor = (major) => {
    if (!major) return [];
    const categoryCourses = categories?.data
      ?.filter((cat) => cat.name === major)
      ?.map((cat) => cat.courses?.name)
      .filter(Boolean) || [];
    if (!categoryCourses.length) {
      return courses?.data || [];
    }
    return (courses?.data || []).filter((course) =>
      categoryCourses.includes(course.name)
    );
  };

  const findCategoryId = (major, courseId) => {
    if (!categories?.data || !major || !courseId) return null;
    const courseMatch = (courses?.data || []).find((c) => String(c.id) === String(courseId));
    const courseName = courseMatch?.name;
    const match = categories.data.find(
      (cat) => cat.name === major && cat.courses?.name === courseName
    );
    return match ? match.id : null;
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        overflow: "auto",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 6,
          width: "700px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: "60px",
        }}
      >
        <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          Become a Tutor!
        </Typography>

        <Formik
          initialValues={{
            major: "",
            course: "",
            description: "",
            price: "",
            location: "",
            files: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, helpers) => {
            if (!state?.id) {
              toast.error("Please sign in before creating a listing.");
              return;
            }
            try {
              const fileIds = [];
              if (values.files?.length) {
                for (const file of values.files) {
                  const formData = new FormData();
                  formData.append("name", file.name);
                  formData.append("file_type", file);
                  formData.append("uploader", state?.id);
                  const uploadResponse = await uploadMutation.mutateAsync(formData);
                  if (uploadResponse?.id != null) {
                    fileIds.push(uploadResponse.id);
                  }
                }
              }

              const categoryId = findCategoryId(values.major, values.course);

              await advertMutation.mutateAsync({
                catagories: categoryId ? [Number(categoryId)] : [],
                courses: values.course ? [Number(values.course)] : [],
                price_range: Number(values.price),
                location: values.location,
                files: fileIds,
                description: values.description,
                verified: false,
              });
            } catch (err) {
              toast.error("Could not create your listing.");
            } finally {
              helpers.setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
            const coursesForMajor = courseOptionsForMajor(values.major);

            return (
              <Form>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <FormLabel>Major</FormLabel>
                    <Select
                      name="major"
                      value={values.major}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("course", "");
                      }}
                      onBlur={handleBlur}
                      displayEmpty
                      disabled={categories?.isPending}
                    >
                      <MenuItem value="">
                        <em>Select a major</em>
                      </MenuItem>
                      {categoryOptions.map((major) => (
                        <MenuItem key={major} value={major}>
                          {major}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.major && errors.major && (
                      <Typography color="error" variant="caption">
                        {errors.major}
                      </Typography>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <FormLabel>Class</FormLabel>
                    <Select
                    name="course"
                    value={values.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                    disabled={courses?.isPending || !values.major}
                    >
                      <MenuItem value="">
                        <em>Select a class</em>
                      </MenuItem>
                      {coursesForMajor.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.course && errors.course && (
                      <Typography color="error" variant="caption">
                        {errors.course}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    name="description"
                    label="Description"
                    multiline
                    minRows={3}
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.description && errors.description)}
                    helperText={(touched.description && errors.description) || " "}
                  />

                  <TextField
                    name="price"
                    label="Price per hour ($)"
                    type="number"
                    fullWidth
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.price && errors.price)}
                    helperText={(touched.price && errors.price) || " "}
                  />

                  <TextField
                    name="location"
                    label="Location"
                    placeholder="Remote or campus"
                    fullWidth
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.location && errors.location)}
                    helperText={(touched.location && errors.location) || " "}
                  />

                  <Box>
                    <FormLabel>Upload Files (PDF, PNG, JPEG)</FormLabel>
                    <DropzoneField setFieldValue={setFieldValue} files={values.files} />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={
                      isSubmitting ||
                      advertMutation.isPending ||
                      uploadMutation.isPending
                    }
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
}

const DropzoneField = ({ setFieldValue, files }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const imageFile = files?.find((f) => f.type?.startsWith("image/"));
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [files]);

  const fetchUrlAsFile = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch remote file");
      }
      const rawType = response.headers.get("content-type") || "application/octet-stream";
      const contentType = rawType.split(";")[0];
      const blob = await response.blob();
      const ext = contentType.split("/")[1] || "bin";
      const filename = `dropped-${Date.now()}.${ext}`;
      const remoteFile = new File([blob], filename, { type: contentType });
      console.log("[Dropzone] Fetched remote file", url, remoteFile);
      return remoteFile;
    } catch (err) {
      console.error("[Dropzone] Unable to fetch remote file", err);
      toast.error("Could not fetch that remote file.");
      return null;
    }
  }, []);

  const mergeFiles = (existing = [], incoming = []) => {
    const seen = new Map();
    [...existing, ...incoming].forEach((file) => {
      const key = `${file.name}-${file.size}-${file.type}`;
      if (!seen.has(key)) {
        seen.set(key, file);
      }
    });
    return Array.from(seen.values());
  };

  const getFilesFromEvent = useCallback(
    async (event) => {
      const transfer = event.dataTransfer;
      const inputFiles = event.target?.files;

      if (inputFiles?.length) {
        const fileList = Array.from(inputFiles);
        console.log("[Dropzone] Received files from input", fileList);
        return fileList;
      }

      if (transfer?.files?.length) {
        const fileList = Array.from(transfer.files);
        console.log("[Dropzone] Received files from drag/drop", fileList);
        return fileList;
      }

      if (!transfer?.items?.length) {
        return [];
      }

      const collected = [];
      for (const item of transfer.items) {
        if (item.kind === "string" && (item.type === "text/uri-list" || item.type === "text/plain")) {
          const url = await new Promise((resolve) => item.getAsString(resolve));
          if (url && url.startsWith("http")) {
            toast.info("Fetching remote file...");
            const fetched = await fetchUrlAsFile(url.trim());
            if (fetched) {
              collected.push(fetched);
            }
          }
        }
      }

      return collected;
    },
    [fetchUrlAsFile]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const nextFiles = mergeFiles(files, acceptedFiles);
      if (acceptedFiles?.length) {
        console.log("[Dropzone] Accepted files", acceptedFiles);
        toast.success(`Added ${acceptedFiles.length} file${acceptedFiles.length > 1 ? "s" : ""}`);
      }
      setFieldValue("files", nextFiles);
    },
    [files, setFieldValue]
  );

  const onDropRejected = useCallback((rejections) => {
    console.warn("[Dropzone] Rejected files", rejections);
    toast.error("File not accepted. Please use PDF, PNG, or JPEG.");
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    onDropRejected,
    getFilesFromEvent,
    multiple: true,
    maxFiles: 5,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.400",
          borderRadius: 2,
          padding: 3,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: isDragActive ? "primary.light" : "transparent",
          transition: "background-color 0.2s ease",
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop files here, or click to select (PDF, PNG, JPEG)"}
        </Typography>
        {files?.length > 0 && (
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            {files.map((f) => (
              <Typography key={`${f.name}-${f.size}`} variant="body2">
                {f.name}
              </Typography>
            ))}
          </Stack>
        )}
      </Box>
      {previewUrl && (
        <Box
          component="img"
          src={previewUrl}
          alt="Preview"
          sx={{ maxWidth: 200, maxHeight: 200, borderRadius: 2, border: "1px solid #ccc" }}
        />
      )}
      {fileRejections.length > 0 && (
        <Typography color="error" variant="caption">
          Only PDF, PNG, or JPEG files are allowed.
        </Typography>
      )}
      {files?.length > 0 && (
        <Button
          variant="text"
          color="secondary"
          size="small"
          sx={{ alignSelf: "flex-start" }}
          onClick={() => setFieldValue("files", [])}
        >
          Clear files
        </Button>
      )}
    </Stack>
  );
};
