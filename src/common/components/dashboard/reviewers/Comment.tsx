import React, { FC, useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  BiBold,
  BiItalic,
  BiListUl,
  BiListOl,
  BiImage,
  BiLink,
  BiHeading,
} from "react-icons/bi";
import { errorParser, readableDate, retrieveToken } from "@lib/helper";
import commentQueries from "@lib/queries/comment";
import { SubmitButton } from "@components/application/base/Button";

interface IProps {
  commentType: string;
  typeId: any;
}

interface MenuBarProps {
  editor: any;
}

// Create a component to sync TipTap with Formik
const TiptapFormSync = ({ editor }: { editor: any }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  useEffect(() => {
    if (!editor) return;

    // Update Formik values when editor content changes
    const handleUpdate = () => {
      const html = editor.getHTML();
      setFieldValue("comment", html);
      setFieldTouched("comment", true, false);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, setFieldValue, setFieldTouched]);

  return null;
};

const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

  if (!editor) return null;

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
        title="Bold"
      >
        <BiBold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
        title="Italic"
      >
        <BiItalic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
        title="Bullet List"
      >
        <BiListUl className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
        title="Ordered List"
      >
        <BiListOl className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setShowImageInput(!showImageInput)}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          showImageInput ? "bg-gray-200" : ""
        }`}
        title="Insert Image"
      >
        <BiImage className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter the link URL:");
          if (url) {
            editor.chain().focus().toggleLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("link") ? "bg-gray-200" : ""
        }`}
        title="Insert Link"
      >
        <BiLink className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
        }`}
        title="Heading"
      >
        <BiHeading className="h-4 w-4" />
      </button>

      {showImageInput && (
        <div className="flex items-center ml-2 gap-2">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="p-1 text-sm border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={addImage}
            className="p-1 text-xs bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

const Comment: FC<IProps> = ({ commentType, typeId }: IProps) => {
  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
  const legal =
    userType === "Legal Adviser" || userType === "Legal Director"
      ? "legal"
      : "";
  const comments = commentQueries.getComment(commentType, typeId, legal);
  const commentData = comments?.data?.data?.comments;
  const { mutate } = commentQueries.createComment();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[150px] px-4 py-2",
      },
    },
  });

  const defaultPayload = {
    comment_type: commentType,
    type_id: typeId,
    comment: "",
    user_title: userType,
    approval_type: "",
    user_id: userId,
  };

  const schema = Yup.object({
    comment_type: Yup.string(),
    type_id: Yup.string(),
    comment: Yup.string().required("Required"),
    user_title: Yup.string(),
    approval_type: Yup.string(),
    user_id: Yup.string(),
  });

  const onSubmit = async (
    values: {
      comment_type: string;
      type_id: any;
      comment: string;
      user_title: any;
      approval_type: any;
      user_id: number;
    },
    { resetForm }: any
  ) => {
    mutate(values);
    editor?.commands.setContent("");
    resetForm();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="mt-5 mb-5">
      <div className="w-full">
        <div className="w-full">
          <div className="border border-gray-400 rounded-3xl my-12">
            {/* Header */}
            <div className="border-gray-400 px-6 justify-between align-middle py-8">
              <p className="text-xl font-bold">Comments</p>
            </div>

            {/* Comments List */}
            <div className="max-h-[400px] overflow-y-auto">
              {commentData?.length > 0 ? (
                commentData?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className={`px-6 mb-6 flex ${
                      data?.user_title === userType
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[400px] rounded-lg shadow p-4 ${
                        data?.user_title === userType
                          ? "bg-[#e1fff1]"
                          : "bg-white"
                      }`}
                    >
                      <div className="font-medium text-gray-700">
                        {data?.user_title === userType
                          ? data?.name
                          : data?.name}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        {data?.user_title === userType
                          ? "You"
                          : data?.user_title}
                      </div>
                      <div
                        className="text-gray-600 mb-2"
                        dangerouslySetInnerHTML={{ __html: data?.comment }}
                      />
                      <div className="text-xs text-gray-500">
                        {readableDate(data?.date_created)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No comments yet
                </div>
              )}
            </div>

            {/* Comment Form */}
            <div className="px-6 py-4">
              <Formik
                initialValues={defaultPayload}
                validationSchema={schema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="rounded-lg border border-gray-300 relative">
                      <MenuBar editor={editor} />

                      {/* Bubble Menu */}
                      {editor && (
                        <BubbleMenu
                          editor={editor}
                          tippyOptions={{ duration: 100 }}
                          className="bg-white shadow-lg border border-gray-200 rounded-md p-1 flex gap-1"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              editor.chain().focus().toggleBold().run()
                            }
                            className={`p-1 rounded hover:bg-gray-100 ${
                              editor.isActive("bold") ? "bg-gray-200" : ""
                            }`}
                          >
                            <BiBold className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              editor.chain().focus().toggleItalic().run()
                            }
                            className={`p-1 rounded hover:bg-gray-100 ${
                              editor.isActive("italic") ? "bg-gray-200" : ""
                            }`}
                          >
                            <BiItalic className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const url = window.prompt("Enter the link URL:");
                              if (url) {
                                editor
                                  .chain()
                                  .focus()
                                  .toggleLink({ href: url })
                                  .run();
                              }
                            }}
                            className={`p-1 rounded hover:bg-gray-100 ${
                              editor.isActive("link") ? "bg-gray-200" : ""
                            }`}
                          >
                            <BiLink className="h-4 w-4" />
                          </button>
                        </BubbleMenu>
                      )}

                      <EditorContent editor={editor} />
                      {/* This component syncs TipTap with Formik */}
                      {editor && <TiptapFormSync editor={editor} />}
                    </div>
                    {formik.touched.comment && formik.errors.comment && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.comment}
                      </div>
                    )}
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t mt-4">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white "
                      >
                        Comment
                      </SubmitButton>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
