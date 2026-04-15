import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { Post } from "../../types/post";
import { editPost } from "../../services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  body: Yup.string()
    .max(500, "Content must be at most 500 characters")
    .required("Content is required"),
});

interface EditPostFormProps {
  post: Post;
  onClose: () => void;
}

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  interface FormData {
    id: number;
    title: string;
    body: string;
  }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      alert("Post edited successflly");
      onClose();
    },
  });

  const handleSubmit = (values: FormData, actions: FormikHelpers<FormData>) => {
    mutation.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik initialValues={post} onSubmit={handleSubmit} validationSchema={EditSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
