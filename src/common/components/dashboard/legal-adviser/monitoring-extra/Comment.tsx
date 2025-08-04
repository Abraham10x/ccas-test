/* eslint-disable react/jsx-key */
import React, { FC, useEffect } from "react";
import * as Yup from "yup";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import { Formik } from "formik";
import { SubmitButton } from "@components/application/base/Button";
import { errorParser, readableDate, retrieveToken } from "@lib/helper";
import commentQueries from "@lib/queries/comment";

const Comment: FC = () => {
  const userType = retrieveToken("userType");
  const contractID = retrieveToken("contractId");

  const { mutate } = commentQueries.createComment();
  const comments = commentQueries.getComment("contract", contractID);
  const commentData = comments?.data?.data?.comments;

  useEffect(() => {}, []);

  const defaultPayload = {
    comment_type: "contract",
    type_id: contractID,
    comment: "",
    user_title: userType,
    approval_type: "",
  };

  const schema = Yup.object({
    comment_type: Yup.string(),
    type_id: Yup.string(),
    comment: Yup.string(),
    user_title: Yup.string(),
    approval_type: Yup.string(),
  });

  const onSubmit = async (values: {
    comment_type: string;
    type_id: any;
    comment: string;
    user_title: any;
    approval_type: any;
  }) => {
    // handle form submission here
    mutate(values);
  };

  return (
    <div className="mt-5 mb-5">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sm={12}>
            <div className="border border-gray-400 rounded-3xl my-12">
              <div className=" border-gray-400 px-6 justify-between align-middle py-8">
                <h3 className="text-xl font-bold">Comments</h3>
              </div>
              <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                {commentData?.length > 0 ? (
                  commentData?.map((data: any, index: any) => (
                    <Box
                      key={index}
                      className="px-6 mb-6"
                      display="flex"
                      justifyContent={`${
                        data?.user_title === userType ? "flex-end" : ""
                      }`}
                    >
                      <Card
                        sx={{ maxWidth: 400 }}
                        style={{
                          backgroundColor: `${
                            data?.user_title === userType ? "#e1fff1" : "#fff"
                          }`,
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.primary"
                            gutterBottom
                          >
                            {data?.user_title === userType
                              ? "You"
                              : data?.user_title}
                          </Typography>
                          <Typography variant="h5" component="div"></Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {data?.comment}
                          </Typography>
                          <Typography variant="body2">
                            {readableDate(data?.date_created)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <p className="text-center">No comments yet</p>
                )}
              </div>

              <div className="">
                <Formik
                  initialValues={defaultPayload}
                  validationSchema={schema}
                  onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                  }}
                >
                  {(formik) => {
                    const {
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      handleChange,
                    } = formik;
                    return (
                      <div className="px-6 py-4">
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 gap-y-2">
                            <BaseFormInput
                              label="Add your Comment"
                              name="comment"
                              type="textarea"
                              value={values.comment}
                              onChange={handleChange}
                              error={errorParser(errors, touched, "comment")}
                            />
                          </div>
                          <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                            <SubmitButton
                              type="submit"
                              className="bg-green text-white "
                            >
                              Comment
                            </SubmitButton>
                          </div>
                        </form>
                      </div>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Comment;
