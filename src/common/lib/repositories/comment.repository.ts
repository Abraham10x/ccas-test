import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface Comment {
  comment: any;
  comment_type: string;
  type_id: any;
  user_title: any;
  approval_type: any;
}

interface IComment {
  createComment: (payload: Comment) => Promise<void>;
  getComment: (type: any, id: any, userType?: any) => Promise<Comment>;
  getReviewer: (id: any, userType?: any) => Promise<any>;
}

export function CommentRepository(axios: AxiosInstance): IComment {
  return {
    createComment: async (payload: Comment) =>
      await axios.post("/process/create_comment.php", payload),
    getComment: async (type: any, id: any, userType?: any) =>
      await axios.get(
        `/process/get_comment.php?comment_type=${type}&type_id=${id}&user_type=${userType}`
      ),
    getReviewer: async (id: any, formType?: any) =>
      await axios.get(
        `/contracts/get_reviewers.php?id=${id}&form_type=${formType}`
      ),
  };
}

export default CommentRepository(axiosInstance);
